package br.com.mcoder.ecommerce.services;

import br.com.mcoder.ecommerce.dto.EmailDTO;
import br.com.mcoder.ecommerce.entities.PasswordRecover;
import br.com.mcoder.ecommerce.entities.User;
import br.com.mcoder.ecommerce.repositories.PasswordRecoverRepository;
import br.com.mcoder.ecommerce.repositories.UserRepository;
import br.com.mcoder.ecommerce.services.exceptions.ForbiddenException;
import br.com.mcoder.ecommerce.services.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {

    private final UserService userService;

    private final UserRepository userRepository;

    private final PasswordRecoverRepository passwordRecoverRepository;

    private final EmailService emailService;

    @Value("${email.password-recover.token.minutes}")
    private Long tokenMinutes;

    @Value("${email.password-recover.uri}")
    private String recoverUri;

    public AuthService(UserService userService, UserRepository userRepository, PasswordRecoverRepository passwordRecoverRepository, EmailService emailService) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.passwordRecoverRepository = passwordRecoverRepository;
        this.emailService = emailService;
    }

    public void validateSelfOrAdmin(long userId){
        User me = userService.authenticated();
        if (!me.hasRole("ROLE_ADMIN") && !me.getId().equals(userId)){
            throw new ForbiddenException("ACCESS DENIED!!");
        }
    }

    @Transactional
    public void createRecoverToken(EmailDTO body) {
        Optional<User> user = userRepository.findByEmail(body.getEmail());
        if (user.isEmpty()){
            throw new ResourceNotFoundException("Email não encontrado!");
        }

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
}
