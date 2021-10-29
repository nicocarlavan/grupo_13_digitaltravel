-- Digital Travel DB
-- Curso Full Stack Node - Digital House

-- Nicolás Fernández Carlavan
-- Francesca Colombres
-- Gonzalo Cardarelli


CREATE DATABASE digitaltravel_db;
USE digitaltravel_db;


CREATE TABLE `hotelCategories` 
(
`id` int NOT NULL AUTO_INCREMENT,
`category` int(1) NOT NULL,
 PRIMARY KEY (`id`)
);


CREATE TABLE `cities`
(
  `id` int NOT NULL AUTO_INCREMENT,
  `city` varchar(30) NOT NULL,
   PRIMARY KEY(`id`)
);



CREATE TABLE `hotels`
(
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `description` varchar(500) NOT NULL,
  `hotelCategory_id` int,
  `city_id` int,
  `image` VARCHAR(200) NOT NULL,
  PRIMARY KEY(`id`),
  KEY `hotels_hotelCategory_id_foreign` (`hotelCategory_id`),
  KEY `hotels_city_id_foreign` (`city_id`),
  CONSTRAINT `hotels_hotelCategory_id_foreign` 
  FOREIGN KEY(`hotelCategory_id`) REFERENCES `hotelCategories`(`id`),
  CONSTRAINT `hotels_city_id_foreign` 
  FOREIGN KEY(`city_id`) REFERENCES `cities`(`id`)
);



CREATE TABLE `roomTypes`
(
  `id` int NOT NULL AUTO_INCREMENT,
  `type` char(3) NOT NULL,
  PRIMARY KEY(`id`)
);

CREATE TABLE `roomCategories`
(
 `id` int NOT NULL AUTO_INCREMENT,
 `category` varchar(10) NOT NULL,
  PRIMARY KEY(`id`)
);




CREATE TABLE `products`
(
`id` int NOT NULL AUTO_INCREMENT,
`hotel_id` int,
`roomType_id` int,
`roomCategory_id` int, 
`price` int, 
`discountRate` int,
`created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(`id`),
  KEY `products_hotel_id_foreign`(`hotel_id`),
  KEY `products_roomType_id_foreign`(`roomType_id`),
  KEY `products_roomCategory_id_foreign`(`roomCategory_id`),
  CONSTRAINT `products_hotel_id_foreign` 
  FOREIGN KEY(`hotel_id`) REFERENCES `hotels`(`id`),
  CONSTRAINT `products_roomType_id_foreign` 
  FOREIGN KEY (`roomType_id`) REFERENCES `roomTypes` (`id`),
  CONSTRAINT `products_roomCategory_id_foreign` 
  FOREIGN KEY(`roomCategory_id`) REFERENCES `roomCategories` (`id`)
);



CREATE TABLE `roles`
(
 `id` int NOT NULL AUTO_INCREMENT,
 `role` varchar(20) NOT NULL,
  PRIMARY KEY(`id`)
);

CREATE TABLE `users`
(
`id` int NOT NULL AUTO_INCREMENT,
`firstName` varchar(30) NOT NULL,
`lastName` varchar(50) NOT NULL,
`email` varchar(50) NOT NULL UNIQUE,
`password` varchar(150) NOT NULL,
`image` varchar(100),
`role_id` int NOT NULL DEFAULT 1,
`created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY(`id`),
 KEY `users_role_id_foreign`(`role_id`),
 CONSTRAINT `users_role_id_foreign` 
 FOREIGN KEY(`role_id`) REFERENCES `roles`(`id`)
);


CREATE TABLE `carts`
(
`id` int NOT NULL AUTO_INCREMENT,
`user_id` int,
`paid` int NOT NULL DEFAULT 0,
`created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
`updated_at` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY(`id`),
 KEY `carts_user_id_foreign`(`user_id`),
 CONSTRAINT `carts_user_id_foreign` 
 FOREIGN KEY(`user_id`) REFERENCES `users`(`id`)
);

CREATE TABLE `cartItems`
(
`id` int NOT NULL AUTO_INCREMENT,
`product_id` int,
`cart_id` int,
`inDate` DATE,
`outDate` DATE,
`created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY(`id`),
 KEY `cartItems_product_id_foreign`(`product_id`),
 KEY `cartItems_cart_id_foreign`(`cart_id`),
 CONSTRAINT `cartItems_product_id_foreign` 
 FOREIGN KEY(`product_id`) REFERENCES `products`(`id`),
 CONSTRAINT `cartItems_cart_id_foreign` 
 FOREIGN KEY(`cart_id`) REFERENCES `carts`(`id`)
);
