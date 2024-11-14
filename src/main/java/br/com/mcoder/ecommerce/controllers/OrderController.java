package br.com.mcoder.ecommerce.controllers;

import br.com.mcoder.ecommerce.dto.OrderDTO;
import br.com.mcoder.ecommerce.dto.ProductDTO;
import br.com.mcoder.ecommerce.dto.ProductMinDTO;
import br.com.mcoder.ecommerce.services.OrderService;
import br.com.mcoder.ecommerce.services.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping(value = "/orders")
public class OrderController {

    @Autowired
    private OrderService productService;

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_OPERATOR')")
    @GetMapping(value = "/{id}")
    public ResponseEntity<OrderDTO> findById(@PathVariable Long id){
        OrderDTO dto = productService.findById(id);
       return ResponseEntity.ok(dto);
    }

}