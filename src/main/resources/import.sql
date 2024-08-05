-- Inserir Categorias
INSERT INTO tb_category (name) VALUES ('Electronics'), ('Books'), ('Clothing');

-- Inserir Produtos
INSERT INTO tb_product (name, description, price, img_url) VALUES ('Laptop', 'High performance laptop', 1200.00, 'http://example.com/laptop.jpg'), ('Java Programming Book', 'Learn Java programming', 45.00, 'http://example.com/java-book.jpg'), ('T-Shirt', 'Comfortable cotton t-shirt', 20.00, 'http://example.com/tshirt.jpg');

-- Relacionar Produtos com Categorias
INSERT INTO tb_product_category (product_id, category_id) VALUES (1, 1); -- Laptop in Electronics
INSERT INTO tb_product_category (product_id, category_id) VALUES (2, 2); -- Java Programming Book in Books
INSERT INTO tb_product_category (product_id, category_id) VALUES (3, 3); -- T-Shirt in Clothing

-- Inserir Usuários
INSERT INTO tb_user (name, email, phone, birth_date, password) VALUES ('Alice', 'alice@example.com', '1234567890', '1990-01-01', 'password123'), ('Bob', 'bob@example.com', '0987654321', '1985-05-12', 'securepass');

-- Inserir Pedidos
INSERT INTO tb_order (moment, status, client_id) VALUES (TIMESTAMP WITH TIME ZONE '2024-02-25T13:00:00Z', 1, 1); -- Pedido de Alice
INSERT INTO tb_order (moment, status, client_id) VALUES (TIMESTAMP WITH TIME ZONE '2024-03-29T13:00:00Z', 3, 2); -- Pedido de Bob
INSERT INTO tb_order (moment, status, client_id) VALUES (TIMESTAMP WITH TIME ZONE '2024-03-30T13:00:00Z', 0, 2); -- Pedido de Bob

-- Inserir Itens de Pedido
INSERT INTO tb_order_item (order_id, product_id, quantity, price) VALUES (1, 1, 1, 1200.00); -- Laptop para Pedido de Alice
INSERT INTO tb_order_item (order_id, product_id, quantity, price) VALUES (1, 2, 2, 45.00);   -- Java Programming Book para Pedido de Alice
INSERT INTO tb_order_item (order_id, product_id, quantity, price) VALUES (2, 3, 1, 20.00);   -- T-Shirt para Pedido de Bob]

-- Inserir Pagamentos
INSERT INTO tb_payment (moment, order_id) VALUES (TIMESTAMP WITH TIME ZONE '2024-08-05 10:15:00', 2); -- Pagamento para Pedido de Bob