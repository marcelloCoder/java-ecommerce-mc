package br.com.mcoder.ecommerce.controllers;

import br.com.mcoder.ecommerce.dto.ProductDTO;
import br.com.mcoder.ecommerce.entities.Product;
import br.com.mcoder.ecommerce.repositories.ProductRepository;
import br.com.mcoder.ecommerce.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping(value = "/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping(value = "/{id}")
    public ProductDTO findById(@PathVariable Long id){
       ProductDTO dto = productService.findById(id);
       return dto;
    }

}
