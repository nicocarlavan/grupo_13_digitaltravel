-- Digital Travel DB
-- Curso Full Stack Node - Digital House

-- Nicolás Fernández Carlavan
-- Francesca Colombres
-- Gonzalo Cardarelli

-- Datos de prueba
-- Usuario administrador: nfernandez22@gmail.com
-- Password: 1

USE digitaltravel_db;

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
city_id,
image
)
VALUES
('Hilton New York', 'Descripcion Prueba 123', 5, 1, 'img-faenabue.jpg'),
('Four Seasons Buenos Aires', 'Descripcion Prueba 123', 5, 2,'img-fourseasonslon.jpg'),
('Riu Miami', 'Descripcion Prueba 123', 5, 4,'img-holidayinnmia.jpg'),
('Riu Paris', 'Descripcion Prueba 123', 5, 5,'img-mandarinkul.jpg'),
('Sheraton Londres', 'Descripcion Prueba 123', 5, 3,'img-sofiteldxb.jpg');
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
('Nicolas', 'Fernandez Carlavan', 'nfernandez22@gmail.com', "$2a$10$vlyVkSNgajbxdCG8AvXHS.IQ149IIMjg0VT8ywWb89soU202qD6M2", '1630941840051.jpeg', 2),
('Nicolas', 'Fernandez Carlavan', 'asd@asd.asd', "$2a$10$vlyVkSNgajbxdCG8AvXHS.IQ149IIMjg0VT8ywWb89soU202qD6M2", '1630940844858.jpeg', 1);
UNLOCK TABLES;


LOCK TABLES `carts` WRITE;
INSERT INTO `carts` (
user_id,
paid
)
VALUES
(1, 1),
(2, 0),
(1, 1),
(2, 0);
UNLOCK TABLES;


LOCK TABLES `cartItems` WRITE;
INSERT INTO `cartItems` (
product_id,
cart_id,
inDate,
outDate
)
VALUES
(1, 1, '2022-01-12', '2022-02-21'),
(2, 1, '2021-10-21', '2021-10-24'),
(3, 2, '2021-10-10', '2021-10-21'),
(1, 2, '2021-11-21', '2021-11-29'),
(2, 3, '2021-12-01', '2021-12-16'),
(1, 3, '2021-12-21', '2021-12-24'),
(4, 4, '2022-02-02', '2022-02-08');
UNLOCK TABLES;