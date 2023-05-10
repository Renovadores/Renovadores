INSERT INTO Rol (ID_Rol, Tipo_rol, Detalles_rol)
VALUES 
  (1, "Administrador", "Rol con acceso a todas las funcionalidades del sistema"),
  (2, "Usuario normal", "Rol con acceso limitado a ciertas funcionalidades del sistema"),
  (3, "Invitado", "Rol con acceso limitado a funcionalidades básicas del sistema");

INSERT INTO Usuario (ID_Usuario, Nombre, Apellidos, Contrasena, ID_Rol)
VALUES 
  (1, "Juan", "Pérez García", "contraseña1", 1),
  (2, "María", "Rodríguez López", "contraseña2", 2),
  (3, "Luis", "González Pérez", "contraseña3", 2),
  (4, "Ana", "Martínez García", "contraseña4", 3),
  (5, "Jorge", "Hernández Ruiz", "contraseña5", 3);

INSERT INTO Categoria (ID_Categoria, Nombre_categoria)
VALUES
  (1, "Sopa"),
  (2, "Sin división"),
  (3, "Medio"),
  (4, "Compartimientos"),
  (5, "Vaso"),
  (6, "Plato"),
  (7, "Plato sopa");

INSERT INTO Familia (ID_Familia, Nombre_familia)
VALUES
  (1, "Costas"),
  (2, "Bosques"),
  (3, "Páramos");

INSERT INTO Color (ID_Color, Descripcion)
VALUES
  (1, "JA"),
  (2, "CL"),
  (3, "BL"),
  (4, "RJ"),
  (5, "RO"),
  (6, "MO");

INSERT INTO Estado (ID_Estado, Descripcion_estadoproducto)
VALUES
  (1, "Disponible"),
  (2, "Descontinuado");

INSERT INTO Producto (SKU, Nombre, Familia, Descripcion, Categoria, Color, Dimensiones, Imagen, Peso_recipiente, Peso_desechable, Alquiler_Comercios, Alquiler_Retail)
VALUES
  ("EC-07-1-JA","Montezuma", 1,"Sopa pequeña", 1, 1,'12 oz (4,25"" Top Dia., 2,75"" Tall)', NULL, NULL, NULL,130,170),
  ("EC-08-1-JA","Ena", 3,"Sin compartimientos pequeño", 2, 1,"05,00""L-05,00""W-03,25""H", NULL, NULL, NULL,110,150),
  ("EC-10-1-JA","Dota", 2,"Sin compartimientos tapa regular", 2, 1,"09,00""L-09,00""W-03,50""H", NULL, NULL, NULL,290,330),
  ("EC-11-1-CL","Urán", 3,"Medio tamaño", 3, 2,"09,00""L-06,50""W-02,75""H", NULL, Null, NULL,185,225),
  ("EC-11-1-JA","Urán", 3,"Medio tamaño", 3, 1,"09,00""L-06,50""W-02,75""H", NULL, NULL, NULL,185,2250),
  ("EC-12-1-CL","Tapantí", 2,"3 compartimientos tapa regular", 4, 2,"09,00""L-09,00""W-02,50""H", NULL, NULL, NULL,235,280),
  ("EC-12-1-JA","Tapantí", 2,"3 compartimientos tapa regular", 4,1,"09,00""L-09,00""W-02,50""H", NULL, NULL, NULL,235,280),
  ("EC-13-1-JA","Sirena", 1,"Sopa regular", 1, 1,"16 oz (4,25"" Top Dia., 3,75"" Tall)", NULL, NULL, NULL,150,190),
  ("EC-15-2-JA","Monteverde", 2,"2 compartimientos tapa regular", 4, 1,"10,00""L-08,00""W-03,00""H", NULL, NULL, NULL,235,280),
  ("EC-17-JA","Corcovado", 2,"Sin compartimientos tapa plana", 2, 1,"09,00""L-09,00""W-02,00""H", NULL, NULL, NULL,290,330),
  ("EC-18-JA","Kamúk", 3,"Medio tamaño tapa plana", 3, 1,"09,00""L-06,50""W-02,00""H", NULL, NULL, NULL,185,225),
  ("EC-19-CL","Chirripó", 3,"Medio tamaño pequeño", 3, 2,"08,00""L-05,50""W-02,75""H", NULL, NULL, NULL,160,200),
  ("EC-19-JA","Chirripó", 3,"Medio tamaño pequeño", 3, 1,"08,00""L-05,50""W-02,75""H", NULL, NULL, NULL,160,200),
  ("EC-23-1-JA","Chiquita", 1,"Bowl pequeño", 1, 1,"12 oz (4,375"" Top Dia., 2,3"" Tall)", NULL, NULL, NULL,130,170),
  ("EC-24-1-JA","Coco", 1,"Bowl regular", 1, 1,"16 oz (4,375"" Top Dia., 2,9"" Tall)", NULL,51, NULL,150,190),
  ("M-212-BL",NULL,NULL,"Vaso 400 mL", 5, 3,"08,80 cm Dia - 11,60 cm H", NULL,45.6,10,130,170),
  ("M-271-RJ",NULL,NULL,"Plato redondo ensalada", 6, 4,"20,50 cm Dia - 02,00 cm H", NULL,55.8,7,43,90),
  ("M-271-RO",NULL,NULL,"Plato redondo ensalada", 6, 5,"20,50 cm Dia - 02,00 cm H", NULL,52.95,7,43,90),
  ("M-273-BL",NULL,NULL,"Plato redondo principal", 6, 3,"23,50 cm Dia - 02,00 cm H", NULL,80.45,14,80.51,115),
  ("M-273-MO",NULL,NULL,"Plato redondo principal", 6, 6,"23,50 cm Dia - 02,00 cm H", NULL,79.25,14,80.51,115),
  ("M-273-RO",NULL,NULL,"Plato redondo principal", 6, 5,"23,50 cm Dia - 02,00 cm H", NULL,81.65,14,80.51,115),
  ("M-275-BL",NULL,NULL,"Plato semi hondo", 7, 3,"18,30 cm Dia - 03,70 cm H", NULL,58.6,8,55,90);

INSERT INTO Inventario (Producto, Estado, Cantidad, Lote, Fecha_ingreso)
VALUES
  ("EC-07-1-JA", 1, 300, 1, "2023-05-09"),
  ("EC-08-1-JA", 1, 100, 1, "2023-05-09"),
  ("EC-10-1-JA", 1, 90, 1, "2023-05-09"),
  ("EC-11-1-CL", 1, 230, 1, "2023-05-09"),
  ("EC-11-1-JA", 1, 70, 2, "2023-05-09"),
  ("EC-12-1-CL", 1, 100, 2, "2023-05-09"),
  ("EC-12-1-JA", 1, 100, 1, "2023-05-09"),
  ("EC-13-1-JA", 1, 100, 1, "2023-05-09"),
  ("EC-15-2-JA", 1, 100, 1, "2023-05-09"),
  ("EC-17-JA", 1, 58, 1, "2023-05-09"),
  ("EC-18-JA", 1, 200, 2, "2023-05-09"),
  ("EC-19-CL", 1, 75, 1, "2023-05-09"),
  ("EC-19-JA", 1, 100, 1, "2023-05-09"),
  ("EC-23-1-JA", 1, 100, 1, "2023-05-09"),
  ("EC-24-1-JA", 1, 100, 1, "2023-05-09"),
  ("M-212-BL", 1, 100, 1, "2023-05-09"),
  ("M-271-RJ", 1, 80, 3, "2023-05-09"),
  ("M-271-RO", 1, 90, 3, "2023-05-09"),
  ("M-273-BL", 1, 80, 3, "2023-05-09"),
  ("M-273-MO", 1, 200, 1, "2023-05-09"),
  ("M-273-RO", 1, 300, 1, "2023-05-09"),
  ("M-275-BL", 1, 100, 1, "2023-05-09");
