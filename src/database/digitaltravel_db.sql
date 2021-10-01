-- Nicolás Fernández Carlavan - DIGITAL HOUSE
-- Francesca Colombres - DIGITAL HOUSE
-- Gonzalo Cardarelli - DIGITAL HOUSE

CREATE DATABASE digitaltravel_db;
USE digitaltravel_db;


CREATE TABLE `hotelCategories`
(
  `id` int NOT NULL AUTO_INCREMENT,
  `category` int
(1) NOT NULL,
  PRIMARY KEY
(`id`)
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


CREATE TABLE `cities`
(
  `id` int NOT NULL AUTO_INCREMENT,
  `city` varchar
(30) NOT NULL,
  PRIMARY KEY
(`id`)
);

LOCK TABLES `cities` WRITE;
INSERT INTO `cities` (
city
)
VALUES
  ('New York'),
  ('Buenos Aires'
),
  ('Londres'
),
  ('Miami'
),
  ('Paris'
)
,
UNLOCK TABLES;





CREATE TABLE `hotels`
(
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar
(200) NOT NULL,
`description` varchar
(500) NOT NULL,
  `hotelCategory_id` int,
  `city_id` int,
  PRIMARY KEY
(`id`),
  KEY `hotels_hotelCategory_id_foreign`
(`hotelCategory_id`),
  KEY `hotels_city_id_foreign`
(`city_id`),
  CONSTRAINT `hotels_hotelCategory_id_foreign` FOREIGN KEY
(`hotelCategory_id`) REFERENCES `hotelCategories`
(`id`),
  CONSTRAINT `hotels_city_id_foreign` FOREIGN KEY
(`city_id`) REFERENCES `cities`
(`id`)
);


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
('Sheraton Londres', 'Descripcion Prueba 123', 5, 3),;
UNLOCK TABLES;





CREATE TABLE `hotelImages`
(
  `id` int NOT NULL AUTO_INCREMENT,
`image` varchar
(100) NOT NULL,
`hotel_id` int,
  PRIMARY KEY
(`id`),
  KEY `hotelImages_hotel_id_foreign`
(`hotel_id`),
  CONSTRAINT `hotelImages_hotel_id_foreign` FOREIGN KEY
(`hotel_id`) REFERENCES `hotels`
(`id`)
);





CREATE TABLE `products`
(
  `id` int NOT NULL AUTO_INCREMENT,
`hotel_id` int,
`roomType_id` int,
`roomCategory_id` int, 
`price` int, 
`discount` varchar(5) NOT NULL,
`created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY
(`id`),
  KEY `products_hotel_id_foreign`
(`hotel_id`),
  KEY `products_id_foreign`
(`id`),
  KEY `products_roomType_id_foreign`
(`roomType_id`),
  KEY `products_roomCategory_id_foreign`
(`roomCategory`),
  CONSTRAINT `products_hotel_id_foreign` FOREIGN KEY
(`hotel_id`) REFERENCES `hotels`
(`id`),
  CONSTRAINT `products_id_foreign` FOREIGN KEY 
  (`id`) REFERENCES `carts` (`product_id`),
  CONSTRAINT `products_roomType_id_foreign` FOREIGN KEY 
  (`roomType_id`) REFERENCES `roomTypes` (`id`),
  CONSTRAINT `products_roomCategory_id_foreign` FOREIGN KEY
  (`roomCategory_id`) REFERENCES `roomCategories` (`id`)
);


CREATE TABLE `roomTypes`
(
  `id` int NOT NULL AUTO_INCREMENT,
`type` char(3) NOT NULL,
  PRIMARY KEY
(`id`),
  KEY `roomTypes_id_foreign`
(`id`),
  CONSTRAINT `roomTypes_id_foreign` FOREIGN KEY
(`id`) REFERENCES `products`
(`roomType_id`)
);

CREATE TABLE `roomCategories`
(
  `id` int NOT NULL AUTO_INCREMENT,
`category` varchar(10) NOT NULL,
  PRIMARY KEY
(`id`),
  KEY `roomCategories_id_foreign`
(`id`),
  CONSTRAINT `roomCategories_id_foreign` FOREIGN KEY
(`id`) REFERENCES `products`
(`roomCategory_id`)
);


CREATE TABLE `carts`
(
  `id` int NOT NULL AUTO_INCREMENT,
`product_id` int,
`created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY
(`id`),
  KEY `carts_id_foreign`
(`id`),
  CONSTRAINT `carts_id_foreign` FOREIGN KEY
(`id`) REFERENCES `sales`
(`cart_id`)
);

CREATE TABLE `sales`
(
  `id` int NOT NULL AUTO_INCREMENT,
`user_id` int,
`cart_id` int,
`quantity` int,
`totalPrice` int,
`created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
`updated_at` DATETIME ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY
(`id`),
  KEY `sales_user_id_foreign`
(`user_id`),
  CONSTRAINT `sales_user_id_foreign` FOREIGN KEY
(`user_id`) REFERENCES `users`
(`id`)
);

CREATE TABLE `users`
(
  `id` int NOT NULL AUTO_INCREMENT,
`firstName` varchar(30) NOT NULL,
`lastName` varchar(50) NOT NULL,
`email` varchar(50) NOT NULL UNIQUE,
`password` varchar(150) NOT NULL,
`image` varchar(100) NOT NULL,
`role_id` int,
`created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY
(`id`),
  KEY `users_role_id_foreign`
(`role_id`),
  CONSTRAINT `usersrole_role_id_foreign` FOREIGN KEY
(`role_id`) REFERENCES `roles`
(`id`)
);



CREATE TABLE `roles`
(
  `id` int NOT NULL AUTO_INCREMENT,
`role` varchar(20) NOT NULL,
  PRIMARY KEY
(`id`),
  KEY `roles_id_foreign`
(`id`),
  CONSTRAINT `roles_id_foreign` FOREIGN KEY
(`id`) REFERENCES `users`
(`role_id`)
);



--LOCK TABLES `hotelImages` WRITE;
--INSERT INTO `hotelImages` (
--description)
--VALUES
--  ('Creada'),
--  ('Modificada'),
--  ('Eliminada');
--UNLOCK TABLES;



CREATE TABLE `categorias`
(
  `id` int NOT NULL AUTO_INCREMENT,
  `categoria` varchar
(100) NOT NULL,
  PRIMARY KEY
(`id`)
);

LOCK TABLES `categorias` WRITE;
INSERT INTO `categorias` (
categoria)
VALUES
  ('Música'),
  ('Televisión'),
  ('Personal'),
  ('Trabajo'),
  ('Universidad'),
  ('Curso'),
  ('Computadora'),
  ('DigitalHouse'),
  ('Auto'),
  ('Casa');
UNLOCK TABLES;


CREATE TABLE `notas`
(
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int,
  `status_id` int,
  `titulo` varchar
(100) NOT NULL,
  `created_at` datetime,
  `modified_at` datetime DEFAULT NULL,
  `description` varchar
(300) NOT NULL,
  `secured` tinyint
(1) NOT NULL,
  PRIMARY KEY
(`id`),
  KEY `notas_user_id_foreign`
(`user_id`),
  KEY `notas_status_id_foreign`
(`status_id`),
  CONSTRAINT `notas_user_id_foreign` FOREIGN KEY
(`user_id`) REFERENCES `users`
(`id`),
  CONSTRAINT `notas_status_id_foreign` FOREIGN KEY
(`status_id`) REFERENCES `status`
(`id`)
);


LOCK TABLES `notas` WRITE;
INSERT INTO `notas` (
user_id,
status_id,
titulo,
created_at,
modified_at,
description,
secured
)
VALUES
(1, 1, 'Hola1', '2011-01-12 00:00:00', NULL, 'Descripcion1', 1),
(2, 2, 'Hola2', '2015-04-15 00:00:00', '2015-07-15 00:00:00', 'Descripcion2', 0),
(2, 2, 'Hola3', '2013-02-11 00:00:00', '2015-04-15 00:00:00', 'Descripcion3', 1),
(4, 2, 'Hola4', '2014-09-05 00:00:00', '2014-12-15 00:00:00', 'Descripcion4', 1),
(3, 1, 'Hola5', '2019-11-04 00:00:00', NULL, 'Descripcion5', 1),
(5, 1, 'Hola6', '2020-12-08 00:00:00', NULL, 'Descripcion6', 0),
(9, 3, 'Hola7', '2016-10-11 00:00:00', '2018-01-15 00:00:00', 'Descripcion7', 0),
(10, 3, 'Hola8', '2010-01-21 00:00:00', '2012-03-15 00:00:00', 'Descripcion8', 0),
(7, 1, 'Hola9', '2011-07-08 00:00:00', NULL, 'Descripcion9', 0),
(2, 1, 'Hola10', '2009-07-08 00:00:00', NULL, 'Descripcion10', 1);
UNLOCK TABLES;



CREATE TABLE `notas_categorias`
(
  `id` int NOT NULL AUTO_INCREMENT,
  `nota_id` int,
  `categoria_id` int,
  PRIMARY KEY
(`id`),
  KEY `notas_categorias_nota_id_foreign`
(`nota_id`),
  KEY `notas_categorias_categoria_id_foreign`
(`categoria_id`),
  CONSTRAINT `notas_categorias_nota_id_foreign` FOREIGN KEY
(`nota_id`) REFERENCES `notas`
(`id`),
  CONSTRAINT `notas_categorias_categoria_id_foreign` FOREIGN KEY
(`categoria_id`) REFERENCES `categorias`
(`id`)
);

LOCK TABLES `notas_categorias` WRITE;
INSERT INTO `notas_categorias` (
nota_id,
categoria_id
)
VALUES
(1,9),
(4,4),
(2,2),
(7,1),
(8,5),
(3,7),
(9,7),
(2,3),
(3,2),
(1,8);
UNLOCK TABLES;