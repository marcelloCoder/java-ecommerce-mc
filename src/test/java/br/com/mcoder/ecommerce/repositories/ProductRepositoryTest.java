package br.com.mcoder.ecommerce.repositories;

import br.com.mcoder.ecommerce.entities.Product;
import br.com.mcoder.ecommerce.factory.ProductFactory;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

@DataJpaTest
public class ProductRepositoryTest {

    @Autowired
    private ProductRepository repository;

    private long existingId;
    private long nonExistingId;
    private long countTotalProducts;

    @BeforeEach
    void setUp() throws Exception {
        existingId = 1L;
        nonExistingId = 1000L;
        countTotalProducts = 10L;
    }

    @Test
    public void deleteShouldDeleteObjectWhenIdExists() {

        long existingID = 1L;

        repository.deleteById(existingID);

        Optional<Product> result = repository.findById(existingID);

        Assertions.assertFalse(result.isPresent());
    }


    //Spring boot versao 2
    /*
    @Test
    void deleteShouldThrowEmptyResultDataAccessExceptionWhenIdDoesNotExist() {
        long nonExistingID = 1000L;

        Assertions.assertThrows(EmptyResultDataAccessException.class, () -> {
            repository.deleteById(nonExistingID);

        });
    }
     */

    @Test
    public void saveShouldPersistWithAutoincrementWhenIdIsNull() {
        Product product = ProductFactory.createProduct();
        product.setId(null);

        product = repository.save(product);

        Assertions.assertNotNull(product.getId());
        Assertions.assertEquals(countTotalProducts + 1, product.getId());

    }

    @Test
    void findByIdShouldReturnOptionalEmptyWhenIdDoesNotExist() {
        Optional<Product> result = repository.findById(nonExistingId);

        Assertions.assertFalse(result.isPresent());
    }

    @Test
    void findByIdShouldReturnOptionalNotEmptyWhenIdExists() {
        Optional<Product> result = repository.findById(existingId);

        Assertions.assertTrue(result.isPresent());
    }

    @Test
    void findByIdShouldReturnOptionalWithObjectWhenIdExists() {
        Product product = ProductFactory.createProduct();
        product.setId(existingId);

        repository.save(product);

        Optional<Product> result = repository.findById(existingId);

        Assertions.assertTrue(result.isPresent());
        Assertions.assertEquals(product, result.get());
    }

}