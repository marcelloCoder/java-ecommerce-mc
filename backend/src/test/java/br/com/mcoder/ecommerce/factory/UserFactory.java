package br.com.mcoder.ecommerce.factory;

import br.com.mcoder.ecommerce.dto.UserDTO;
import br.com.mcoder.ecommerce.dto.UserUpdateDTO;
import br.com.mcoder.ecommerce.entities.Role;
import br.com.mcoder.ecommerce.entities.User;

import java.time.LocalDate;

public class UserFactory {
    public static User createUser() {
        LocalDate date = LocalDate.of(2001,03,20);
        User user = new User(
                1L,
                "Marcello",
                "marcello@gmail.com",
                "+55 35 99999-9999",
                date,
                "securePassword123"
        );
        user.getRoles().add(createRoles());
        return user;
    }

    public static UserDTO createUserDto(){
        User user = createUser();
        return new UserDTO(user);
    }

    public static Role createRoles(){
        Role role = new Role(1L,"ROLE_ADMIN");
        return role;
    }

    public static void createUpdateUserDto(){

    }
}
