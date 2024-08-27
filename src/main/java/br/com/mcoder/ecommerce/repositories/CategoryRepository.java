package br.com.mcoder.ecommerce.repositories;

import br.com.mcoder.ecommerce.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
