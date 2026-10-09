-- Добавить поля даты и рейтинга в существующую таблицу:
-- ALTER TABLE products
--   ADD created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER discount,
--   ADD rating DECIMAL(3, 2) NOT NULL DEFAULT 0 AFTER created_at;
--
-- UPDATE products SET rating = ROUND(3 + RAND() * 2, 2);

CREATE DATABASE IF NOT EXISTS nuxt_shop CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE nuxt_shop;

CREATE TABLE IF NOT EXISTS categories (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(100) NOT NULL,
  title VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  category_id INT(11) NOT NULL,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  discount TINYINT UNSIGNED NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  rating DECIMAL(3, 2) NOT NULL DEFAULT 0,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS product_images (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_id INT(10) UNSIGNED NOT NULL,
  path VARCHAR(500) NOT NULL,
  alt VARCHAR(255) NULL,
  sort_order INT(11) NOT NULL DEFAULT 0,
  CONSTRAINT fk_images_product
    FOREIGN KEY (product_id) REFERENCES products(id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(100) NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- demo@shoppe.local / password123
INSERT INTO users (email, password_hash, name) VALUES
  ('demo@shoppe.local', '$2b$10$XWmV2SyvUV03qmIDrrOlQuGQzj4.B84TV6IMqSXWDWhAh7LUtd/I.', 'Demo User');

INSERT INTO categories (slug, title) VALUES
  ('bracelets', 'Браслеты'),
  ('rings', 'Кольца'),
  ('necklaces', 'Ожерелья'),
  ('earrings', 'Серьги');

INSERT INTO products (category_id, name, price, discount, rating) VALUES
  (1, 'Moonlight Bracelet', 120.00, 10, 4.50),
  (2, 'Pearl Ring', 89.00, NULL, 3.80),
  (3, 'Crystal Necklace', 150.00, 15, 4.90);
