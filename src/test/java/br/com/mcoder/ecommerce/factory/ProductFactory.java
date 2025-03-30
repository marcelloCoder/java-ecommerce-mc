package br.com.mcoder.ecommerce.factory;

import br.com.mcoder.ecommerce.dto.ProductDTO;
import br.com.mcoder.ecommerce.dto.ProductMinDTO;
import br.com.mcoder.ecommerce.entities.Category;
import br.com.mcoder.ecommerce.entities.Product;

public class ProductFactory {
    public static Product createProduct(){
        Product product = new Product(1L,"Table", "Metal table", 220.0, "img");
        return product;
    }

    public static ProductDTO createProductDto() {
        Product product = createProduct();
        return new ProductDTO(product, product.getCategories());
    }

    public static ProductMinDTO createProductMinDto(){
        Product product = createProduct();
        return new ProductMinDTO(product);
    }

    public static Category createCategory() {
        Category category = new Category(1L, "Electronics");
        return category;
    }
}
