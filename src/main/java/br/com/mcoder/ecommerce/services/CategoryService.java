package br.com.mcoder.ecommerce.services;

import br.com.mcoder.ecommerce.dto.CategoryDTO;
import br.com.mcoder.ecommerce.entities.Category;
import br.com.mcoder.ecommerce.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Transactional(readOnly = true)
    public Page<CategoryDTO> findAll(Pageable pageable){
        Page<Category> categoryPage = categoryRepository.findAll(pageable);
        return categoryPage.map(x -> new CategoryDTO(x));
    }

}
