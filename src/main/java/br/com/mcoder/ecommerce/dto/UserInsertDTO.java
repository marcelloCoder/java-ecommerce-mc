package br.com.mcoder.ecommerce.dto;

import br.com.mcoder.ecommerce.entities.User;
import br.com.mcoder.ecommerce.services.validation.UserInsertValid;

@UserInsertValid
public class UserInsertDTO extends UserDTO {
    private String password;
    public UserInsertDTO(User user) {
        super(user);
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
