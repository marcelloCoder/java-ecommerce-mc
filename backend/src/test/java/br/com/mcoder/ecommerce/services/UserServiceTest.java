package br.com.mcoder.ecommerce.services;

import br.com.mcoder.ecommerce.dto.RoleDTO;
import br.com.mcoder.ecommerce.dto.UserDTO;
import br.com.mcoder.ecommerce.entities.Role;
import br.com.mcoder.ecommerce.entities.User;
import br.com.mcoder.ecommerce.factory.UserFactory;
import br.com.mcoder.ecommerce.repositories.RoleRepository;
import br.com.mcoder.ecommerce.repositories.UserRepository;
import br.com.mcoder.ecommerce.services.exceptions.ResourceNotFoundException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;
import java.util.Optional;

@ExtendWith(SpringExtension.class)
public class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private RoleRepository roleRepository;

    private long existingId;
    private long nonExistingId;
    private long dependentId;
    private Role role;
    private User user;
    private PageImpl<User> page;

    @BeforeEach
    void setUp() {
        existingId = 1L;
        nonExistingId = 1000L;
        dependentId = 3L;
        user = UserFactory.createUser();
        role = UserFactory.createRoles();
        page = new PageImpl<>(List.of(user));

        Mockito.when(userRepository.findAll((Pageable) ArgumentMatchers.any())).thenReturn(page);

        Mockito.when(userRepository.save(ArgumentMatchers.any())).thenReturn(user);

        Mockito.when(userRepository.findById(existingId)).thenReturn(Optional.of(user));
        Mockito.when(userRepository.findById(nonExistingId)).thenThrow(ResourceNotFoundException.class);

        Mockito.when(userRepository.getReferenceById(existingId)).thenReturn(user);
        Mockito.when(userRepository.getReferenceById(nonExistingId)).thenThrow(ResourceNotFoundException.class);

    }

    @Test
    public void findAllPagedShouldReturnPagedUsers() {
        Pageable pageable = PageRequest.of(0, 10);
        Page<UserDTO> result = userService.findAllPaged(pageable);
        Assertions.assertNotNull(result);
        Mockito.verify(userRepository, Mockito.times(1)).findAll(pageable);
    }

    @Test
    public void findByIdShouldReturnUserDTOWhenIdExists() {
        UserDTO result = userService.findById(existingId);
        Assertions.assertNotNull(result);
        Assertions.assertEquals(user.getId(), result.getId());

        Mockito.verify(userRepository, Mockito.times(1)).findById(existingId);
    }

    @Test
    public void findByIdShouldThrowResorceNotFoundExceptionWhenUserDTOIdDoeNotExists() {
        Assertions.assertThrows(ResourceNotFoundException.class, () -> {
            userService.findById(nonExistingId);
        });

        Mockito.verify(userRepository, Mockito.times(1)).findById(nonExistingId);
    }

    @Test
    public void updateShouldReturnUserDTOWhenIdExists(){

    }
}