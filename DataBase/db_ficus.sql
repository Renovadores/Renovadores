-- SQL dump generated using DBML (dbml-lang.org)
-- Database: SQL Server
-- Generated at: 2023-06-03T00:50:26.178Z

CREATE TABLE [Usuario] (
  [id_usuario] integer PRIMARY KEY,
  [nombre] nvarchar(255) NOT NULL,
  [apellidos] nvarchar(255) NOT NULL,
  [contrasena] nvarchar(255) NOT NULL,
  [id_rol] integer
)
GO

CREATE TABLE [Rol] (
  [id_rol] integer PRIMARY KEY,
  [tipo_rol] nvarchar(255) NOT NULL,
  [detalles_rol] nvarchar(255)
)
GO

CREATE TABLE [Producto] (
  [sku] nvarchar(255) PRIMARY KEY,
  [nombre] nvarchar(255),
  [color] integer,
  [descripcion] nvarchar(255),
  [dimensiones] nvarchar(255),
  [peso_recipiente] integer,
  [peso_desechable] integer,
  [alquiler_Comercios] integer,
  [alquiler_Retail] integer,
  [categoria] integer,
  [familia] integer,
  [imagen] nvarchar(255)
)
GO

CREATE TABLE [Categoria] (
  [id_categoria] integer PRIMARY KEY,
  [nombre_categoria] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Familia] (
  [id_familia] integer PRIMARY KEY,
  [nombre_familia] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Color] (
  [id_color] integer PRIMARY KEY,
  [descripcion] nvarchar(255)
)
GO

CREATE TABLE [Estado] (
  [id_estado] integer PRIMARY KEY,
  [descripcion_estadoproducto] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Inventario] (
  [producto] nvarchar(255),
  [estado] integer,
  [cantidad] integer,
  [lote] integer,
  [fecha_ingreso] date,
  PRIMARY KEY ([producto], [estado])
)
GO

CREATE TABLE [Orden] (
  [id_orden] nvarchar(255) PRIMARY KEY,
  [fecha_alquiler] date NOT NULL,
  [usuario] integer NOT NULL,
  [cliente] integer NOT NULL,
  [evento] integer,
  [registro_limpieza] integer,
  [limpieza_unidad] integer,
  [limpieza] integer,
  [monto] integer NOT NULL,
  [descuento] integer
)
GO

CREATE TABLE [Evento] (
  [id_evento] integer PRIMARY KEY,
  [nombre_evento] nvarchar(255) NOT NULL,
  [descripcion_evento] nvarchar(255)
)
GO

CREATE TABLE [Fase] (
  [id_fase] integer PRIMARY KEY,
  [descripcion_estado] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Historial_Orden] (
  [orden] nvarchar(255) NOT NULL,
  [fase] integer NOT NULL,
  [inicio] date NOT NULL,
  [final] date NOT NULL,
  PRIMARY KEY ([orden], [fase])
)
GO

CREATE TABLE [Detalle] (
  [id_reserva] nvarchar(255),
  [producto] nvarchar(255),
  [pedidos] integer,
  [sin_usar] integer,
  [usados] integer,
  [devueltos] integer,
  [descuento] integer,
  PRIMARY KEY ([id_reserva], [producto])
)
GO

CREATE TABLE [Cliente] (
  [id_cliente] integer PRIMARY KEY,
  [fecha_agregado] date,
  [responsable] integer,
  [prioridad] nvarchar(255),
  [estado] nvarchar(255),
  [nombre_empresa] nvarchar(255),
  [contacto] nvarchar(255),
  [telefono] integer,
  [correo] nvarchar(255),
  [web] nvarchar(255)
)
GO

CREATE TABLE [Segmento] (
  [id_segmento] nvarchar(255) PRIMARY KEY,
  [detalles] nvarchar(255)
)
GO

CREATE TABLE [Cliente_Segmento] (
  [cliente] integer NOT NULL,
  [segmento] nvarchar(255) NOT NULL,
  PRIMARY KEY ([cliente], [segmento])
)
GO

CREATE TABLE [MedioComunicacion] (
  [id_medio] nvarchar(255) PRIMARY KEY,
  [caracteristicas] nvarchar(255)
)
GO

CREATE TABLE [Cliente_Comunicacion] (
  [cliente] integer,
  [medio] nvarchar(255),
  PRIMARY KEY ([cliente], [medio])
)
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Identificador del usuario',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Usuario',
@level2type = N'Column', @level2name = 'id_usuario';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Guarda el nombre del usuario',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Usuario',
@level2type = N'Column', @level2name = 'nombre';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Guarda el o los apellidos del usuario',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Usuario',
@level2type = N'Column', @level2name = 'apellidos';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Contraseña encriptada del usuario',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Usuario',
@level2type = N'Column', @level2name = 'contrasena';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Identifica las capacidades del usuario',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Usuario',
@level2type = N'Column', @level2name = 'id_rol';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Indentificador unico del usuario',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Rol',
@level2type = N'Column', @level2name = 'id_rol';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Nombre del rol',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Rol',
@level2type = N'Column', @level2name = 'tipo_rol';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Detalles sobre el rol',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Rol',
@level2type = N'Column', @level2name = 'detalles_rol';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Identificador unico para cada producto',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Producto',
@level2type = N'Column', @level2name = 'sku';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Nombre del producto',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Producto',
@level2type = N'Column', @level2name = 'nombre';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Costo para el alquiler a comercio incluyendo IVA',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Producto',
@level2type = N'Column', @level2name = 'alquiler_Comercios';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Costo para el alquiler a retail incluyendo IVA',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Producto',
@level2type = N'Column', @level2name = 'alquiler_Retail';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'URL a la imagen del producto',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Producto',
@level2type = N'Column', @level2name = 'imagen';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Nombre de la categoría',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Categoria',
@level2type = N'Column', @level2name = 'nombre_categoria';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Nombre de un grupo de productos',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Familia',
@level2type = N'Column', @level2name = 'nombre_familia';
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
@level2type = N'Column', @level2name = 'descripcion_estadoproducto';
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
@level2type = N'Column', @level2name = 'usuario';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Definición de la fase de una orden',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Fase',
@level2type = N'Column', @level2name = 'descripcion_estado';
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
@level2type = N'Column', @level2name = 'inicio';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Fecha final de la fase actual',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Historial_Orden',
@level2type = N'Column', @level2name = 'final';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Responsable del cliente',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Cliente',
@level2type = N'Column', @level2name = 'responsable';
GO

ALTER TABLE [Usuario] ADD FOREIGN KEY ([id_rol]) REFERENCES [Rol] ([id_rol])
GO

ALTER TABLE [Producto] ADD FOREIGN KEY ([categoria]) REFERENCES [Categoria] ([id_categoria])
GO

ALTER TABLE [Producto] ADD FOREIGN KEY ([familia]) REFERENCES [Familia] ([id_familia])
GO

ALTER TABLE [Producto] ADD FOREIGN KEY ([color]) REFERENCES [Color] ([id_color])
GO

ALTER TABLE [Inventario] ADD FOREIGN KEY ([producto]) REFERENCES [Producto] ([sku])
GO

ALTER TABLE [Inventario] ADD FOREIGN KEY ([estado]) REFERENCES [Estado] ([id_estado])
GO

ALTER TABLE [Orden] ADD FOREIGN KEY ([usuario]) REFERENCES [Usuario] ([id_usuario])
GO

ALTER TABLE [Orden] ADD FOREIGN KEY ([cliente]) REFERENCES [Cliente] ([id_cliente])
GO

ALTER TABLE [Orden] ADD FOREIGN KEY ([evento]) REFERENCES [Evento] ([id_evento])
GO

ALTER TABLE [Historial_Orden] ADD FOREIGN KEY ([orden]) REFERENCES [Orden] ([id_orden])
GO

ALTER TABLE [Historial_Orden] ADD FOREIGN KEY ([fase]) REFERENCES [Fase] ([id_fase])
GO

ALTER TABLE [Detalle] ADD FOREIGN KEY ([id_reserva]) REFERENCES [Orden] ([id_orden])
GO

ALTER TABLE [Detalle] ADD FOREIGN KEY ([producto]) REFERENCES [Producto] ([sku])
GO

ALTER TABLE [Cliente] ADD FOREIGN KEY ([responsable]) REFERENCES [Usuario] ([id_usuario])
GO

ALTER TABLE [Cliente_Segmento] ADD FOREIGN KEY ([cliente]) REFERENCES [Cliente] ([id_cliente])
GO

ALTER TABLE [Cliente_Segmento] ADD FOREIGN KEY ([segmento]) REFERENCES [Segmento] ([id_segmento])
GO

ALTER TABLE [Cliente_Comunicacion] ADD FOREIGN KEY ([cliente]) REFERENCES [Cliente] ([id_cliente])
GO

ALTER TABLE [Cliente_Comunicacion] ADD FOREIGN KEY ([medio]) REFERENCES [MedioComunicacion] ([id_medio])
GO
