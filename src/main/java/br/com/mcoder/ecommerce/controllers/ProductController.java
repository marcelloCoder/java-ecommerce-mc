package br.com.mcoder.ecommerce.controllers;

import br.com.mcoder.ecommerce.dto.ProductDTO;
import br.com.mcoder.ecommerce.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping
    public Page<ProductDTO> findAll(Pageable pageable){
       return productService.findAll(pageable);
    }

    @PostMapping
    public ProductDTO insert(@RequestBody ProductDTO productDTO){
        productDTO = productService.insert(productDTO);
        return productDTO;
    }

}
