package br.com.mcoder.ecommerce.services;

import br.com.mcoder.ecommerce.dto.CategoryDTO;
import br.com.mcoder.ecommerce.dto.ProductDTO;
import br.com.mcoder.ecommerce.dto.ProductMinDTO;
import br.com.mcoder.ecommerce.entities.Category;
import br.com.mcoder.ecommerce.entities.Product;
import br.com.mcoder.ecommerce.projections.ProductProjection;
import br.com.mcoder.ecommerce.repositories.CategoryRepository;
import br.com.mcoder.ecommerce.repositories.ProductRepository;
import br.com.mcoder.ecommerce.services.exceptions.DatabaseException;
import br.com.mcoder.ecommerce.services.exceptions.ResourceNotFoundException;
import br.com.mcoder.ecommerce.utils.Utils;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository repository;

    private final CategoryRepository categoryRepository;

    public ProductService(ProductRepository repository, CategoryRepository categoryRepository) {
        this.repository = repository;
        this.categoryRepository = categoryRepository;
    }


    @Transactional(readOnly = true)
    public ProductDTO findById(Long id) {
        Product product = repository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Recurso não encontrado"));
        return new ProductDTO(product);
    }
/* CONSULTA findAll antiga
    @Transactional(readOnly = true)
    public Page<ProductMinDTO> findAll(Pageable pageable) {
        Page<Product> productList = repository.findAll(pageable);
        return productList.map(x -> new ProductMinDTO(x));
    }
*/

    @SuppressWarnings("unchecked")
    @Transactional(readOnly = true)
    public Page<ProductDTO> findAll(String name, String categoryId, Pageable pageable) {

        List<Long> categoryIds = Arrays.asList();
        if (!"0".equals(categoryId)){
            String[] vet= categoryId.split(","); // Pegou uma string e gerou um vetor de strings
            List<String> list = Arrays.asList(vet); // Pegou um vetor de strings e gerou uma lista
            categoryIds = list.stream().map(x -> Long.parseLong(x)).toList(); // Stream com Expressão lambda para passar cada valor da lista de String e tranformar em Long
        }
        Page<ProductProjection> page = repository.searchProducts(categoryIds, name, pageable); // coleta dados da busca anterior
        List<Long> productIds = page.map(x -> x.getId()).toList(); // Gera uma lista com os ids de produtos

        List<Product> entities = repository.searchProductsWithCategories(productIds); // resultado desordenado

        entities = (List<Product>) Utils.replace(page.getContent(), entities); // retorna lista ordenada paginada

        List<ProductDTO> dtos = entities.stream().map(p -> new ProductDTO(p)).toList();

        Page<ProductDTO> pageDto = new PageImpl<>(dtos, page.getPageable(), page.getTotalElements());
        return pageDto;
    }


    @Transactional
    public ProductDTO insert(ProductDTO productDTO) {
        Product product = new Product();
        copyDtoEntity(productDTO, product);
        product = repository.save(product);
        return new ProductDTO(product);
    }

    @Transactional
    public ProductDTO update(Long id, ProductDTO productDTO) {
        try {
            Product product = repository.getReferenceById(id);
            copyDtoEntity(productDTO, product);
            product = repository.save(product);
            return new ProductDTO(product);
        } catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Recurso não encontrado");
        }
    }

    @Transactional(propagation = Propagation.SUPPORTS)
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Recurso não encontrado");
        }
        try {
            repository.deleteById(id);
        } catch (DataIntegrityViolationException e) {
            throw new DatabaseException("Falha de integridade referencial");
        }
    }

    private void copyDtoEntity(ProductDTO productDTO, Product product) {
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());
        product.setImgUrl(productDTO.getImgUrl());

        product.getCategories().clear();
        for (CategoryDTO categoryDTO : productDTO.getCategories()) {
            Category category = categoryRepository.findById(categoryDTO.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Categoria não encontrada! : " + categoryDTO.getId() + " nome " + categoryDTO.getName()));
            product.getCategories().add(category);
        }
    }

}
