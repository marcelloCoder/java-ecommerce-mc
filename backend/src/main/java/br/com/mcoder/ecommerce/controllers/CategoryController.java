package br.com.mcoder.ecommerce.controllers;

import br.com.mcoder.ecommerce.dto.CategoryDTO;
import br.com.mcoder.ecommerce.services.CategoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value = "/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<CategoryDTO> findById(@PathVariable Long id){
        CategoryDTO categoryDTO = categoryService.findById(id);
        return ResponseEntity.ok(categoryDTO);
    }

    @GetMapping
    public ResponseEntity<List<CategoryDTO>> findAll(){
        List<CategoryDTO> categoryDTOS = categoryService.findAll();
        return ResponseEntity.ok(categoryDTOS);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<CategoryDTO> insert(@Valid @RequestBody CategoryDTO categoryDTO){
        categoryDTO = categoryService.insert(categoryDTO);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(categoryDTO.getId()).toUri();
        return ResponseEntity.created(uri).body(categoryDTO);
    }
}
