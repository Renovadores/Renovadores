INSERT INTO Rol (RolId, TipoRol, DetallesRol)
VALUES 
  (1, 'Administrador', 'Rol con acceso a todas las funcionalidades del sistema'),
  (2, 'Usuario', 'Rol con acceso limitado a ciertas funcionalidades del sistema'),
  (3, 'Invitado', 'Rol con acceso limitado a funcionalidades básicas del sistema');

INSERT INTO Usuario (UsuarioId, Nombre, Apellidos, NombreUsuario, Contrasena, RolId)
VALUES 
  (1, 'Andrea', 'Quiros', 'Andrea', 'contrasena1', 1),
  (2, 'Fabiola', 'Chirino', 'Fabiola', 'contrasena2', 1),
  (3, 'Alejandro', 'Calderón', 'Alejandro', 'contrasena3', 1);

INSERT INTO Categoria (CategoriaId, NombreCategoria)
VALUES
  (1, 'Sopa'),
  (2, 'Sin división'),
  (3, 'Medio'),
  (4, 'Compartimientos'),
  (5, 'Vaso'),
  (6, 'Plato'),
  (7, 'Plato sopa');

INSERT INTO Familia (FamiliaId, NombreFamilia)
VALUES
  (1, 'Costas'),
  (2, 'Bosques'),
  (3, 'Páramos'),
  (4, 'Sin asignar');

INSERT INTO Cliente (ClienteId, FechaAgregado, ResponsableId, Prioridad, Estado, NombreEmpresa, Contacto, Telefono, Correo, Web)
VALUES
(1, '2022-01-01', 1, 'Alta', 'Clientes', 'Empresa A', 'Juan Perez', 11111111, 'juan.perez@empresaA.com', 'www.empresaA.com'),
(2, '2022-02-02', 2, 'Alta', 'Clientes', 'Empresa B', 'Maria Garcia', 22222222, 'maria.garcia@empresaB.com', 'www.empresaB.com'),
(3, '2022-03-03', 3, 'Alta', 'Clientes', 'Empresa C', 'Sofia Martinez', 33333333, 'sofia.martinez@empresaC.com', 'www.empresaC.com'),
(4, '2022-04-04', 1, 'Baja', 'Clientes', 'Empresa D', 'Valentina Lopez', 44444444, 'valentina.lopez@empresaD.com', 'www.empresaD.com'),
(5, '2022-05-05', 2, 'Baja', 'Clientes', 'Empresa E', 'Mateo Rodriguez', 55555555, 'mateo.rodriguez@empresaE.com', 'www.empresaE.com'),
(6, '2022-06-06', 3, 'Baja', 'Clientes', 'Empresa F', 'Santiago Sanchez', 66666666, 'santiago.sanchez@empresaF.com', 'www.empresaF.com');

INSERT INTO MedioComunicacion (MedioId, Caracteristicas)
VALUES
  ('Correo', 'Caracteristicas de correo'),
  ('Llamada', 'Caracteristicas de llamada'),
  ('Instagram', 'Caracteristicas de instagram'),
  ('Whatsapp', 'Caracteristicas de whatsapp'),
  ('Zoom', 'Caracteristicas de zoom'),
  ('Otra', 'Caracteristicas de otro medio');


INSERT INTO Segmento (SegmentoId, Detalles)
VALUES
('Cafeteria', 'Características de las cafeterías'),
('Catering', 'Características del servicio de catering'),
('Centro Educativo', 'Características de los centros educativos'),
('Comida Preparada', 'Características de la comida preparada'),
('Empresa', 'Características de las empresas'),
('Feria', 'Características de las ferias'),
('Otro Sector', 'Características de otro sector'),
('Panaderia', 'Características de las panaderías'),
('Restaurante', 'Características de los restaurantes'),
('Usuario Final', 'Características de los usuarios finales'),
('Supermercado', 'Características de los supermercados'),
('Otro', 'Características de otro segmento');

INSERT INTO Color (ColorId, Descripcion)
VALUES
  (1, 'JA'),
  (2, 'CL'),
  (3, 'BL'),
  (4, 'RJ'),
  (5, 'RO'),
  (6, 'MO');

INSERT INTO Estado (EstadoId, DescripcionEstadoProducto)
VALUES
  (1, 'Disponible'),
  (2, 'Descontinuado');

INSERT INTO Producto (ProductoId, Nombre, FamiliaId, Descripcion, CategoriaId, ColorId, Dimensiones, Imagen, PesoRecipiente, PesoDesechable,
			AlquilerComercios, AlquilerRetail,Descontinuado, TotalExistente, EnUso, Disponible, NoDevueltos)
VALUES
  ('EC-07-1-JA','Montezuma', 1,'Sopa pequeña', 1, 1,'12 oz (4,25"" Top Dia., 2,75"" Tall)', NULL, 50, 25,130,170, 0, 300, 50, 250, 0),
  ('EC-08-1-JA','Ena', 3,'Sin compartimientos pequeño', 2, 1,'05,00""L-05,00""W-03,25""H', NULL, 50, 25,110,150, 0, 100, 50, 50, 0),
  ('EC-10-1-JA','Dota', 2,'Sin compartimientos tapa regular', 2, 1,'09,00""L-09,00""W-03,50""H', NULL, 90, 45,290,330, 0, 90, 90, 0, 0),
  ('EC-11-1-CL','Urán', 3,'Medio tamaño', 3, 2,'09,00""L-06,50""W-02,75""H', NULL, 100, 50,185,225, 0, 230, 100, 130, 0),
  ('EC-11-1-JA','Urán', 3,'Medio tamaño', 3, 1,'09,00""L-06,50""W-02,75""H', NULL, 100, 50,185,2250, 0, 70, 50, 20, 0),
  ('EC-12-1-CL','Tapantí', 2,'3 compartimientos tapa regular', 4, 2,'09,00""L-09,00""W-02,50""H', NULL, 130, 65,235,280, 0, 100, 50, 50, 0),
  ('EC-12-1-JA','Tapantí', 2,'3 compartimientos tapa regular', 4,1,'09,00""L-09,00""W-02,50""H', NULL, 130, 65,235,280, 0, 100, 100, 0, 0),
  ('EC-13-1-JA','Sirena', 1,'Sopa regular', 1, 1,'16 oz (4,25"" Top Dia., 3,75"" Tall)', NULL, 110, 55,150,190, 0, 100, 100, 0, 0),
  ('EC-15-2-JA','Monteverde', 2,'2 compartimientos tapa regular', 4, 1,'10,00""L-08,00""W-03,00""H', NULL, 120, 60,235,280, 0, 100, 50, 40, 10),
  ('EC-17-JA','Corcovado', 2,'Sin compartimientos tapa plana', 2, 1,'09,00""L-09,00""W-02,00""H', NULL, 120, 60,290,330, 0, 58, 50, 8, 0),
  ('EC-18-JA','Kamúk', 3,'Medio tamaño tapa plana', 3, 1,'09,00""L-06,50""W-02,00""H', NULL, 80, 40,185,225, 0, 200, 200, 0, 0),
  ('EC-19-CL','Chirripó', 3,'Medio tamaño pequeño', 3, 2,'08,00""L-05,50""W-02,75""H', NULL, 100, 50,160,200, 0, 75, 0, 75, 0),
  ('EC-19-JA','Chirripó', 3,'Medio tamaño pequeño', 3, 1,'08,00""L-05,50""W-02,75""H', NULL, 100, 50,160,200, 0, 100, 50, 50, 0),
  ('EC-23-1-JA','Chiquita', 1,'Bowl pequeño', 1, 1,'12 oz (4,375"" Top Dia., 2,3"" Tall)', NULL, 50, 205,130,170, 0, 100, 50, 0, 50),
  ('EC-24-1-JA','Coco', 1,'Bowl regular', 1, 1,'16 oz (4,375"" Top Dia., 2,9"" Tall)', NULL,51, 25,150,190, 0, 100, 100, 0, 0),
  ('M-212-BL',NULL,4,'Vaso 400 mL', 5, 3,'08,80 cm Dia - 11,60 cm H', NULL,45.6,10,130,170, 0, 100, 100, 0, 0),
  ('M-271-RJ',NULL,4,'Plato redondo ensalada', 6, 4,'20,50 cm Dia - 02,00 cm H', NULL,55.8,7,43,90, 0, 80, 50, 30, 0),
  ('M-271-RO',NULL,4,'Plato redondo ensalada', 6, 5,'20,50 cm Dia - 02,00 cm H', NULL,52.95,7,43,90, 0, 90, 50, 40, 0),
  ('M-273-BL',NULL,4,'Plato redondo principal', 6, 3,'23,50 cm Dia - 02,00 cm H', NULL,80.45,14,80.51,115, 0, 80, 10, 70, 0),
  ('M-273-MO',NULL,4,'Plato redondo principal', 6, 6,'23,50 cm Dia - 02,00 cm H', NULL,79.25,14,80.51,115, 0, 200, 150, 50, 0),
  ('M-273-RO',NULL,4,'Plato redondo principal', 6, 5,'23,50 cm Dia - 02,00 cm H', NULL,81.65,14,80.51,115, 0, 300, 250, 50, 0),
  ('M-275-BL',NULL,4,'Plato semi hondo', 7, 3,'18,30 cm Dia - 03,70 cm H', NULL,58.6,8,55,90, 0, 100, 77, 33, 0);

INSERT INTO Fase (FaseId, DescripcionEstado)
VALUES
(0, 'Eliminada'),
(1, 'Reservada'),
(2, 'Entregada'),
(3, 'Finalizada');

INSERT INTO Evento (EventoId, NombreEvento, DescripcionEvento)
VALUES
(1, 'Conferencia de Tecnología', 'Evento sobre las últimas tendencias tecnológicas'),
(2, 'Taller de Marketing Digital', 'Taller práctico sobre estrategias de marketing en línea'),
(3, 'Concierto Benéfico', 'Concierto para recaudar fondos para una causa social');

INSERT INTO Orden (OrdenId, FechaAlquiler, UsuarioId, ClienteId, EventoId, RegistroLimpiezaId, LimpiezaUnidad, Limpieza, Monto, Descuento)
VALUES
(001, '2023-05-01', 1, 1, 1, NULL, NULL, NULL, 500, 50),
(002, '2023-05-02', 2, 2, 1, NULL, NULL, NULL, 1000, 0),
(003, '2023-05-03', 2, 3, 2, NULL, NULL, NULL, 750, 25),
(004, '2023-05-04', 3, 4, 2, NULL, NULL, NULL, 1200, 0),
(005, '2023-05-05', 1, 5, 3, NULL, NULL, NULL, 900, 0),
(006, '2023-05-06', 1, 6, 3, NULL, NULL, NULL, 350, 10),
(007, '2022-01-01', 1, 1, NULL, NULL, NULL, NULL, 500, 0),
(008, '2022-02-01', 1, 1, NULL, NULL, NULL, NULL, 500, 0),
(009, '2022-03-01', 1, 1, NULL, NULL, NULL, NULL, 500, 0),
(010, '2022-04-01', 2, 1, 3, NULL, NULL, NULL, 500, 0),
(011, '2022-05-01', 1, 1, NULL, NULL, NULL, NULL, 500, 0),
(012, '2022-06-01', 3, 1, 2, NULL, NULL, NULL, 500, 0),
(013, '2022-07-01', 1, 1, NULL, NULL, NULL, NULL, 500, 0),
(014, '2022-08-01', 1, 1, NULL, NULL, NULL, NULL, 500, 0),
(015, '2022-09-01', 1, 1, NULL, NULL, NULL, NULL, 500, 0),
(016, '2022-10-01', 2, 1, 3, NULL, NULL, NULL, 500, 0),
(017, '2022-11-01', 1, 1, NULL, NULL, NULL, NULL, 500, 0),
(018, '2022-12-01', 1, 1, NULL, NULL, NULL, NULL, 500, 0),
(019, '2022-04-01', 1, 1, NULL, NULL, NULL, NULL, 500, 0),
(020, '2022-05-01', 3, 1, 1, NULL, NULL, NULL, 500, 0),
(021, '2022-05-15', 1, 1, 1, NULL, NULL, NULL, 500, 0);

INSERT INTO Inventario (InventarioId, ProductoId, Cantidad, Lote, FechaIngreso)
VALUES
  (1,'EC-07-1-JA',300, 1, '2023-05-09'),
  (2,'EC-08-1-JA', 100, 1, '2023-05-09'),
  (3,'EC-10-1-JA', 90, 1, '2023-05-09'),
  (4,'EC-11-1-CL', 230, 1, '2023-05-09'),
  (5,'EC-11-1-JA', 70, 2, '2023-05-09'),
  (6,'EC-12-1-CL', 100, 2, '2023-05-09'),
  (7,'EC-12-1-JA', 100, 1, '2023-05-09'),
  (8,'EC-13-1-JA', 100, 1, '2023-05-09'),
  (9,'EC-15-2-JA', 100, 1, '2023-05-09'),
  (10,'EC-17-JA', 58, 1, '2023-05-09'),
  (11,'EC-18-JA', 200, 2, '2023-05-09'),
  (12,'EC-19-CL', 75, 1, '2023-05-09'),
  (13,'EC-19-JA', 100, 1, '2023-05-09'),
  (14,'EC-23-1-JA', 100, 1, '2023-05-09'),
  (15,'EC-24-1-JA', 100, 1, '2023-05-09'),
  (16,'M-212-BL', 100, 1, '2023-05-09'),
  (17,'M-271-RJ', 80, 3, '2023-05-09'),
  (18,'M-271-RO', 90, 3, '2023-05-09'),
  (19,'M-273-BL', 80, 3, '2023-05-09'),
  (20,'M-273-MO', 200, 1, '2023-05-09'),
  (21,'M-273-RO', 300, 1, '2023-05-09'),
  (22,'M-275-BL', 100, 1, '2023-05-09');

INSERT INTO HistorialOrden (OrdenId, FaseId, Inicio, Final)
VALUES
(001, 1, '2023-05-01', '2023-05-03'),
(001, 2, '2023-05-03', '2023-05-05'),
(002, 1, '2023-05-02', '2023-05-04'),
(002, 2, '2023-05-04', '2023-05-06'),
(003, 1, '2023-05-03', '2023-05-05'),
(002, 3, '2023-05-05', '2023-05-05'),
(004, 1, '2023-05-04', '2023-05-05'),
(005, 1, '2023-05-05', '2023-05-06'),
(006, 1, '2023-05-06', '2023-05-07'),
(007, 1, '2022-01-01', '2022-01-03'),
(008, 1, '2022-02-01', '2022-02-02'),
(009, 1, '2022-03-01', '2022-03-03'),
(010, 1, '2022-04-01', '2022-04-02'),
(010, 2, '2022-04-03', '2022-04-04'),
(011, 1, '2022-05-01', '2022-05-04'),
(012, 1, '2022-06-01', '2022-06-02'),
(013, 1, '2022-07-01', '2022-07-03'),
(014, 1, '2022-08-01', '2022-08-01'),
(015, 1, '2022-09-01', '2022-09-04'),
(015, 2, '2022-09-05', '2022-09-05'),
(015, 3, '2022-09-06', '2022-09-07'),
(016, 1, '2022-10-01', '2022-10-02'),
(016, 2, '2022-10-02', '2022-10-02'),
(017, 1, '2022-11-01', '2022-11-03'),
(018, 1, '2022-12-01', '2022-12-02'),
(019, 1, '2022-04-01', '2022-04-02'),
(019, 2, '2022-04-03', '2022-04-03'),
(020, 1, '2022-05-01', '2022-05-02'),
(020, 2, '2022-05-02', '2022-05-03'),
(020, 3, '2022-05-03', '2022-05-04'),
(021, 1, '2022-05-15', '2022-05-16'),
(021, 2, '2022-05-16', '2022-05-17'),
(021, 3, '2022-05-17', '2022-05-17');

INSERT INTO Detalle (OrdenId, ProductoId, Pedidos, SinUsar, Usados, Devueltos, Descuento)
VALUES
(001, 'EC-07-1-JA', 10, 5, 5, 10, 5),
(002, 'EC-11-1-CL', 5, 1, 4, 5, NULL),
(003, 'EC-12-1-CL', 8, 2, 6, 8, 10),
(003, 'M-212-BL', 8, 2, 6, 8, 10),
(004, 'EC-12-1-CL', 8, 3, 5, 8, 10),
(005, 'M-273-RO', 15, 0, 15, 15, 10),
(006, 'EC-18-JA', 20, 0, 20, 20, 5),
(007, 'M-273-RO', 15, 0, 15, 15, 10),
(008, 'EC-18-JA', 30, 0, 30, 30, 10),
(009, 'M-273-RO', 30, 0, 30, 30, NULL),
(010, 'EC-18-JA', 20, 0, 20, 20, 10),
(011, 'M-273-RO', 10, 0, 10, 10, 10),
(012, 'EC-18-JA', 30, 0, 30, 30, 10),
(013, 'M-273-RO', 30, 0, 30, 30, 20),
(014, 'M-273-MO', 10, 0, 10, 10, 10),
(015, 'M-273-RO', 25, 0, 25, 25, NULL),
(016, 'M-273-MO', 15, 0, 15, 15, 10),
(017, 'M-273-RO', 25, 0, 25, 25, 10),
(018, 'M-273-MO', 15, 0, 15, 15, 10),
(019, 'M-273-RO', 15, 0, 15, 15, NULL),
(020, 'M-273-MO', 10, 0, 10, 10, 10),
(021, 'M-273-RO', 15, 0, 15, 15, 15);
