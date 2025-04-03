package br.com.mcoder.ecommerce.services.validation;

import br.com.mcoder.ecommerce.custom.FieldMessage;
import br.com.mcoder.ecommerce.dto.UserInsertDTO;
import br.com.mcoder.ecommerce.entities.User;
import br.com.mcoder.ecommerce.repositories.UserRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class UserInsertValidator implements ConstraintValidator<UserInsertValid, UserInsertDTO> {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void initialize(UserInsertValid ann) {
    }

    @Override
    public boolean isValid(UserInsertDTO dto, ConstraintValidatorContext context) {
        List<FieldMessage> list = new ArrayList<>();
        Optional<User> user = userRepository.findByEmail(dto.getEmail());
        if (user.isPresent()){
            list.add(new FieldMessage("email", "Email already exists!"));
        }

        for (FieldMessage e : list){
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(
                    e.getMessage()).addPropertyNode(e.getFieldName()).addConstraintViolation();
        }
        return list.isEmpty();
    }
}
