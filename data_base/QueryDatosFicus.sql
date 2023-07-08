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
  ('EC-07-1-JA','Montezuma', 1,'Sopa pequeña', 1, 1,'12 oz (4,25"" Top Dia., 2,75"" Tall)', NULL, NULL, NULL,130,170, 0, 1000, 50, 950, 0),
  ('EC-08-1-JA','Ena', 3,'Sin compartimientos pequeño', 2, 1,'05,00""L-05,00""W-03,25""H', NULL, NULL, NULL,110,150, 0, 1000, 50, 950, 0),
  ('EC-10-1-JA','Dota', 2,'Sin compartimientos tapa regular', 2, 1,'09,00""L-09,00""W-03,50""H', NULL, NULL, NULL,290,330, 0, 800, 100, 700, 0),
  ('EC-11-1-CL','Urán', 3,'Medio tamaño', 3, 2,'09,00""L-06,50""W-02,75""H', NULL, Null, NULL,185,225, 0, 800, 100, 700, 0),
  ('EC-11-1-JA','Urán', 3,'Medio tamaño', 3, 1,'09,00""L-06,50""W-02,75""H', NULL, NULL, NULL,185,2250, 0, 600, 50, 550, 0),
  ('EC-12-1-CL','Tapantí', 2,'3 compartimientos tapa regular', 4, 2,'09,00""L-09,00""W-02,50""H', NULL, NULL, NULL,235,280, 0, 600, 50, 550, 0),
  ('EC-12-1-JA','Tapantí', 2,'3 compartimientos tapa regular', 4,1,'09,00""L-09,00""W-02,50""H', NULL, NULL, NULL,235,280, 0, 400, 100, 300, 0),
  ('EC-13-1-JA','Sirena', 1,'Sopa regular', 1, 1,'16 oz (4,25"" Top Dia., 3,75"" Tall)', NULL, NULL, NULL,150,190, 0, 400, 100, 300, 0),
  ('EC-15-2-JA','Monteverde', 2,'2 compartimientos tapa regular', 4, 1,'10,00""L-08,00""W-03,00""H', NULL, NULL, NULL,235,280, 0, 200, 50, 140, 10),
  ('EC-17-JA','Corcovado', 2,'Sin compartimientos tapa plana', 2, 1,'09,00""L-09,00""W-02,00""H', NULL, NULL, NULL,290,330, 0, 200, 50, 130, 20),
  ('EC-18-JA','Kamúk', 3,'Medio tamaño tapa plana', 3, 1,'09,00""L-06,50""W-02,00""H', NULL, NULL, NULL,185,225, 0, 400, 100, 300, 0),
  ('EC-19-CL','Chirripó', 3,'Medio tamaño pequeño', 3, 2,'08,00""L-05,50""W-02,75""H', NULL, NULL, NULL,160,200, 0, 400, 100, 300, 0),
  ('EC-19-JA','Chirripó', 3,'Medio tamaño pequeño', 3, 1,'08,00""L-05,50""W-02,75""H', NULL, NULL, NULL,160,200, 0, 600, 50, 500, 50),
  ('EC-23-1-JA','Chiquita', 1,'Bowl pequeño', 1, 1,'12 oz (4,375"" Top Dia., 2,3"" Tall)', NULL, NULL, NULL,130,170, 0, 600, 50, 500, 50),
  ('EC-24-1-JA','Coco', 1,'Bowl regular', 1, 1,'16 oz (4,375"" Top Dia., 2,9"" Tall)', NULL,51, NULL,150,190, 0, 800, 100, 700, 0),
  ('M-212-BL',NULL,4,'Vaso 400 mL', 5, 3,'08,80 cm Dia - 11,60 cm H', NULL,45.6,10,130,170, 0, 800, 100, 700, 0),
  ('M-271-RJ',NULL,4,'Plato redondo ensalada', 6, 4,'20,50 cm Dia - 02,00 cm H', NULL,55.8,7,43,90, 0, 1000, 50, 950, 0),
  ('M-271-RO',NULL,4,'Plato redondo ensalada', 6, 5,'20,50 cm Dia - 02,00 cm H', NULL,52.95,7,43,90, 0, 1000, 50, 950, 0),
  ('M-273-BL',NULL,4,'Plato redondo principal', 6, 3,'23,50 cm Dia - 02,00 cm H', NULL,80.45,14,80.51,115, 0, 1200, 100, 1100, 0),
  ('M-273-MO',NULL,4,'Plato redondo principal', 6, 6,'23,50 cm Dia - 02,00 cm H', NULL,79.25,14,80.51,115, 0, 1200, 100, 1100, 0),
  ('M-273-RO',NULL,4,'Plato redondo principal', 6, 5,'23,50 cm Dia - 02,00 cm H', NULL,81.65,14,80.51,115, 0, 777, 77, 700, 0),
  ('M-275-BL',NULL,4,'Plato semi hondo', 7, 3,'18,30 cm Dia - 03,70 cm H', NULL,58.6,8,55,90, 0, 777, 77, 700, 0);

INSERT INTO Fase (FaseId, DescripcionEstado)
VALUES
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
(006, '2023-05-06', 1, 6, 3, NULL, NULL, NULL, 350, 10);

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
(001, 1, '2023-05-01 13:00:00', '2023-05-03'),
(001, 2, '2023-05-03 10:30:00', NULL),
(002, 1, '2023-05-02 13:00:00', '2023-05-04'),
(002, 2, '2023-05-04 13:20:00', NULL),
(002, 3, '2023-05-05 10:00:00', NULL);

INSERT INTO Detalle (OrdenId, ProductoId, Pedidos, SinUsar, Usados, Devueltos, Descuento)
VALUES
(001, 'EC-07-1-JA', 10, 5, 5, 10, 5),
(002, 'EC-11-1-CL', 5, 1, 4, 5, NULL),
(003, 'EC-12-1-CL', 8, 2, 6, 8, 10),
(003, 'M-212-BL', 8, 2, 6, 8, 10),
(004, 'EC-12-1-CL', 8, 3, 5, 8, 10),
(005, 'EC-12-1-CL', 8, 4, 4, 7, 10);
