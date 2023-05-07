-- SQL dump generated using DBML (dbml-lang.org)
-- Database: MySQL
-- Generated at: 2023-05-07T16:32:55.816Z

CREATE TABLE `Usuario` (
  `ID_Usuario` integer PRIMARY KEY COMMENT 'Identificador del usuario',
  `Nombre` varchar(255) NOT NULL COMMENT 'Guarda el nombre del usuario',
  `Apellidos` varchar(255) NOT NULL COMMENT 'Guarda el o los apellidos del usuario',
  `Contrasena` varchar(255) NOT NULL COMMENT 'Contraseña encriptada del usuario',
  `Rol` integer NOT NULL COMMENT 'Identifica las capacidades del usuario'
);

CREATE TABLE `Rol` (
  `ID_Rol` integer PRIMARY KEY COMMENT 'Indentificador unico del usuario',
  `Tipo_rol` varchar(255) UNIQUE NOT NULL COMMENT 'Nombre del rol',
  `Detalles_rol` varchar(255) COMMENT 'Detalles sobre el rol'
);

CREATE TABLE `Producto` (
  `SKU` integer PRIMARY KEY COMMENT 'Identificador unico para cada producto',
  `Nombre` varchar(255) NOT NULL COMMENT 'Nombre del producto',
  `Descripcion` varchar(255) NOT NULL,
  `Dimensiones` varchar(255) NOT NULL,
  `Peso_recipiente` integer NOT NULL,
  `Peso_desechable` integer NOT NULL,
  `Alquiler_Comercios` integer NOT NULL COMMENT 'Costo para el alquiler a comercio incluyendo IVA',
  `Alquiler_Retail` integer NOT NULL COMMENT 'Costo para el alquiler a retail incluyendo IVA'
);

CREATE TABLE `Categoria` (
  `ID_Categoria` integer PRIMARY KEY,
  `Nombre_categoria` varchar(255) NOT NULL COMMENT 'Nombre de la categoría'
);

ALTER TABLE `Usuario` ADD FOREIGN KEY (`Rol`) REFERENCES `Rol` (`ID_Rol`);

CREATE TABLE `Producto_Categoria` (
  `Producto_SKU` integer,
  `Categoria_ID_Categoria` integer,
  PRIMARY KEY (`Producto_SKU`, `Categoria_ID_Categoria`)
);

ALTER TABLE `Producto_Categoria` ADD FOREIGN KEY (`Producto_SKU`) REFERENCES `Producto` (`SKU`);

ALTER TABLE `Producto_Categoria` ADD FOREIGN KEY (`Categoria_ID_Categoria`) REFERENCES `Categoria` (`ID_Categoria`);

