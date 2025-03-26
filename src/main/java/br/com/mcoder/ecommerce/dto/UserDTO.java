package br.com.mcoder.ecommerce.dto;


import br.com.mcoder.ecommerce.entities.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

public class UserDTO {
    private Long id;
    @NotBlank(message = "Campo obrigatório")
    private String name;
    @Email(message = "Favor entrar um email válido")
    private String email;
    private String phone;
    private LocalDate birthDate;
    private Set<RoleDTO> roles = new HashSet<>();

    public UserDTO(){
    }

    public UserDTO(User user) {
        id = user.getId();
        name = user.getName();
        email = user.getEmail();
        phone = user.getPhone();
        birthDate = user.getBirthDate();
        user.getRoles().forEach(role -> this.roles.add(new RoleDTO(role)));
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public Set<RoleDTO> getRoles() {
        return roles;
    }
}
