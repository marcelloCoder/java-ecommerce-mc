-- Inserir Categorias
INSERT INTO tb_category (name) VALUES ('Electronics');
INSERT INTO tb_category (name) VALUES ('Books');
INSERT INTO tb_category (name) VALUES ('Home & Kitchen');

-- Inserir Produtos
INSERT INTO tb_product (name, description, price, img_url) VALUES ('Smartphone', 'Latest model smartphone', 800.00, 'http://example.com/smartphone.jpg');
INSERT INTO tb_product (name, description, price, img_url) VALUES ('Tablet', '10-inch display tablet', 300.00, 'http://example.com/tablet.jpg');
INSERT INTO tb_product (name, description, price, img_url) VALUES ('Blender', 'High-speed blender', 150.00, 'http://example.com/blender.jpg');
INSERT INTO tb_product (name, description, price, img_url) VALUES ('Laptop', '15-inch gaming laptop', 1200.00, 'http://example.com/laptop.jpg');
INSERT INTO tb_product (name, description, price, img_url) VALUES ('Headphones', 'Noise-cancelling headphones', 250.00, 'http://example.com/headphones.jpg');
INSERT INTO tb_product (name, description, price, img_url) VALUES ('Refrigerator', 'Energy-efficient refrigerator', 900.00, 'http://example.com/refrigerator.jpg');
INSERT INTO tb_product (name, description, price, img_url) VALUES ('Coffee Maker', 'Automatic coffee maker', 100.00, 'http://example.com/coffeemaker.jpg');
INSERT INTO tb_product (name, description, price, img_url) VALUES ('E-Reader', 'High-resolution e-reader', 150.00, 'http://example.com/ereader.jpg');
INSERT INTO tb_product (name, description, price, img_url) VALUES ('Bookshelf', 'Minimalist bookshelf', 200.00, 'http://example.com/bookshelf.jpg');
INSERT INTO tb_product (name, description, price, img_url) VALUES ('Microwave Oven', 'High-power microwave oven', 180.00, 'http://example.com/microwave.jpg');
INSERT INTO tb_product (name, description, price, img_url) VALUES ('AMD RX-6600', 'AMD GPU 6gen low price', 799.00, 'http://example.com/rx6600.jpg');
INSERT INTO tb_product (name, description, price, img_url) VALUES ('AMD RX-7600', 'AMD GPU 7gen low price', 899.00, 'http://example.com/rx7600.jpg');
INSERT INTO tb_product (name, description, price, img_url) VALUES ('AMD RX-7700XT', 'AMD GPU 7gen high end performance intermediate price', 960.00, 'http://example.com/rx7700xt.jpg');
INSERT INTO tb_product (name, description, price, img_url) VALUES ('Nvidia RTX 4060', 'Nvidia 40 series GPU low price', 880.00, 'http://example.com/rtx4060.jpg');
INSERT INTO tb_product (name, description, price, img_url) VALUES ('Nvidia RTX 4080ti', 'Nvidia 40 series GPU ultra performance high price', 1200.00, 'http://example.com/rtx4080ti.jpg');
INSERT INTO tb_product (name, description, price, img_url) VALUES ('Nvidia RTX 5070', 'Nvidia 50 series GPU high performance high price', 1100.00, 'http://example.com/rtx5070.jpg');

-- Relacionar Produtos com Categorias
INSERT INTO tb_product_category (product_id, category_id) VALUES (1, 1);  -- Smartphone in Electronics
INSERT INTO tb_product_category (product_id, category_id) VALUES (2, 1);  -- Tablet in Electronics
INSERT INTO tb_product_category (product_id, category_id) VALUES (3, 3);  -- Blender in Home & Kitchen
INSERT INTO tb_product_category (product_id, category_id) VALUES (4, 1);  -- Laptop in Electronics
INSERT INTO tb_product_category (product_id, category_id) VALUES (5, 1);  -- Headphones in Electronics
INSERT INTO tb_product_category (product_id, category_id) VALUES (6, 3);  -- Refrigerator in Home & Kitchen
INSERT INTO tb_product_category (product_id, category_id) VALUES (7, 3);  -- Coffee Maker in Home & Kitchen
INSERT INTO tb_product_category (product_id, category_id) VALUES (8, 2);  -- E-Reader in Books
INSERT INTO tb_product_category (product_id, category_id) VALUES (9, 3);  -- Bookshelf in Home & Kitchen
INSERT INTO tb_product_category (product_id, category_id) VALUES (10, 3); -- Microwave Oven in Home & Kitchen
INSERT INTO tb_product_category (product_id, category_id) VALUES (11, 1);
INSERT INTO tb_product_category (product_id, category_id) VALUES (12, 1);
INSERT INTO tb_product_category (product_id, category_id) VALUES (13, 1);
INSERT INTO tb_product_category (product_id, category_id) VALUES (14, 1);
INSERT INTO tb_product_category (product_id, category_id) VALUES (15, 1);
INSERT INTO tb_product_category (product_id, category_id) VALUES (16, 1);

-- Inserir Usuários
INSERT INTO tb_user (name, email, phone, birth_date, password) VALUES ('Alice', 'alice@example.com', '1234567890', '1990-01-01', '$2a$10$onOUZH3B60kq0.k55zmY.eRy7JoIWAnQG/d..ksac.Z/ofkRWPJt2');
INSERT INTO tb_user (name, email, phone, birth_date, password) VALUES ('Bob', 'bob@example.com', '0987654321', '1985-05-12', '$2a$10$onOUZH3B60kq0.k55zmY.eRy7JoIWAnQG/d..ksac.Z/ofkRWPJt2');
INSERT INTO tb_user (name, email, phone, birth_date, password) VALUES ('Rick', 'rick@example.com', '92752718', '1987-04-05', '$2a$10$onOUZH3B60kq0.k55zmY.eRy7JoIWAnQG/d..ksac.Z/ofkRWPJt2');

-- Inserir Pedidos
INSERT INTO tb_order (moment, status, client_id) VALUES (TIMESTAMP WITH TIME ZONE '2024-02-25T13:00:00Z', 1, 1);-- Pedido de Alice

-- Inserir Itens de Pedido
INSERT INTO tb_order_item (order_id, product_id, quantity, price) VALUES (1, 1, 1, 1200.00);
INSERT INTO tb_order_item (order_id, product_id, quantity, price) VALUES (1, 2, 2, 45.00);

-- Inserir Pagamentos
INSERT INTO tb_payment (moment, order_id) VALUES (TIMESTAMP WITH TIME ZONE '2024-08-05 10:15:00', 1);

INSERT INTO tb_role (authority) VALUES ('ROLE_OPERATOR');
INSERT INTO tb_role (authority) VALUES ('ROLE_ADMIN');

INSERT INTO tb_user_role (user_id, role_id) VALUES (1, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 2);
INSERT INTO tb_user_role (user_id, role_id) VALUES (3, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (3, 2);
