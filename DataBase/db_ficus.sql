-- SQL dump generated using DBML (dbml-lang.org)
-- Database: SQL Server
-- Generated at: 2023-05-07T18:08:06.409Z

CREATE TABLE [Usuario] (
  [ID_Usuario] integer PRIMARY KEY,
  [Nombre] nvarchar(255) NOT NULL,
  [Apellidos] nvarchar(255) NOT NULL,
  [Contrasena] nvarchar(255) NOT NULL,
  [Rol] integer NOT NULL
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
  [Descripcion] nvarchar(255) NOT NULL,
  [Dimensiones] nvarchar(255) NOT NULL,
  [Peso_recipiente] integer NOT NULL,
  [Peso_desechable] integer NOT NULL,
  [Alquiler_Comercios] integer NOT NULL,
  [Alquiler_Retail] integer NOT NULL
)
GO

CREATE TABLE [Categoria] (
  [ID_Categoria] integer PRIMARY KEY,
  [Nombre_categoria] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Categoria_Producto] (
  [SKU_Producto] integer NOT NULL,
  [ID_Categoria] integer NOT NULL
)
GO

CREATE TABLE [Familia] (
  [ID_Familia] integer PRIMARY KEY,
  [Nombre_familia] nvarchar(255) NOT NULL,
  [Producto] integer NOT NULL
)
GO

CREATE TABLE [Color] (
  [ID_Color] nvarchar(255) PRIMARY KEY,
  [Descripcion] nvarchar(255)
)
GO

CREATE TABLE [Estado] (
  [ID_EstadoProducto] integer PRIMARY KEY,
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
  [Usuario] nvarchar(255) NOT NULL,
  [Cliente] nvarchar(255),
  [Registro_limpieza] integer,
  [Limpieza_unidad] integer,
  [Limpieza] integer,
  [Monto] integer,
  [Descuento] integer
)
GO

CREATE TABLE [Fase] (
  [ID_fase] integer PRIMARY KEY,
  [Descripcion_estado] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Fase_Orden] (
  [Orden] nvarchar(255),
  [Fase] integer
)
GO

CREATE TABLE [Evento] (
  [ID_Evento] integer PRIMARY KEY,
  [Nombre_evento] nvarchar(255),
  [Descripcion_evento] nvarchar(255),
  [Ordenes] integer
)
GO

CREATE TABLE [Detalle] (
  [ID_reserva] integer PRIMARY KEY,
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
  [Responsable] nvarchar(255),
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
  [Comunicacion] nvarchar(255)
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
@level2type = N'Column', @level2name = 'Rol';
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
@name = N'Table_Description',
@value = 'Guarda la relacion que hay entre los producto y las categorias',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Categoria_Producto';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Nombre de un grupo de productos',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Familia',
@level2type = N'Column', @level2name = 'Nombre_familia';
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
@level1type = N'Table',  @level1name = 'Fase_Orden';
GO

ALTER TABLE [Usuario] ADD FOREIGN KEY ([Rol]) REFERENCES [Rol] ([ID_Rol])
GO

ALTER TABLE [Categoria_Producto] ADD FOREIGN KEY ([ID_Categoria]) REFERENCES [Producto] ([SKU])
GO

ALTER TABLE [Categoria_Producto] ADD FOREIGN KEY ([ID_Categoria]) REFERENCES [Categoria] ([ID_Categoria])
GO

ALTER TABLE [Familia] ADD FOREIGN KEY ([Producto]) REFERENCES [Producto] ([SKU])
GO

ALTER TABLE [Inventario] ADD FOREIGN KEY ([Producto]) REFERENCES [Producto] ([SKU])
GO

ALTER TABLE [Inventario] ADD FOREIGN KEY ([Estado]) REFERENCES [Estado] ([ID_EstadoProducto])
GO

ALTER TABLE [Orden] ADD FOREIGN KEY ([Usuario]) REFERENCES [Usuario] ([ID_Usuario])
GO

ALTER TABLE [Orden] ADD FOREIGN KEY ([Cliente]) REFERENCES [Cliente] ([ID_Cliente])
GO

ALTER TABLE [Fase_Orden] ADD FOREIGN KEY ([Orden]) REFERENCES [Orden] ([ID_Orden])
GO

ALTER TABLE [Fase_Orden] ADD FOREIGN KEY ([Fase]) REFERENCES [Fase] ([ID_fase])
GO

ALTER TABLE [Orden] ADD FOREIGN KEY ([ID_Orden]) REFERENCES [Evento] ([Ordenes])
GO

ALTER TABLE [Detalle] ADD FOREIGN KEY ([ID_reserva]) REFERENCES [Orden] ([ID_Orden])
GO

ALTER TABLE [Detalle] ADD FOREIGN KEY ([Producto]) REFERENCES [Producto] ([SKU])
GO

ALTER TABLE [Cliente] ADD FOREIGN KEY ([Responsable]) REFERENCES [Usuario] ([Nombre])
GO

CREATE TABLE [Cliente_Cliente_Segmento] (
  [Cliente_ID_Cliente] integer,
  [Cliente_Segmento_Cliente] integer,
  PRIMARY KEY ([Cliente_ID_Cliente], [Cliente_Segmento_Cliente])
);
GO

ALTER TABLE [Cliente_Cliente_Segmento] ADD FOREIGN KEY ([Cliente_ID_Cliente]) REFERENCES [Cliente] ([ID_Cliente]);
GO

ALTER TABLE [Cliente_Cliente_Segmento] ADD FOREIGN KEY ([Cliente_Segmento_Cliente]) REFERENCES [Cliente_Segmento] ([Cliente]);
GO


CREATE TABLE [Segmento_Cliente_Segmento] (
  [Segmento_ID_Segmento] varchar,
  [Cliente_Segmento_Segmento] varchar,
  PRIMARY KEY ([Segmento_ID_Segmento], [Cliente_Segmento_Segmento])
);
GO

ALTER TABLE [Segmento_Cliente_Segmento] ADD FOREIGN KEY ([Segmento_ID_Segmento]) REFERENCES [Segmento] ([ID_Segmento]);
GO

ALTER TABLE [Segmento_Cliente_Segmento] ADD FOREIGN KEY ([Cliente_Segmento_Segmento]) REFERENCES [Cliente_Segmento] ([Segmento]);
GO


CREATE TABLE [Cliente_Cliente_Comunicacion] (
  [Cliente_ID_Cliente] integer,
  [Cliente_Comunicacion_Cliente] integer,
  PRIMARY KEY ([Cliente_ID_Cliente], [Cliente_Comunicacion_Cliente])
);
GO

ALTER TABLE [Cliente_Cliente_Comunicacion] ADD FOREIGN KEY ([Cliente_ID_Cliente]) REFERENCES [Cliente] ([ID_Cliente]);
GO

ALTER TABLE [Cliente_Cliente_Comunicacion] ADD FOREIGN KEY ([Cliente_Comunicacion_Cliente]) REFERENCES [Cliente_Comunicacion] ([Cliente]);
GO


CREATE TABLE [MedioComunicacion_Cliente_Comunicacion] (
  [MedioComunicacion_ID_Medio] varchar,
  [Cliente_Comunicacion_Comunicacion] varchar,
  PRIMARY KEY ([MedioComunicacion_ID_Medio], [Cliente_Comunicacion_Comunicacion])
);
GO

ALTER TABLE [MedioComunicacion_Cliente_Comunicacion] ADD FOREIGN KEY ([MedioComunicacion_ID_Medio]) REFERENCES [MedioComunicacion] ([ID_Medio]);
GO

ALTER TABLE [MedioComunicacion_Cliente_Comunicacion] ADD FOREIGN KEY ([Cliente_Comunicacion_Comunicacion]) REFERENCES [Cliente_Comunicacion] ([Comunicacion]);
GO

