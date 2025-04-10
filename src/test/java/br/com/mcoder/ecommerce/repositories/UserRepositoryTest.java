package br.com.mcoder.ecommerce.repositories;

import br.com.mcoder.ecommerce.entities.User;
import br.com.mcoder.ecommerce.factory.UserFactory;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

@DataJpaTest
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;


    private long existingId;
    private long nonExistingId;
    private long countTotalUsers;

    @BeforeEach
    void setUp() throws Exception {
        existingId = 1L;
        nonExistingId = 1000L;
        countTotalUsers = 3L;
    }

    @Test
    public void deleteShouldDeleteUserWhenIdExists() {

        long existingID = 1L;
        userRepository.deleteById(existingID);
        Optional<User> result = userRepository.findById(existingID);
        Assertions.assertFalse(result.isPresent());
    }

    @Test
    public void saveShouldPersistWithAutoincrementWhenIdIsNull() {
        User user = UserFactory.createUser();
        user.setId(null);
        user = userRepository.save(user);
        Assertions.assertNotNull(user.getId());
        Assertions.assertEquals(countTotalUsers + 1, user.getId());
    }

    @Test
    public void findByIdShouldReturnOptionalEmptyWhenIdDoesNotExist() {
        Optional<User> result = userRepository.findById(nonExistingId);
        Assertions.assertFalse(result.isPresent());
    }

    @Test
    public void findByIdShouldReturnOptionalNotEmptyWhenIdExists() {
        Optional<User> result = userRepository.findById(existingId);
        Assertions.assertTrue(result.isPresent());
    }

    @Test
    public void findByIdShouldReturnOptionalWithObjectWhenIdExists() {
        User user = UserFactory.createUser();
        user.setId(existingId);
        userRepository.save(user);
        Optional<User> result = userRepository.findById(existingId);
        Assertions.assertTrue(result.isPresent());
        Assertions.assertEquals(user, result.get());
    }
}
