package br.com.mcoder.ecommerce.repositories;

import br.com.mcoder.ecommerce.entities.Product;
import br.com.mcoder.ecommerce.projections.ProductProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT obj FROM Product obj" +
            " WHERE UPPER(obj.name) LIKE UPPER(CONCAT('%', :name, '%'))")
    Page<Product> searchByName(String name, Pageable pageable);

    @Query(nativeQuery = true, value = """
        SELECT * FROM (
        SELECT DISTINCT tb_product.id, tb_product.name
        FROM tb_product
        INNER JOIN tb_product_category 
        ON tb_product_category.product_id = tb_product.id
        WHERE (:categoryIds IS NULL OR tb_product_category.category_id 
        IN (:categoryIds))
        AND (LOWER(tb_product.name) 
        LIKE LOWER(CONCAT('%',:name,'%')))
        ) AS tb_result
        """, countQuery = """
        SELECT COUNT(*) FROM (
        SELECT DISTINCT tb_product.id, tb_product.name
        FROM tb_product
        INNER JOIN tb_product_category 
        ON tb_product_category.product_id = tb_product.id
        WHERE (:categoryIds IS NULL OR tb_product_category.category_id 
        IN (:categoryIds))
        AND (LOWER(tb_product.name) 
        LIKE LOWER(CONCAT('%',:name,'%')))
        ) AS tb_result
        """)
    Page<ProductProjection> searchProducts(List<Long> categoryIds, String name, Pageable pageable);

    @Query("SELECT obj FROM Product obj JOIN FETCH obj.categories WHERE obj.id IN :productIds")
    List<Product> searchProductsWithCategories(List<Long> productIds);
}
