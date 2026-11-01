-- mShop schema (PostgreSQL). Matches JPA entities; ddl-auto=none on dev/prod.

CREATE TABLE IF NOT EXISTS tb_category (
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS tb_product (
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR(255),
    description TEXT,
    price       FLOAT8,
    img_url     VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS tb_product_category (
    product_id  BIGINT NOT NULL REFERENCES tb_product (id),
    category_id BIGINT NOT NULL REFERENCES tb_category (id),
    PRIMARY KEY (product_id, category_id)
);

CREATE TABLE IF NOT EXISTS tb_user (
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR(255),
    email       VARCHAR(255) UNIQUE,
    phone       VARCHAR(255),
    birth_date  DATE,
    password    VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS tb_role (
    id          BIGSERIAL PRIMARY KEY,
    authority   VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS tb_user_role (
    user_id BIGINT NOT NULL REFERENCES tb_user (id),
    role_id BIGINT NOT NULL REFERENCES tb_role (id),
    PRIMARY KEY (user_id, role_id)
);

CREATE TABLE IF NOT EXISTS tb_order (
    id          BIGSERIAL PRIMARY KEY,
    moment      TIMESTAMP WITHOUT TIME ZONE,
    status      INTEGER,
    client_id   BIGINT REFERENCES tb_user (id)
);

CREATE TABLE IF NOT EXISTS tb_order_item (
    order_id    BIGINT NOT NULL REFERENCES tb_order (id),
    product_id  BIGINT NOT NULL REFERENCES tb_product (id),
    quantity    INTEGER,
    price       FLOAT8,
    PRIMARY KEY (order_id, product_id)
);

-- Payment shares PK with order (@MapsId)
CREATE TABLE IF NOT EXISTS tb_payment (
    order_id    BIGINT PRIMARY KEY REFERENCES tb_order (id),
    moment      TIMESTAMP WITHOUT TIME ZONE
);

CREATE TABLE IF NOT EXISTS tb_password_recover (
    id          BIGSERIAL PRIMARY KEY,
    token       VARCHAR(255) NOT NULL,
    email       VARCHAR(255) NOT NULL,
    expiration  TIMESTAMP WITH TIME ZONE NOT NULL
);
