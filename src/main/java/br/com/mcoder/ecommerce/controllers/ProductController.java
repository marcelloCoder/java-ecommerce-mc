package br.com.mcoder.ecommerce.controllers;

import br.com.mcoder.ecommerce.entities.Product;
import br.com.mcoder.ecommerce.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping(value = "/products")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;
    @GetMapping
    public String teste(){
        Optional<Product> result = productRepository.findById(1L);
        Product product = result.get();
        return product.getName();
    }

}
