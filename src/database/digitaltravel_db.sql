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
  PRIMARY KEY(`id`),
  KEY `hotels_hotelCategory_id_foreign` (`hotelCategory_id`),
  KEY `hotels_city_id_foreign` (`city_id`),
  CONSTRAINT `hotels_hotelCategory_id_foreign` 
  FOREIGN KEY(`hotelCategory_id`) REFERENCES `hotelCategories`(`id`),
  CONSTRAINT `hotels_city_id_foreign` 
  FOREIGN KEY(`city_id`) REFERENCES `cities`(`id`)
);



CREATE TABLE `hotelImages`
(
 `id` int NOT NULL AUTO_INCREMENT,
 `image` varchar(100) NOT NULL,
 `hotel_id` int,
  PRIMARY KEY(`id`),
  KEY `hotelImages_hotel_id_foreign`(`hotel_id`),
  CONSTRAINT `hotelImages_hotel_id_foreign` 
  FOREIGN KEY(`hotel_id`) REFERENCES `hotels`(`id`)
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



CREATE TABLE `carts`
(
`id` int NOT NULL AUTO_INCREMENT,
`product_id` int,
`inDate` DATETIME NOT NULL,
`outDate` DATETIME NOT NULL,
`created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(`id`),
  KEY `carts_product_id_foreign`(`product_id`),
  CONSTRAINT `carts_product_id_foreign` 
  FOREIGN KEY(`product_id`) REFERENCES `products`(`id`)
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



CREATE TABLE `sales`
(
`id` int NOT NULL AUTO_INCREMENT,
`user_id` int,
`cart_id` int UNIQUE,
`paid` int not NULL DEFAULT 0,
`created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
`updated_at` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 PRIMARY KEY(`id`),
 KEY `sales_user_id_foreign`(`user_id`),
 KEY `sales_cart_id_foreign`(`cart_id`),
 CONSTRAINT `sales_user_id_foreign` 
 FOREIGN KEY(`user_id`) REFERENCES `users`(`id`),
 CONSTRAINT `sales_cart_id_foreign` 
 FOREIGN KEY(`cart_id`) REFERENCES `carts`(`id`)
);


LOCK TABLES `hotelCategories` WRITE;
INSERT INTO `hotelCategories` (
category
)
VALUES
  (1),
  (2),
  (3),
  (4),
  (5);
UNLOCK TABLES;



LOCK TABLES `cities` WRITE;
INSERT INTO `cities` (
city
)
VALUES
  ('New York'),
  ('Buenos Aires'),
  ('Londres'),
  ('Miami'),
  ('Paris');
UNLOCK TABLES;

LOCK TABLES `hotels` WRITE;
INSERT INTO `hotels` (
name,
description,
hotelCategory_id,
city_id
)
VALUES
('Hilton New York', 'Descripcion Prueba 123', 5, 1),
('Four Seasons Buenos Aires', 'Descripcion Prueba 123', 5, 2),
('Riu Miami', 'Descripcion Prueba 123', 5, 4),
('Riu Paris', 'Descripcion Prueba 123', 5, 5),
('Sheraton Londres', 'Descripcion Prueba 123', 5, 3);
UNLOCK TABLES;


LOCK TABLES `hotelImages` WRITE;
INSERT INTO `hotelImages` (
image,
hotel_id
)
VALUES
('img-faenabue', 1),
('img-fourseasonslon', 2),
('img-holidayinnmia', 3),
('img-mandarinkul', 4),
('img-sofiteldxb', 5),
('img-faenabue', 1),
('img-fourseasonslon', 2),
('img-holidayinnmia', 3),
('img-mandarinkul', 4),
('img-sofiteldxb', 5);
UNLOCK TABLES;


LOCK TABLES `roomTypes` WRITE;
INSERT INTO `roomTypes` (
type
)
VALUES
  ('SGL'),
  ('DBL'),
  ('TPL'),
  ('CPL'),
  ('QPL');
UNLOCK TABLES;


LOCK TABLES `roomCategories` WRITE;
INSERT INTO `roomCategories` (
category
)
VALUES
  ('Standard'),
  ('Lujo'),
  ('Suite');
UNLOCK TABLES;


LOCK TABLES `products` WRITE;
INSERT INTO `products` (
hotel_id,
roomType_id,
roomCategory_id,
price,
discountRate
)
VALUES
(2, 1, 1, 220, 0),
(3, 2, 2, 100, 10),
(4, 3, 2, 540, 15),
(5, 4, 3, 370, 5);
UNLOCK TABLES;

LOCK TABLES `carts` WRITE;
INSERT INTO `carts` (
product_id,
inDate,
outDate
)
VALUES
(1, '2022-01-12', '2022-02-21'),
(2, '2021-10-21', '2021-10-24'),
(2, '2021-10-10', '2021-10-21'),
(3, '2021-11-21', '2021-11-29'),
(3, '2021-12-01', '2021-12-16'),
(4, '2021-12-21', '2021-12-24'),
(2, '2022-02-02', '2022-02-08'),
(1, '2021-10-29', '2021-11-04');
UNLOCK TABLES;

LOCK TABLES `roles` WRITE;
INSERT INTO `roles` (
role
)
VALUES
  ('usuario'),
  ('administrador');
UNLOCK TABLES;


LOCK TABLES `users` WRITE;
INSERT INTO `users` (
firstName,
lastName,
email,
password,
image,
role_id
)
VALUES
('Nicolas', 'Fernandez Carlavan', 'nfernandez22@gmail.com', '1', '1630941840051', 2),
('Nicolas', 'Fernandez Carlavan', 'asd@asd.asd', '1', '1630940844858', 1);
UNLOCK TABLES;

LOCK TABLE `sales` WRITE;
INSERT INTO `sales` (
user_id,
cart_id
)
VALUES
(1, 1),
(2, 2),
(1, 3),
(2, 4),
(1, 5),
(2, 6),
(2, 7),
(2, 8);
UNLOCK TABLES;