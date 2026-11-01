package br.com.mcoder.ecommerce.services;

import br.com.mcoder.ecommerce.dto.AccessTokenDTO;
import br.com.mcoder.ecommerce.dto.EmailDTO;
import br.com.mcoder.ecommerce.dto.LoginDTO;
import br.com.mcoder.ecommerce.dto.NewPasswordDTO;
import br.com.mcoder.ecommerce.dto.RefreshTokenDTO;
import br.com.mcoder.ecommerce.entities.PasswordRecover;
import br.com.mcoder.ecommerce.entities.User;
import br.com.mcoder.ecommerce.repositories.PasswordRecoverRepository;
import br.com.mcoder.ecommerce.repositories.UserRepository;
import br.com.mcoder.ecommerce.services.exceptions.ForbiddenException;
import br.com.mcoder.ecommerce.services.exceptions.ResourceNotFoundException;
import br.com.mcoder.ecommerce.services.exceptions.UnauthorizedException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {

    private final UserService userService;

    private final UserRepository userRepository;

    private final PasswordRecoverRepository passwordRecoverRepository;

    private final EmailService emailService;

    private final PasswordEncoder passwordEncoder;

    private final RestClient restClient;

    @Value("${email.password-recover.token.minutes}")
    private Long tokenMinutes;

    @Value("${email.password-recover.uri}")
    private String recoverUri;

    @Value("${security.client-id}")
    private String clientId;

    @Value("${security.client-secret}")
    private String clientSecret;

    @Value("${security.token-uri}")
    private String tokenUri;

    public AuthService(UserService userService, UserRepository userRepository, PasswordRecoverRepository passwordRecoverRepository, EmailService emailService, PasswordEncoder passwordEncoder, RestClient.Builder restClientBuilder) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.passwordRecoverRepository = passwordRecoverRepository;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
        this.restClient = restClientBuilder.build();
    }

    public void validateSelfOrAdmin(long userId){
        User me = userService.authenticated();
        if (!me.hasRole("ROLE_ADMIN") && !me.getId().equals(userId)){
            throw new ForbiddenException("ACCESS DENIED!!");
        }
    }

    public AccessTokenDTO login(LoginDTO body) {
        MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
        form.add("grant_type", "password");
        form.add("username", body.getEmail());
        form.add("password", body.getPassword());
        return exchangeToken(form, "Credenciais inválidas");
    }

    public AccessTokenDTO refresh(RefreshTokenDTO body) {
        MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
        form.add("grant_type", "refresh_token");
        form.add("refresh_token", body.getRefreshToken());
        return exchangeToken(form, "Refresh token inválido ou expirado");
    }

    private AccessTokenDTO exchangeToken(MultiValueMap<String, String> form, String errorMessage) {
        try {
            AccessTokenDTO token = restClient.post()
                    .uri(tokenUri)
                    .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                    .headers(headers -> headers.setBasicAuth(clientId, clientSecret))
                    .body(form)
                    .retrieve()
                    .body(AccessTokenDTO.class);

            if (token == null || token.getAccessToken() == null || token.getAccessToken().isBlank()) {
                throw new UnauthorizedException(errorMessage);
            }
            return token;
        } catch (RestClientResponseException ex) {
            throw new UnauthorizedException(errorMessage);
        }
    }

    @Transactional
    public void createRecoverToken(EmailDTO body) {
        Optional<User> user = userRepository.findByEmail(body.getEmail());
        if (user.isEmpty()){
            throw new ResourceNotFoundException("Email não encontrado!");
        }

        passwordRecoverRepository.deleteByEmail(body.getEmail());

        String token = UUID.randomUUID().toString();

        PasswordRecover recover = new PasswordRecover();
        recover.setEmail(body.getEmail());
        recover.setToken(token);
        recover.setExpiration(Instant.now().plusSeconds(tokenMinutes * 60L));
        recover = passwordRecoverRepository.save(recover);

        String text = "Acesse o link para definir uma nova senha:\n\n"
                + recoverUri + token + "\nValido até : " + tokenMinutes + " minutos";

        emailService.sendEmail(body.getEmail(), "Recuperação de senha", text);
    }

    @Transactional
    public void saveNewPassword(NewPasswordDTO body) {
        List<PasswordRecover> result = passwordRecoverRepository.searchValidTokens(body.getToken(), Instant.now());
        if (result.isEmpty()){
            throw new ResourceNotFoundException("Token inválido");
        }
        String email = result.get(0).getEmail();
        Optional<User> optionalUser = userRepository.findByEmail(email);
        User user = optionalUser.orElseThrow(
                () -> new UsernameNotFoundException("Usuário com este e-mail não foi encontrado.")
        );
        user.setPassword(passwordEncoder.encode(body.getPassword()));
        userRepository.save(user);

        passwordRecoverRepository.deleteByEmail(email);
    }
}
