package br.com.mcoder.ecommerce.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class NewPasswordDTO {

    @NotBlank(message = "Campo obrigatório")
    private String token;

    @NotBlank(message = "Campo obrigatório")
    @Size(min = 8, message = "Deve ter no minimo 8 caracteres")
    private String password;

    public NewPasswordDTO(){}

    public NewPasswordDTO(String password, String token) {
        this.password = password;
        this.token = token;
    }
    public String getPassword() {
        return password;
    }
    public String getToken() {
        return token;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
