package br.com.mcoder.ecommerce.controllers;

import br.com.mcoder.ecommerce.dto.CategoryDTO;
import br.com.mcoder.ecommerce.dto.ProductDTO;
import br.com.mcoder.ecommerce.entities.Category;
import br.com.mcoder.ecommerce.factory.ProductFactory;
import br.com.mcoder.ecommerce.token.TokenUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class ProductControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private TokenUtil tokenUtil;

    private Long existingId;
    private Long nonExistingId;
    private Long countTotalProducts;

    private String operatorUsername, operatorPassword, bearerToken;
    private String adminUsername, adminPassword;

    @BeforeEach
    void setUp() throws Exception {
        existingId = 1L;
        nonExistingId = 1000L;
        countTotalProducts = 10L;
        operatorUsername = "alice@example.com";
        operatorPassword = "123456";
        adminUsername = "bob@example.com";
        adminPassword = "123456";
        bearerToken = tokenUtil.obtainAccessToken(mockMvc, adminUsername, adminPassword);
    }

    @Test
    public void insertShouldReturn403WhenOperatorLogged() throws Exception {
        String accessToken = tokenUtil.obtainAccessToken(mockMvc, operatorUsername, operatorPassword);

        ProductDTO productDTO = ProductFactory.createProductDto();

        String json = objectMapper.writeValueAsString(productDTO);

        ResultActions resultActions = mockMvc.perform(post("/products")
                .header("Authorization", "Bearer " + accessToken)
                .content(json)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON));

        resultActions.andExpect(status().isForbidden());
    }

    @Test
    public void insertShouldReturn401WhenNoUserLogged() throws Exception {

        ProductDTO productDTO = ProductFactory.createProductDto();

        String json = objectMapper.writeValueAsString(productDTO);

        ResultActions resultActions = mockMvc.perform(post("/products")
                .content(json)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON));

        resultActions.andExpect(status().isUnauthorized());
    }

    @Test
    public void insertShouldInsertResourceWhenAdminLoggedAndCorrectData() throws Exception {

        String accessToken = tokenUtil.obtainAccessToken(mockMvc, adminUsername, adminPassword);
        ProductDTO productDTO = ProductFactory.createProductDto();
        String json = objectMapper.writeValueAsString(productDTO);

        String expectedName = productDTO.getName();
        String expectedDescription = productDTO.getDescription();

        ResultActions resultActions = mockMvc.perform(post("/products")
                .header("Authorization", "Bearer " + accessToken)
                .content(json)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON));

        resultActions.andExpect(status().isCreated());
        resultActions.andExpect(jsonPath("$.id").exists());
        resultActions.andExpect(jsonPath("$.name").value(expectedName));
        resultActions.andExpect(jsonPath("$.description").value(expectedDescription));
        resultActions.andExpect(jsonPath("$.price").value(productDTO.getPrice()));

    }

    @Test
    public void insertShouldReturn422WhenAdminLoggedAndBlankName() throws Exception {
        String accessToken = tokenUtil.obtainAccessToken(mockMvc, adminUsername, adminPassword);

        CategoryDTO category = new CategoryDTO(1L, "Home & Kitchen");

        ProductDTO productDTO = new ProductDTO(null,null, "Metal table", 220.0, "img");
        productDTO.getCategories().add(category);
        String json = objectMapper.writeValueAsString(productDTO);

        ResultActions resultActions = mockMvc.perform(post("/products")
                .header("Authorization", "Bearer " + accessToken)
                .content(json)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON));

        resultActions.andExpect(status().isUnprocessableEntity());
        resultActions.andExpect(jsonPath("$.fieldMessages[0].fieldName").value("name"));
        resultActions.andExpect(jsonPath("$.fieldMessages[0].message").value("CAMPO REQUERIDO"));

    }

    @Test
    public void insertShouldReturn422WhenAdminLoggedAndNegativePrice() throws Exception {
        String accessToken = tokenUtil.obtainAccessToken(mockMvc, adminUsername, adminPassword);

        CategoryDTO category = new CategoryDTO(1L, "Home & Kitchen");

        ProductDTO productDTO = new ProductDTO(null,"Modern Table", "Metal table", -9.0, "img");
        productDTO.getCategories().add(category);
        String json = objectMapper.writeValueAsString(productDTO);

        ResultActions resultActions = mockMvc.perform(post("/products")
                .header("Authorization", "Bearer " + accessToken)
                .content(json)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON));

        resultActions.andExpect(status().isUnprocessableEntity());
        resultActions.andExpect(jsonPath("$.fieldMessages[0].fieldName").value("price"));
        resultActions.andExpect(jsonPath("$.fieldMessages[0].message").value("O preço deve ser positivo"));

    }

    @Test
    public void insertShouldReturn422WhenAdminLoggedAndDescriptionLessThan10() throws Exception {
        String accessToken = tokenUtil.obtainAccessToken(mockMvc, adminUsername, adminPassword);

        CategoryDTO category = new CategoryDTO(1L, "Home & Kitchen");

        ProductDTO productDTO = new ProductDTO(null,"Modern Table", "Metal", 123.0, "img");
        productDTO.getCategories().add(category);
        String json = objectMapper.writeValueAsString(productDTO);

        ResultActions resultActions = mockMvc.perform(post("/products")
                .header("Authorization", "Bearer " + accessToken)
                .content(json)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON));

        resultActions.andExpect(status().isUnprocessableEntity());
        resultActions.andExpect(jsonPath("$.fieldMessages[0].fieldName").value("description"));
        resultActions.andExpect(jsonPath("$.fieldMessages[0].message").value("Descrição precisa ter no minimo 10 caracteres"));

    }



    @Test
    public void findAllShouldReturnSortedPageWhenSortByName() throws Exception {
        String accessToken = tokenUtil.obtainAccessToken(mockMvc, adminUsername, adminPassword);

        ResultActions resultActions = mockMvc.perform(get("/products?page=0&size=12&sort=name,asc")
                .header("Authorization", "Bearer " + accessToken)
                .accept(MediaType.APPLICATION_JSON));

        resultActions.andExpect(status().isOk());
        resultActions.andExpect(jsonPath("$.totalElements").value(countTotalProducts));
        resultActions.andExpect(jsonPath("$.content").exists());
        resultActions.andExpect(jsonPath("$.content[0].name").value("Blender"));
        resultActions.andExpect(jsonPath("$.content[1].name").value("Bookshelf"));
        resultActions.andExpect(jsonPath("$.content[2].name").value("Coffee Maker"));
    }

    @Test
    public void updateShouldReturnProductDTOWhenIdExists() throws Exception {

        ProductDTO productDTO = ProductFactory.createProductDto();
        String json = objectMapper.writeValueAsString(productDTO);

        String expectedName = productDTO.getName();
        String expectedDescription = productDTO.getDescription();

        ResultActions resultActions = mockMvc.perform(put("/products/{id}", existingId)
                .header("Authorization", "Bearer " + bearerToken)
                .content(json)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON));

        resultActions.andExpect(status().isOk());
        resultActions.andExpect(jsonPath("$.id").value(existingId));
        resultActions.andExpect(jsonPath("$.name").value(expectedName));
        resultActions.andExpect(jsonPath("$.description").value(expectedDescription));
        resultActions.andExpect(jsonPath("$.price").value(productDTO.getPrice()));

    }

    @Test
    public void updateShouldReturnNotFoundWhenIdDoesNotExists() throws Exception {

        ProductDTO productDTO = ProductFactory.createProductDto();
        String json = objectMapper.writeValueAsString(productDTO);

        ResultActions resultActions = mockMvc.perform(put("/products/{id}", nonExistingId)
                .header("Authorization", "Bearer " + bearerToken)
                .content(json)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON));


        resultActions.andExpect(status().isNotFound());

    }
}
