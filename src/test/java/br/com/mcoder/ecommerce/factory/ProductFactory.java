package br.com.mcoder.ecommerce.factory;

import br.com.mcoder.ecommerce.entities.Product;

public class ProductFactory {
    public static Product createProduct(){
        Product product = new Product(1L,"Table", "Metal table", 220.0, "img");
        return product;
    }
}
