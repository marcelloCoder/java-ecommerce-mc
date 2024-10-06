-- Inserir Categorias
INSERT INTO tb_category (name) VALUES ('Electronics');
INSERT INTO tb_category (name) VALUES ('Books');
INSERT INTO tb_category (name) VALUES ('Clothing');
INSERT INTO tb_category (name) VALUES ('Home & Kitchen');
INSERT INTO tb_category (name) VALUES ('Sports & Outdoors');
INSERT INTO tb_category (name) VALUES ('Health & Personal Care');
INSERT INTO tb_category (name) VALUES ('Toys & Games');
INSERT INTO tb_category (name) VALUES ('Beauty');
INSERT INTO tb_category (name) VALUES ('Automotive');
INSERT INTO tb_category (name) VALUES ('Garden & Outdoor');
INSERT INTO tb_category (name) VALUES ('Music');

-- Inserir Produtos
INSERT INTO tb_product (name, description, price, img_url) VALUES ('Smartphone', 'Latest model smartphone', 800.00, 'http://example.com/smartphone.jpg');
INSERT INTO tb_product (name, description, price, img_url) VALUES ('Tablet', '10-inch display tablet', 300.00, 'http://example.com/tablet.jpg');
INSERT INTO tb_product (name, description, price, img_url) VALUES ('Blender', 'High-speed blender', 150.00, 'http://example.com/blender.jpg');
INSERT INTO tb_product (name, description, price, img_url) VALUES ('Running Shoes', 'Comfortable running shoes', 100.00, 'http://example.com/running-shoes.jpg');
INSERT INTO tb_product (name, description, price, img_url) VALUES ('Yoga Mat', 'Non-slip yoga mat', 25.00, 'http://example.com/yoga-mat.jpg');
INSERT INTO tb_product (name, description, price, img_url) VALUES ('Face Cream', 'Anti-aging face cream', 40.00, 'http://example.com/face-cream.jpg');
INSERT INTO tb_product (name, description, price, img_url) VALUES ('Toy Car', 'Remote control toy car', 35.00, 'http://example.com/toy-car.jpg');
INSERT INTO tb_product (name, description, price, img_url) VALUES ('Guitar', 'Acoustic guitar', 200.00, 'http://example.com/guitar.jpg');
INSERT INTO tb_product (name, description, price, img_url) VALUES ('Garden Hose', '50ft garden hose', 20.00, 'http://example.com/garden-hose.jpg');
INSERT INTO tb_product (name, description, price, img_url) VALUES ('Car Battery', 'High capacity car battery', 120.00, 'http://example.com/car-battery.jpg');
INSERT INTO tb_product (name, description, price, img_url) VALUES ('Cookware Set', '10-piece nonstick cookware set', 75.00, 'http://example.com/cookware-set.jpg');
INSERT INTO tb_product (name, description, price, img_url) VALUES ('Bicycle', 'Mountain bike', 500.00, 'http://example.com/bicycle.jpg');
INSERT INTO tb_product (name, description, price, img_url) VALUES ('Protein Powder', 'Whey protein powder', 60.00, 'http://example.com/protein-powder.jpg');
INSERT INTO tb_product (name, description, price, img_url) VALUES ('Lipstick', 'Matte finish lipstick', 15.00, 'http://example.com/lipstick.jpg');
INSERT INTO tb_product (name, description, price, img_url) VALUES ('Board Game', 'Family board game', 30.00, 'http://example.com/board-game.jpg');
INSERT INTO tb_product (name, description, price, img_url) VALUES ('Car Wax', 'Car wax polish', 10.00, 'http://example.com/car-wax.jpg');
INSERT INTO tb_product (name, description, price, img_url) VALUES ('Lawn Mower', 'Electric lawn mower', 200.00, 'http://example.com/lawn-mower.jpg');
INSERT INTO tb_product (name, description, price, img_url) VALUES ('Headphones', 'Noise-cancelling headphones', 150.00, 'http://example.com/headphones.jpg');
INSERT INTO tb_product (name, description, price, img_url) VALUES ('Coffee Maker', 'Single serve coffee maker', 80.00, 'http://example.com/coffee-maker.jpg');
INSERT INTO tb_product (name, description, price, img_url) VALUES ('Camping Tent', '4-person camping tent', 100.00, 'http://example.com/camping-tent.jpg');
INSERT INTO tb_product (name, description, price, img_url) VALUES ('Shampoo', 'Organic shampoo', 10.00, 'http://example.com/shampoo.jpg');
INSERT INTO tb_product (name, description, price, img_url) VALUES ('Action Figure', 'Superhero action figure', 25.00, 'http://example.com/action-figure.jpg');
INSERT INTO tb_product (name, description, price, img_url) VALUES ('Violin', 'Beginner violin', 250.00, 'http://example.com/violin.jpg');
INSERT INTO tb_product (name, description, price, img_url) VALUES ('Grill', 'Outdoor BBQ grill', 300.00, 'http://example.com/grill.jpg');
INSERT INTO tb_product (name, description, price, img_url) VALUES ('Dash Cam', 'HD dash cam', 60.00, 'http://example.com/dash-cam.jpg');
INSERT INTO tb_product (name, description, price, img_url) VALUES ('Vacuum Cleaner', 'Cordless vacuum cleaner', 180.00, 'http://example.com/vacuum-cleaner.jpg');
INSERT INTO tb_product (name, description, price, img_url) VALUES ('Treadmill', 'Foldable treadmill', 600.00, 'http://example.com/treadmill.jpg');
INSERT INTO tb_product (name, description, price, img_url) VALUES ('Hair Dryer', 'Ionic hair dryer', 50.00, 'http://example.com/hair-dryer.jpg');
INSERT INTO tb_product (name, description, price, img_url) VALUES ('Puzzle', '1000-piece jigsaw puzzle', 20.00, 'http://example.com/puzzle.jpg');
INSERT INTO tb_product (name, description, price, img_url) VALUES ('Motor Oil', 'Synthetic motor oil', 25.00, 'http://example.com/motor-oil.jpg');

-- Relacionar Produtos com Categorias
INSERT INTO tb_product_category (product_id, category_id) VALUES (4, 1);  -- Smartphone in Electronics
INSERT INTO tb_product_category (product_id, category_id) VALUES (5, 1);  -- Tablet in Electronics
INSERT INTO tb_product_category (product_id, category_id) VALUES (6, 4);  -- Blender in Home & Kitchen
INSERT INTO tb_product_category (product_id, category_id) VALUES (7, 5);  -- Running Shoes in Sports & Outdoors
INSERT INTO tb_product_category (product_id, category_id) VALUES (8, 5);  -- Yoga Mat in Sports & Outdoors
INSERT INTO tb_product_category (product_id, category_id) VALUES (9, 7);  -- Face Cream in Health & Personal Care
INSERT INTO tb_product_category (product_id, category_id) VALUES (10, 8); -- Toy Car in Toys & Games
INSERT INTO tb_product_category (product_id, category_id) VALUES (11, 10);-- Guitar in Music
INSERT INTO tb_product_category (product_id, category_id) VALUES (12, 10);-- Garden Hose in Garden & Outdoor
INSERT INTO tb_product_category (product_id, category_id) VALUES (13, 9); -- Car Battery in Automotive
INSERT INTO tb_product_category (product_id, category_id) VALUES (14, 4); -- Cookware Set in Home & Kitchen
INSERT INTO tb_product_category (product_id, category_id) VALUES (15, 5); -- Bicycle in Sports & Outdoors
INSERT INTO tb_product_category (product_id, category_id) VALUES (16, 6); -- Protein Powder in Health & Personal Care
INSERT INTO tb_product_category (product_id, category_id) VALUES (17, 8); -- Lipstick in Beauty
INSERT INTO tb_product_category (product_id, category_id) VALUES (18, 7); -- Board Game in Toys & Games
INSERT INTO tb_product_category (product_id, category_id) VALUES (19, 9); -- Car Wax in Automotive
INSERT INTO tb_product_category (product_id, category_id) VALUES (20, 10);-- Lawn Mower in Garden & Outdoor
INSERT INTO tb_product_category (product_id, category_id) VALUES (21, 1); -- Headphones in Electronics
INSERT INTO tb_product_category (product_id, category_id) VALUES (22, 4); -- Coffee Maker in Home & Kitchen
INSERT INTO tb_product_category (product_id, category_id) VALUES (23, 5); -- Camping Tent in Sports & Outdoors
INSERT INTO tb_product_category (product_id, category_id) VALUES (24, 6); -- Shampoo in Health & Personal Care
INSERT INTO tb_product_category (product_id, category_id) VALUES (25, 7); -- Action Figure in Toys & Games
INSERT INTO tb_product_category (product_id, category_id) VALUES (26, 10);-- Violin in Music
INSERT INTO tb_product_category (product_id, category_id) VALUES (27, 10);-- Grill in Garden & Outdoor
INSERT INTO tb_product_category (product_id, category_id) VALUES (28, 9); -- Dash Cam in Automotive
INSERT INTO tb_product_category (product_id, category_id) VALUES (29, 4); -- Vacuum Cleaner in Home & Kitchen
INSERT INTO tb_product_category (product_id, category_id) VALUES (30, 5); -- Treadmill in Sports & Outdoors


-- Inserir Usuários
INSERT INTO tb_user (name, email, phone, birth_date, password) VALUES ('Alice', 'alice@example.com', '1234567890', '1990-01-01', '$2a$10$onOUZH3B60kq0.k55zmY.eRy7JoIWAnQG/d..ksac.Z/ofkRWPJt2'), ('Bob', 'bob@example.com', '0987654321', '1985-05-12', '$2a$10$onOUZH3B60kq0.k55zmY.eRy7JoIWAnQG/d..ksac.Z/ofkRWPJt2');

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

INSERT INTO tb_role (authority) VALUES ('ROLE_OPERATOR');
INSERT INTO tb_role (authority) VALUES ('ROLE_ADMIN');

INSERT INTO tb_user_role (user_id, role_id) VALUES (1, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 2);
