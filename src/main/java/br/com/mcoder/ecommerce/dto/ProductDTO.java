package br.com.mcoder.ecommerce.dto;

import br.com.mcoder.ecommerce.entities.Category;
import br.com.mcoder.ecommerce.entities.Product;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class ProductDTO {
    private final Long id;
    @Size(min = 3, max = 80, message = "Nome precisa ter de 3 a 80 caracteres")
    @NotBlank(message = "CAMPO REQUERIDO")
    private final String name;
    @Size(min = 10, message = "Descrição precisa ter no minimo 10 caracteres")
    @NotBlank(message = "CAMPO REQUERIDO")
    private final String description;
    @Positive(message = "O preço deve ser positivo")
    @NotNull(message = "Campo requerido")
    private final Double price;
    private final String imgUrl;

    @NotEmpty(message = "DEVE TER PELO MENOS 1 CATEGORIA")
    private final List<CategoryDTO> categories = new ArrayList<>();

    @JsonCreator
    public ProductDTO(
            @JsonProperty("id") Long id,
            @JsonProperty("name") String name,
            @JsonProperty("description") String description,
            @JsonProperty("price") Double price,
            @JsonProperty("imgUrl") String imgUrl
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.imgUrl = imgUrl;
    }


    public ProductDTO(Product entity) {
        id = entity.getId();
        name = entity.getName();
        description = entity.getDescription();
        price = entity.getPrice();
        imgUrl = entity.getImgUrl();
        for (Category category : entity.getCategories()) {
            categories.add(new CategoryDTO(category));
        }
    }

    public ProductDTO(Product product, Set<Category> categories) {
        this(product);
        categories.forEach(category -> this.categories.add(new CategoryDTO(category)));
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public Double getPrice() {
        return price;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public List<CategoryDTO> getCategories() {
        return categories;
    }
}
