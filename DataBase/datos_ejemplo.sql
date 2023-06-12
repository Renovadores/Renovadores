INSERT INTO Rol (RolId, TipoRol, DetallesRol)
VALUES 
  (1, 'Administrador', 'Rol con acceso a todas las funcionalidades del sistema'),
  (2, 'Usuario normal', 'Rol con acceso limitado a ciertas funcionalidades del sistema'),
  (3, 'Invitado', 'Rol con acceso limitado a funcionalidades básicas del sistema');

INSERT INTO Usuario (UsuarioId, Nombre, Apellidos, Contrasena, RolId)
VALUES 
  (1, 'Andrea', 'Quiros', 'contraseña1', 1),
  (2, 'Fabiola', 'Chirino', 'contraseña2', 2),
  (3, 'Alejandro', 'Calderón', 'contraseña5', 3);

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
  (3, 'Páramos');

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

INSERT INTO Producto (ProductoId, Nombre, FamiliaId, Descripcion, CategoriaId, ColorId, Dimensiones, Imagen, PesoRecipiente, PesoDesechable, AlquilerComercios, AlquilerRetail)
VALUES
  ('EC-07-1-JA','Montezuma', 1,'Sopa pequeña', 1, 1,'12 oz (4,25"" Top Dia., 2,75"" Tall)', NULL, NULL, NULL,130,170),
  ('EC-08-1-JA','Ena', 3,'Sin compartimientos pequeño', 2, 1,'05,00""L-05,00""W-03,25""H', NULL, NULL, NULL,110,150),
  ('EC-10-1-JA','Dota', 2,'Sin compartimientos tapa regular', 2, 1,'09,00""L-09,00""W-03,50""H', NULL, NULL, NULL,290,330),
  ('EC-11-1-CL','Urán', 3,'Medio tamaño', 3, 2,'09,00""L-06,50""W-02,75""H', NULL, Null, NULL,185,225),
  ('EC-11-1-JA','Urán', 3,'Medio tamaño', 3, 1,'09,00""L-06,50""W-02,75""H', NULL, NULL, NULL,185,2250),
  ('EC-12-1-CL','Tapantí', 2,'3 compartimientos tapa regular', 4, 2,'09,00""L-09,00""W-02,50""H', NULL, NULL, NULL,235,280),
  ('EC-12-1-JA','Tapantí', 2,'3 compartimientos tapa regular', 4,1,'09,00""L-09,00""W-02,50""H', NULL, NULL, NULL,235,280),
  ('EC-13-1-JA','Sirena', 1,'Sopa regular', 1, 1,'16 oz (4,25"" Top Dia., 3,75"" Tall)', NULL, NULL, NULL,150,190),
  ('EC-15-2-JA','Monteverde', 2,'2 compartimientos tapa regular', 4, 1,'10,00""L-08,00""W-03,00""H', NULL, NULL, NULL,235,280),
  ('EC-17-JA','Corcovado', 2,'Sin compartimientos tapa plana', 2, 1,'09,00""L-09,00""W-02,00""H', NULL, NULL, NULL,290,330),
  ('EC-18-JA','Kamúk', 3,'Medio tamaño tapa plana', 3, 1,'09,00""L-06,50""W-02,00""H', NULL, NULL, NULL,185,225),
  ('EC-19-CL','Chirripó', 3,'Medio tamaño pequeño', 3, 2,'08,00""L-05,50""W-02,75""H', NULL, NULL, NULL,160,200),
  ('EC-19-JA','Chirripó', 3,'Medio tamaño pequeño', 3, 1,'08,00""L-05,50""W-02,75""H', NULL, NULL, NULL,160,200),
  ('EC-23-1-JA','Chiquita', 1,'Bowl pequeño', 1, 1,'12 oz (4,375"" Top Dia., 2,3"" Tall)', NULL, NULL, NULL,130,170),
  ('EC-24-1-JA','Coco', 1,'Bowl regular', 1, 1,'16 oz (4,375"" Top Dia., 2,9"" Tall)', NULL,51, NULL,150,190),
  ('M-212-BL',NULL,NULL,'Vaso 400 mL', 5, 3,'08,80 cm Dia - 11,60 cm H', NULL,45.6,10,130,170),
  ('M-271-RJ',NULL,NULL,'Plato redondo ensalada', 6, 4,'20,50 cm Dia - 02,00 cm H', NULL,55.8,7,43,90),
  ('M-271-RO',NULL,NULL,'Plato redondo ensalada', 6, 5,'20,50 cm Dia - 02,00 cm H', NULL,52.95,7,43,90),
  ('M-273-BL',NULL,NULL,'Plato redondo principal', 6, 3,'23,50 cm Dia - 02,00 cm H', NULL,80.45,14,80.51,115),
  ('M-273-MO',NULL,NULL,'Plato redondo principal', 6, 6,'23,50 cm Dia - 02,00 cm H', NULL,79.25,14,80.51,115),
  ('M-273-RO',NULL,NULL,'Plato redondo principal', 6, 5,'23,50 cm Dia - 02,00 cm H', NULL,81.65,14,80.51,115),
  ('M-275-BL',NULL,NULL,'Plato semi hondo', 7, 3,'18,30 cm Dia - 03,70 cm H', NULL,58.6,8,55,90);

INSERT INTO Inventario (ProductoId, EstadoId, Cantidad, Lote, FechaIngreso)
VALUES
  ('EC-07-1-JA', 1, 300, 1, "2023-05-09"),
  ('EC-08-1-JA', 1, 100, 1, "2023-05-09"),
  ('EC-10-1-JA', 1, 90, 1, "2023-05-09"),
  ('EC-11-1-CL', 1, 230, 1, "2023-05-09"),
  ('EC-11-1-JA', 1, 70, 2, "2023-05-09"),
  ('EC-12-1-CL', 1, 100, 2, "2023-05-09"),
  ('EC-12-1-JA', 1, 100, 1, "2023-05-09"),
  ('EC-13-1-JA', 1, 100, 1, "2023-05-09"),
  ('EC-15-2-JA', 1, 100, 1, "2023-05-09"),
  ('EC-17-JA', 1, 58, 1, "2023-05-09"),
  ('EC-18-JA', 1, 200, 2, "2023-05-09"),
  ('EC-19-CL', 1, 75, 1, "2023-05-09"),
  ('EC-19-JA', 1, 100, 1, "2023-05-09"),
  ('EC-23-1-JA', 1, 100, 1, "2023-05-09"),
  ('EC-24-1-JA', 1, 100, 1, "2023-05-09"),
  ('M-212-BL', 1, 100, 1, "2023-05-09"),
  ('M-271-RJ', 1, 80, 3, "2023-05-09"),
  ('M-271-RO', 1, 90, 3, "2023-05-09"),
  ('M-273-BL', 1, 80, 3, "2023-05-09"),
  ('M-273-MO', 1, 200, 1, "2023-05-09"),
  ('M-273-RO', 1, 300, 1, "2023-05-09"),
  ('M-275-BL', 1, 100, 1, "2023-05-09");

INSERT INTO Segmento (SegmentoId, Detalles)
VALUES
('Cafeteria', 'Caracteristicas de las cafeterias'),
('Panaderia', 'Caracteristicas de la panaderia');

INSERT INTO MedioComunicacion (MedioId, Caracteristicas)
VALUES
  ('Medio1', 'Caracteristicas del medio 1'),
  ('Medio2', 'Caracteristicas del medio 2');

INSERT INTO Cliente (ClienteId, FechaAgregado, ResponsableId, Prioridad, Estado, NombreEmpresa, Contacto, Telefono, Correo, Web)
VALUES
(1, '2022-05-01', 1, 'Alta', 'Clientes', 'Empresa A', 'Juan Perez', 5551234, 'juan.perez@empresaA.com', 'www.empresaA.com'),
(2, '2022-05-02', 2, 'Baja', 'Clientes', 'Empresa B', 'Maria Garcia', 5555678, 'maria.garcia@empresaB.com', 'www.empresaB.com');

INSERT INTO ClienteSegmento (ClienteId, SegmentoId)
VALUES
(1, 'Cafeteria'),
(2, 'Cafeteria'),
(2, 'Panaderia');

INSERT INTO ClienteComunicacion (ClienteId, MedioId)
VALUES
  (1, 'Medio1'),
  (1, 'Medio2'),
  (2, 'Medio1');

INSERT INTO Evento (EventoId, NombreEvento, DescripcionEvento)
VALUES
(1, 'Conferencia de Tecnología', 'Evento sobre las últimas tendencias tecnológicas'),
(2, 'Taller de Marketing Digital', 'Taller práctico sobre estrategias de marketing en línea'),
(3, 'Concierto Benéfico', 'Concierto para recaudar fondos para una causa social');

INSERT INTO Fase (FaseId, DescripcionEstado)
VALUES
(1, 'Reservada'),
(2, 'Entregada'),
(3, 'Finalizada');

INSERT INTO Orden (OrdenId, FechaAlquiler, UsuarioId, ClienteId, EventoId, FaseId, RegistroLimpiezaId, LimpiezaUnidad, Limpieza, Monto, Descuento)
VALUES
(001, '2023-05-01', 1, 1, 1, 2, NULL, NULL, NULL, 500, 50),
(002, '2023-05-02', 2, 2, NULL, 2, NULL, NULL, NULL, 1000, 0),
(003, '2023-05-03', 2, 1, 2, 1, NULL, NULL, NULL, 750, 25),
(004, '2023-05-04', 3, 2, 2, 1, NULL, NULL, NULL, 1200, 0),
(005, '2023-05-05', 1, 1, 3, 1, NULL, NULL, NULL, 900, 0);

INSERT INTO HistorialOrden (OrdenId, FaseId, Inicio, Final)
VALUES
(001, 1, '2023-05-01', '2023-05-03'),
(001, 2, '2023-05-03', NULL),
(002, 1, '2023-05-02', '2023-05-04'),
(002, 2, '2023-05-04', NULL),
(003, 1, '2023-05-03', NULL),
(004, 1, '2023-05-01', NULL),
(005, 1, '2023-05-03', NULL);

INSERT INTO Detalle (OrdenId, ProductoId, Pedidos, SinUsar, Usados, Devueltos, Descuento)
VALUES
(001, 'EC-07-1-JA', 10, 5, 3, 2, 5),
(002, 'EC-11-1-CL', 5, 1, 4, NULL, NULL),
(003, 'EC-12-1-CL', 8, 2, 4, 2, 10),
(003, 'M-212-BL', 8, 2, 4, 2, 10),
(004, 'EC-12-1-CL', 8, 2, 4, 2, 10),
(005, 'EC-12-1-CL', 8, 2, 4, 2, 10);
