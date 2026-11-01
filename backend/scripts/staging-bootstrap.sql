-- Bootstrap mínimo para staging (após Flyway V1). Idempotente o bastante para reexecução parcial.

INSERT INTO tb_role (authority)
SELECT 'ROLE_OPERATOR' WHERE NOT EXISTS (SELECT 1 FROM tb_role WHERE authority = 'ROLE_OPERATOR');

INSERT INTO tb_role (authority)
SELECT 'ROLE_ADMIN' WHERE NOT EXISTS (SELECT 1 FROM tb_role WHERE authority = 'ROLE_ADMIN');

INSERT INTO tb_user (name, email, phone, birth_date, password)
SELECT 'Staging Admin', 'admin@mshop.staging', '0000000000', DATE '1990-01-01',
       '$2a$10$onOUZH3B60kq0.k55zmY.eRy7JoIWAnQG/d..ksac.Z/ofkRWPJt2'
WHERE NOT EXISTS (SELECT 1 FROM tb_user WHERE email = 'admin@mshop.staging');

INSERT INTO tb_user_role (user_id, role_id)
SELECT u.id, r.id
FROM tb_user u
CROSS JOIN tb_role r
WHERE u.email = 'admin@mshop.staging'
  AND NOT EXISTS (
      SELECT 1 FROM tb_user_role ur WHERE ur.user_id = u.id AND ur.role_id = r.id
  );

INSERT INTO tb_category (name)
SELECT 'Electronics' WHERE NOT EXISTS (SELECT 1 FROM tb_category WHERE name = 'Electronics');

INSERT INTO tb_product (name, description, price, img_url)
SELECT 'Staging Laptop', 'Produto de teste do staging', 999.00, 'http://example.com/staging-laptop.jpg'
WHERE NOT EXISTS (SELECT 1 FROM tb_product WHERE name = 'Staging Laptop');

INSERT INTO tb_product_category (product_id, category_id)
SELECT p.id, c.id
FROM tb_product p
CROSS JOIN tb_category c
WHERE p.name = 'Staging Laptop'
  AND c.name = 'Electronics'
  AND NOT EXISTS (
      SELECT 1 FROM tb_product_category pc
      WHERE pc.product_id = p.id AND pc.category_id = c.id
  );
