INSERT INTO Rol (ID_Rol, Tipo_rol, Detalles_rol)
VALUES 
  (1, 'Administrador', 'Rol con acceso a todas las funcionalidades del sistema'),
  (2, 'Usuario normal', 'Rol con acceso limitado a ciertas funcionalidades del sistema'),
  (3, 'Invitado', 'Rol con acceso limitado a funcionalidades básicas del sistema');

INSERT INTO Usuario (ID_Usuario, Nombre, Apellidos, Contrasena, ID_Rol)
VALUES 
  (1, 'Juan', 'Pérez García', 'contraseña1', 1),
  (2, 'María', 'Rodríguez López', 'contraseña2', 2),
  (3, 'Luis', 'González Pérez', 'contraseña3', 2),
  (4, 'Ana', 'Martínez García', 'contraseña4', 3),
  (5, 'Jorge', 'Hernández Ruiz', 'contraseña5', 3);

INSERT INTO Categoria (ID_Categoria, Nombre_categoria)
VALUES
  (1, 'Sopa'),
  (2, 'Sin división'),
  (3, 'Medio'),
  (4, 'Compartimientos'),
  (5, 'Vaso'),
  (6, 'Plato'),
  (7, 'Plato sopa');

INSERT INTO Familia (ID_Familia, Nombre_familia)
VALUES
  (1, 'Costas'),
  (2, 'Bosques'),
  (3, 'Páramos'),
  (4, 'Otra');

INSERT INTO Color (ID_Color, Descripcion)
VALUES
  (1, 'JA'),
  (2, 'CL'),
  (3, 'BL'),
  (4, 'RJ'),
  (5, 'RO'),
  (6, 'MO');

INSERT INTO Estado (ID_Estado, Descripcion_estadoproducto)
VALUES
  (1, 'Disponible'),
  (2, 'Descontinuado');

INSERT INTO Producto (SKU, Nombre, Familia, Descripcion, Categoria, Color, Dimensiones, Imagen, Peso_recipiente, Peso_desechable, Alquiler_Comercios, Alquiler_Retail)
VALUES
  ('EC-07-1-JA', 'Montezuma', 1,'Sopa pequeña', 1, 1,'12 oz (4,25"" Top Dia., 2,75"" Tall)', 'noimage.jpg', 100, 90,130,170),
  ('EC-08-1-JA', 'Ena', 3,'Sin compartimientos pequeño', 2, 1, '05,00""L-05,00""W-03,25""H', 'noimage.jpg', 100, 90,110,150),
  ('EC-10-1-JA', 'Dota', 2,'Sin compartimientos tapa regular', 2, 1,'09,00""L-09,00""W-03,50""H', 'noimage.jpg', 100, 90,290,330),
  ('EC-11-1-CL', 'Urán', 3,'Medio tamaño', 3, 2,'09,00""L-06,50""W-02,75""H', 'noimage.jpg', 100, 90,185,225),
  ('EC-11-1-JA', 'Urán', 3,'Medio tamaño', 3, 1,'09,00""L-06,50""W-02,75""H', 'noimage.jpg', 100, 90,185,2250),
  ('EC-12-1-CL','Tapantí', 2,'3 compartimientos tapa regular', 4, 2,'09,00""L-09,00""W-02,50""H', 'noimage.jpg', 110, 90,235,280),
  ('EC-12-1-JA','Tapantí', 2,'3 compartimientos tapa regular', 4,1,'09,00""L-09,00""W-02,50""H', 'noimage.jpg', 110, 90,235,280),
  ('EC-13-1-JA','Sirena', 1,'Sopa regular', 1, 1,'16 oz (4,25"" Top Dia., 3,75"" Tall)', 'noimage.jpg', 110, 95,150,190),
  ('EC-15-2-JA','Monteverde', 2,'2 compartimientos tapa regular', 4, 1,'10,00""L-08,00""W-03,00""H', 'noimage.jpg', 110, 95,235,280),
  ('EC-17-JA','Corcovado', 2,'Sin compartimientos tapa plana', 2, 1,'09,00""L-09,00""W-02,00""H', 'noimage.jpg', 115, 100,290,330),
  ('EC-18-JA','Kamúk', 3,'Medio tamaño tapa plana', 3, 1,'09,00""L-06,50""W-02,00""H', 'noimage.jpg', 115, 100,185,225),
  ('EC-19-CL','Chirripó', 3,'Medio tamaño pequeño', 3, 2,'08,00""L-05,50""W-02,75""H', 'noimage.jpg', 115, 100,160,200),
  ('EC-19-JA','Chirripó', 3,'Medio tamaño pequeño', 3, 1,'08,00""L-05,50""W-02,75""H', 'noimage.jpg', 120, 105,160,200),
  ('EC-23-1-JA','Chiquita', 1,'Bowl pequeño', 1, 1,'12 oz (4,375"" Top Dia., 2,3"" Tall)', 'noimage.jpg', 120, 105,130,170),
  ('EC-24-1-JA','Coco', 1,'Bowl regular', 1, 1,'16 oz (4,375"" Top Dia., 2,9"" Tall)', 'noimage.jpg',51, 40,150,190),
  ('M-212-BL','SinNombre', 4,'Vaso 400 mL', 5, 3,'08,80 cm Dia - 11,60 cm H', 'noimage.jpg',45.6,10,130,170),
  ('M-271-RJ','SinNombre', 4,'Plato redondo ensalada', 6, 4,'20,50 cm Dia - 02,00 cm H', 'noimage.jpg',55.8,7,43,90),
  ('M-271-RO','SinNombre', 4,'Plato redondo ensalada', 6, 5,'20,50 cm Dia - 02,00 cm H', 'noimage.jpg',52.95,7,43,90),
  ('M-273-BL','SinNombre', 4,'Plato redondo principal', 6, 3,'23,50 cm Dia - 02,00 cm H', 'noimage.jpg',80.45,14,80.51,115),
  ('M-273-MO','SinNombre', 4,'Plato redondo principal', 6, 6,'23,50 cm Dia - 02,00 cm H', 'noimage.jpg',79.25,14,80.51,115),
  ('M-273-RO','SinNombre', 4,'Plato redondo principal', 6, 5,'23,50 cm Dia - 02,00 cm H', 'noimage.jpg',81.65,14,80.51,115),
  ('M-275-BL','SinNombre', 4,'Plato semi hondo', 7, 3,'18,30 cm Dia - 03,70 cm H', 'noimage.jpg',58.6,8,55,90);

INSERT INTO Inventario (Id_Inventario, Producto, Estado, Cantidad, Lote, Fecha_ingreso)
VALUES
  (1, 'EC-07-1-JA', 1, 300, 1, '2023-05-09'),
  (2, 'EC-08-1-JA', 1, 100, 1, '2023-05-09'),
  (3, 'EC-10-1-JA', 1, 90, 1, '2023-05-09'),
  (4, 'EC-11-1-CL', 1, 230, 1, '2023-05-09'),
  (5, 'EC-11-1-JA', 1, 70, 2, '2023-05-09'),
  (6, 'EC-12-1-CL', 1, 100, 2, '2023-05-09'),
  (7, 'EC-12-1-JA', 1, 100, 1, '2023-05-09'),
  (8, 'EC-13-1-JA', 1, 100, 1, '2023-05-09'),
  (9, 'EC-15-2-JA', 1, 100, 1, '2023-05-09'),
  (10,'EC-17-JA', 1, 58, 1, '2023-05-09'),
  (11,'EC-18-JA', 1, 200, 2, '2023-05-09'),
  (12,'EC-19-CL', 1, 75, 1, '2023-05-09'),
  (13,'EC-19-JA', 1, 100, 1, '2023-05-09'),
  (14,'EC-23-1-JA', 1, 100, 1, '2023-05-09'),
  (15,'EC-24-1-JA', 1, 100, 1, '2023-05-09'),
  (16,'M-212-BL', 1, 100, 1, '2023-05-09'),
  (17,'M-271-RJ', 1, 80, 3, '2023-05-09'),
  (18,'M-271-RO', 1, 90, 3, '2023-05-09'),
  (19,'M-273-BL', 1, 80, 3, '2023-05-09'),
  (20,'M-273-MO', 1, 200, 1, '2023-05-09'),
  (21,'M-273-RO', 1, 300, 1, '2023-05-09'),
  (22,'M-275-BL', 1, 100, 1, '2023-05-09');

INSERT INTO Segmento (ID_Segmento, Detalles)
VALUES
('Cafeteria', 'Caracteristicas de las cafeterias'),
('Panaderia', 'Caracteristicas de la panaderia');

INSERT INTO MedioComunicacion (ID_Medio, Caracteristicas)
VALUES
  ('Medio1', 'Caracteristicas del medio 1'),
  ('Medio2', 'Caracteristicas del medio 2');

INSERT INTO Cliente (ID_Cliente, Fecha_agregado, Responsable, Prioridad, Estado, Nombre_empresa, Contacto, Telefono, Correo, Web)
VALUES
(1, '2022-05-01', 1, 'Alta', 'Clientes', 'Empresa A', 'Juan Perez', 5551234, 'juan.perez@empresaA.com', 'www.empresaA.com'),
(2, '2022-05-02', 2, 'Baja', 'Clientes', 'Empresa B', 'Maria Garcia', 5555678, 'maria.garcia@empresaB.com', 'www.empresaB.com');

INSERT INTO Cliente_Segmento (Cliente, Segmento)
VALUES
(1, 'Cafeteria'),
(2, 'Cafeteria'),
(2, 'Panaderia');

INSERT INTO Cliente_Comunicacion (Cliente, Medio)
VALUES
  (1, 'Medio1'),
  (1, 'Medio2'),
  (2, 'Medio1');