-- Inserir Categorias
INSERT INTO tb_category (name) VALUES ('Electronics');
INSERT INTO tb_category (name) VALUES ('Books');
INSERT INTO tb_category (name) VALUES ('Home & Kitchen');

-- Inserir Produtos
INSERT INTO tb_product (name, description, price, img_url) VALUES ('Smartphone', 'Latest model smartphone', 800.00, 'http://example.com/smartphone.jpg');
INSERT INTO tb_product (name, description, price, img_url) VALUES ('Tablet', '10-inch display tablet', 300.00, 'http://example.com/tablet.jpg');
INSERT INTO tb_product (name, description, price, img_url) VALUES ('Blender', 'High-speed blender', 150.00, 'http://example.com/blender.jpg');

-- Relacionar Produtos com Categorias
INSERT INTO tb_product_category (product_id, category_id) VALUES (1, 1);  -- Smartphone in Electronics
INSERT INTO tb_product_category (product_id, category_id) VALUES (2, 1);  -- Tablet in Electronics
INSERT INTO tb_product_category (product_id, category_id) VALUES (3, 3);  -- Blender in Home & Kitchen


-- Inserir Usuários
INSERT INTO tb_user (name, email, phone, birth_date, password) VALUES ('Alice', 'alice@example.com', '1234567890', '1990-01-01', '$2a$10$onOUZH3B60kq0.k55zmY.eRy7JoIWAnQG/d..ksac.Z/ofkRWPJt2'), ('Bob', 'bob@example.com', '0987654321', '1985-05-12', '$2a$10$onOUZH3B60kq0.k55zmY.eRy7JoIWAnQG/d..ksac.Z/ofkRWPJt2');

-- Inserir Pedidos
INSERT INTO tb_order (moment, status, client_id) VALUES (TIMESTAMP WITH TIME ZONE '2024-02-25T13:00:00Z', 1, 1); -- Pedido de Alice
INSERT INTO tb_order (moment, status, client_id) VALUES (TIMESTAMP WITH TIME ZONE '2024-03-29T13:00:00Z', 3, 2); -- Pedido de Bob
INSERT INTO tb_order (moment, status, client_id) VALUES (TIMESTAMP WITH TIME ZONE '2024-03-30T13:00:00Z', 0, 2); -- Pedido de Bob

-- Inserir Itens de Pedido
INSERT INTO tb_order_item (order_id, product_id, quantity, price) VALUES (1, 1, 1, 1200.00);
INSERT INTO tb_order_item (order_id, product_id, quantity, price) VALUES (1, 2, 2, 45.00);
INSERT INTO tb_order_item (order_id, product_id, quantity, price) VALUES (2, 3, 1, 20.00);

-- Inserir Pagamentos
INSERT INTO tb_payment (moment, order_id) VALUES (TIMESTAMP WITH TIME ZONE '2024-08-05 10:15:00', 2);

INSERT INTO tb_role (authority) VALUES ('ROLE_OPERATOR');
INSERT INTO tb_role (authority) VALUES ('ROLE_ADMIN');

INSERT INTO tb_user_role (user_id, role_id) VALUES (1, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 2);
