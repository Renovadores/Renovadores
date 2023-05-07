-- SQL dump generated using DBML (dbml-lang.org)
-- Database: SQL Server
-- Generated at: 2023-05-07T21:47:23.345Z

CREATE TABLE [Usuario] (
  [ID_Usuario] integer PRIMARY KEY,
  [Nombre] nvarchar(255) NOT NULL,
  [Apellidos] nvarchar(255) NOT NULL,
  [Contrasena] nvarchar(255) NOT NULL,
  [ID_Rol] integer NOT NULL
)
GO

CREATE TABLE [Rol] (
  [ID_Rol] integer PRIMARY KEY,
  [Tipo_rol] nvarchar(255) UNIQUE NOT NULL,
  [Detalles_rol] nvarchar(255)
)
GO

CREATE TABLE [Producto] (
  [SKU] integer PRIMARY KEY,
  [Nombre] nvarchar(255) NOT NULL,
  [Color] nvarchar(255) NOT NULL,
  [Descripcion] nvarchar(255) NOT NULL,
  [Dimensiones] nvarchar(255) NOT NULL,
  [Peso_recipiente] integer NOT NULL,
  [Peso_desechable] integer NOT NULL,
  [Alquiler_Comercios] integer NOT NULL,
  [Alquiler_Retail] integer NOT NULL,
  [Categoria] integer,
  [Familia] integer
)
GO

CREATE TABLE [Categoria] (
  [ID_Categoria] integer PRIMARY KEY,
  [Nombre_categoria] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Familia] (
  [ID_Familia] integer PRIMARY KEY,
  [Nombre_familia] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Color] (
  [ID_Color] nvarchar(255) PRIMARY KEY,
  [Descripcion] nvarchar(255)
)
GO

CREATE TABLE [Estado] (
  [ID_Estado] integer PRIMARY KEY,
  [Descripcion_estadoproducto] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Inventario] (
  [Producto] integer,
  [Estado] integer,
  [Cantidad] integer,
  [Lote] integer,
  [Fecha_ingreso] date
)
GO

CREATE TABLE [Orden] (
  [ID_Orden] nvarchar(255) PRIMARY KEY,
  [Fecha_alquiler] date NOT NULL,
  [Usuario] integer NOT NULL,
  [Cliente] integer,
  [Registro_limpieza] integer,
  [Limpieza_unidad] integer,
  [Limpieza] integer,
  [Monto] integer,
  [Descuento] integer
)
GO

CREATE TABLE [Evento] (
  [ID_Evento] integer PRIMARY KEY,
  [Nombre_evento] nvarchar(255),
  [Descripcion_evento] nvarchar(255),
  [Orden] nvarchar(255)
)
GO

CREATE TABLE [Fase] (
  [ID_Fase] integer PRIMARY KEY,
  [Descripcion_estado] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Historial_Orden] (
  [Orden] nvarchar(255),
  [Fase] integer,
  [Inicio] date,
  [Final] date
)
GO

CREATE TABLE [Detalle] (
  [ID_reserva] nvarchar(255) PRIMARY KEY,
  [Producto] integer,
  [Pedidos] integer,
  [Sin_usar] integer,
  [Usados] integer,
  [Devueltos] integer,
  [Descuento] integer
)
GO

CREATE TABLE [Cliente] (
  [ID_Cliente] integer PRIMARY KEY,
  [Tipo] nvarchar(255),
  [Fecha_agregado] date,
  [Responsable] integer,
  [Prioridad] nvarchar(255),
  [Estado] nvarchar(255),
  [Nombre] nvarchar(255),
  [Telefono] integer,
  [Correo] nvarchar(255),
  [Web] nvarchar(255)
)
GO

CREATE TABLE [Segmento] (
  [ID_Segmento] nvarchar(255) PRIMARY KEY,
  [Detalles] nvarchar(255)
)
GO

CREATE TABLE [Cliente_Segmento] (
  [Cliente] integer,
  [Segmento] nvarchar(255)
)
GO

CREATE TABLE [MedioComunicacion] (
  [ID_Medio] nvarchar(255) PRIMARY KEY,
  [Caracteristicas] nvarchar(255)
)
GO

CREATE TABLE [Cliente_Comunicacion] (
  [Cliente] integer,
  [Medio] nvarchar(255)
)
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Identificador del usuario',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Usuario',
@level2type = N'Column', @level2name = 'ID_Usuario';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Guarda el nombre del usuario',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Usuario',
@level2type = N'Column', @level2name = 'Nombre';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Guarda el o los apellidos del usuario',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Usuario',
@level2type = N'Column', @level2name = 'Apellidos';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Contraseña encriptada del usuario',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Usuario',
@level2type = N'Column', @level2name = 'Contrasena';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Identifica las capacidades del usuario',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Usuario',
@level2type = N'Column', @level2name = 'ID_Rol';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Indentificador unico del usuario',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Rol',
@level2type = N'Column', @level2name = 'ID_Rol';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Nombre del rol',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Rol',
@level2type = N'Column', @level2name = 'Tipo_rol';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Detalles sobre el rol',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Rol',
@level2type = N'Column', @level2name = 'Detalles_rol';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Identificador unico para cada producto',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Producto',
@level2type = N'Column', @level2name = 'SKU';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Nombre del producto',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Producto',
@level2type = N'Column', @level2name = 'Nombre';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Costo para el alquiler a comercio incluyendo IVA',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Producto',
@level2type = N'Column', @level2name = 'Alquiler_Comercios';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Costo para el alquiler a retail incluyendo IVA',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Producto',
@level2type = N'Column', @level2name = 'Alquiler_Retail';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Nombre de la categoría',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Categoria',
@level2type = N'Column', @level2name = 'Nombre_categoria';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Nombre de un grupo de productos',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Familia',
@level2type = N'Column', @level2name = 'Nombre_familia';
GO

EXEC sp_addextendedproperty
@name = N'Table_Description',
@value = 'Guarda el color de cada producto',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Color';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Que estado es el actual de un producto',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Estado',
@level2type = N'Column', @level2name = 'Descripcion_estadoproducto';
GO

EXEC sp_addextendedproperty
@name = N'Table_Description',
@value = 'Guarda las caracteristicas de cada producto, si está disponible, reservado, etc...',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Inventario';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Responsable de agregar la orden',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Orden',
@level2type = N'Column', @level2name = 'Usuario';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Definición de la fase de una orden',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Fase',
@level2type = N'Column', @level2name = 'Descripcion_estado';
GO

EXEC sp_addextendedproperty
@name = N'Table_Description',
@value = 'Guarda en que fase se encuentra cada orden',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Historial_Orden';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Fecha de inicio de la fase actual',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Historial_Orden',
@level2type = N'Column', @level2name = 'Inicio';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Fecha final de la fase actual',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Historial_Orden',
@level2type = N'Column', @level2name = 'Final';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Responsable del cliente',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Cliente',
@level2type = N'Column', @level2name = 'Responsable';
GO

ALTER TABLE [Usuario] ADD FOREIGN KEY ([ID_Rol]) REFERENCES [Rol] ([ID_Rol])
GO

ALTER TABLE [Producto] ADD FOREIGN KEY ([Categoria]) REFERENCES [Categoria] ([ID_Categoria])
GO

ALTER TABLE [Producto] ADD FOREIGN KEY ([Familia]) REFERENCES [Familia] ([ID_Familia])
GO

ALTER TABLE [Producto] ADD FOREIGN KEY ([Color]) REFERENCES [Color] ([ID_Color])
GO

ALTER TABLE [Inventario] ADD FOREIGN KEY ([Producto]) REFERENCES [Producto] ([SKU])
GO

ALTER TABLE [Inventario] ADD FOREIGN KEY ([Estado]) REFERENCES [Estado] ([ID_Estado])
GO

ALTER TABLE [Orden] ADD FOREIGN KEY ([Usuario]) REFERENCES [Usuario] ([ID_Usuario])
GO

ALTER TABLE [Orden] ADD FOREIGN KEY ([Cliente]) REFERENCES [Cliente] ([ID_Cliente])
GO

ALTER TABLE [Evento] ADD FOREIGN KEY ([Orden]) REFERENCES [Orden] ([ID_Orden])
GO

ALTER TABLE [Historial_Orden] ADD FOREIGN KEY ([Orden]) REFERENCES [Orden] ([ID_Orden])
GO

ALTER TABLE [Historial_Orden] ADD FOREIGN KEY ([Fase]) REFERENCES [Fase] ([ID_Fase])
GO

ALTER TABLE [Detalle] ADD FOREIGN KEY ([ID_reserva]) REFERENCES [Orden] ([ID_Orden])
GO

ALTER TABLE [Detalle] ADD FOREIGN KEY ([Producto]) REFERENCES [Producto] ([SKU])
GO

ALTER TABLE [Cliente] ADD FOREIGN KEY ([Responsable]) REFERENCES [Usuario] ([ID_Usuario])
GO

ALTER TABLE [Cliente_Segmento] ADD FOREIGN KEY ([Cliente]) REFERENCES [Cliente] ([ID_Cliente])
GO

ALTER TABLE [Cliente_Segmento] ADD FOREIGN KEY ([Segmento]) REFERENCES [Segmento] ([ID_Segmento])
GO

ALTER TABLE [Cliente_Comunicacion] ADD FOREIGN KEY ([Cliente]) REFERENCES [Cliente] ([ID_Cliente])
GO

ALTER TABLE [Cliente_Comunicacion] ADD FOREIGN KEY ([Medio]) REFERENCES [MedioComunicacion] ([ID_Medio])
GO
