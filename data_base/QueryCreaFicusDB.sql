-- Verificar si la base de datos Ficus ya existe
IF EXISTS (SELECT * FROM sys.databases WHERE name = 'Ficus')
BEGIN
    -- Eliminar la base de datos Ficus si existe
    EXEC sp_executesql N'DROP DATABASE Ficus';
END
GO

-- Crear la base de datos Ficus
CREATE DATABASE Ficus;
GO

-- Usar la base de datos Ficus
USE Ficus;
GO

CREATE TABLE [Usuario] (
  [UsuarioId] integer PRIMARY KEY,
  [Nombre] nvarchar(255) NOT NULL,
  [Apellidos] nvarchar(255) NOT NULL,
  [NombreUsuario] nvarchar(255) NOT NULL,
  [Contrasena] nvarchar(255) NOT NULL,
  [RolId] integer
)
GO

CREATE TABLE [Rol] (
  [RolId] integer PRIMARY KEY,
  [TipoRol] nvarchar(255) NOT NULL,
  [DetallesRol] nvarchar(255)
)
GO

CREATE TABLE HistorialRefreshToken(
IdHistorialToken int primary key identity,
UsuarioId int references Usuario(UsuarioId),
Token varchar(500),
RefreshToken varchar(200),
FechaCreacion datetime,
FechaExpiracion datetime,
EsActivo AS ( iif(FechaExpiracion < getdate(), convert(bit,0),convert(bit,1)))--columna calculada
)
GO

CREATE TABLE [Producto] (
  [ProductoId] nvarchar(255) PRIMARY KEY,
  [Nombre] nvarchar(255),
  [ColorId] integer,
  [Descripcion] nvarchar(255),
  [Dimensiones] nvarchar(255),
  [PesoRecipiente] integer,
  [PesoDesechable] integer,
  [AlquilerComercios] integer,
  [AlquilerRetail] integer,
  [CategoriaId] integer,
  [FamiliaId] integer,
  [Imagen] nvarchar(255),
  -- [EstadoId] integer,
  [Descontinuado] integer default 0,
  [TotalExistente] integer default 0,
  [EnUso] integer default 0,
  [Disponible] integer default 0,
  [NoDevueltos] integer default 0
)
GO

CREATE TABLE [Categoria] (
  [CategoriaId] integer PRIMARY KEY,
  [NombreCategoria] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Familia] (
  [FamiliaId] integer PRIMARY KEY,
  [NombreFamilia] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Color] (
  [ColorId] integer PRIMARY KEY,
  [Descripcion] nvarchar(255)
)
GO

CREATE TABLE [Estado] (
  [EstadoId] integer PRIMARY KEY,
  [DescripcionEstadoProducto] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Inventario] (
  [InventarioId] integer PRIMARY KEY,
  [ProductoId] nvarchar(255),
  [Cantidad] integer,
  [Lote] integer,
  [FechaIngreso] date,
)
GO

CREATE TABLE [Orden] (
  [OrdenId] integer PRIMARY KEY,
  [FechaAlquiler] date NOT NULL,
  [UsuarioId] integer NOT NULL,
  [ClienteId] integer NOT NULL,
  [EventoId] integer,
  [RegistroLimpiezaId] integer,
  [LimpiezaUnidad] integer,
  [Limpieza] integer,
  [Monto] integer NOT NULL,
  [Descuento] integer
)
GO

CREATE TABLE [Evento] (
  [EventoId] integer PRIMARY KEY,
  [NombreEvento] nvarchar(255) NOT NULL,
  [DescripcionEvento] nvarchar(255)
)
GO

CREATE TABLE [Fase] (
  [FaseId] integer PRIMARY KEY,
  [DescripcionEstado] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [HistorialOrden] (
  [OrdenId] integer NOT NULL,
  [FaseId] integer NOT NULL,
  [Inicio] date NOT NULL,
  [Final] date NOT NULL,
  PRIMARY KEY ([OrdenId], [FaseId])
)
GO

CREATE TABLE [Detalle] (
  [OrdenId] integer,
  [ProductoId] nvarchar(255),
  [Pedidos] integer,
  [SinUsar] integer,
  [Usados] integer,
  [Devueltos] integer,
  [Descuento] integer,
  PRIMARY KEY ([OrdenId], [ProductoId])
)
GO

CREATE TABLE [Cliente] (
  [ClienteId] integer PRIMARY KEY,
  [FechaAgregado] date,
  [ResponsableId] integer,
  [Prioridad] nvarchar(255),
  [Estado] nvarchar(255),
  [NombreEmpresa] nvarchar(255),
  [Contacto] nvarchar(255),
  [Telefono] integer,
  [Correo] nvarchar(255),
  [Web] nvarchar(255)
)
GO

CREATE TABLE [Segmento] (
  [SegmentoId] nvarchar(255) PRIMARY KEY,
  [Detalles] nvarchar(255)
)
GO

CREATE TABLE [ClienteSegmento] (
  [ClienteSegmentoId] integer identity(1,1) NOT NULL,
  [ClienteId] integer NOT NULL,
  [SegmentoId] nvarchar(255) NOT NULL,
  PRIMARY KEY ([ClienteSegmentoId])
)
GO

CREATE TABLE [MedioComunicacion] (
  [MedioId] nvarchar(255) PRIMARY KEY,
  [Caracteristicas] nvarchar(255)
)
GO

CREATE TABLE [ClienteComunicacion] (
  [ClienteComunicacionId] integer identity(1,1) NOT NULL,
  [ClienteId] integer,
  [MedioId] nvarchar(255),
  PRIMARY KEY ([ClienteComunicacionId])
)
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Identificador del usuario',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Usuario',
@level2type = N'Column', @level2name = 'UsuarioId';
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
@value = 'Contrase�a encriptada del usuario',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Usuario',
@level2type = N'Column', @level2name = 'Contrasena';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Identifica las capacidades del usuario',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Usuario',
@level2type = N'Column', @level2name = 'RolId';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Indentificador unico del usuario',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Rol',
@level2type = N'Column', @level2name = 'RolId';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Nombre del rol',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Rol',
@level2type = N'Column', @level2name = 'TipoRol';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Detalles sobre el rol',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Rol',
@level2type = N'Column', @level2name = 'DetallesRol';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Identificador unico para cada producto',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Producto',
@level2type = N'Column', @level2name = 'ProductoId';
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
@level2type = N'Column', @level2name = 'AlquilerComercios';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Costo para el alquiler a retail incluyendo IVA',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Producto',
@level2type = N'Column', @level2name = 'AlquilerRetail';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'URL a la imagen del producto',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Producto',
@level2type = N'Column', @level2name = 'Imagen';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Nombre de la categor�a',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Categoria',
@level2type = N'Column', @level2name = 'NombreCategoria';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Nombre de un grupo de productos',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Familia',
@level2type = N'Column', @level2name = 'NombreFamilia';
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
@level2type = N'Column', @level2name = 'DescripcionEstadoProducto';
GO

EXEC sp_addextendedproperty
@name = N'Table_Description',
@value = 'Guarda las caracter�sticas de cada producto, si est� disponible, reservado, etc...',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Inventario';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Responsable de agregar la orden',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Orden',
@level2type = N'Column', @level2name = 'UsuarioId';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Definici�n de la fase de una orden',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Fase',
@level2type = N'Column', @level2name = 'DescripcionEstado';
GO

EXEC sp_addextendedproperty
@name = N'Table_Description',
@value = 'Guarda en qu� fase se encuentra cada orden',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'HistorialOrden';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Fecha de inicio de la fase actual',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'HistorialOrden',
@level2type = N'Column', @level2name = 'Inicio';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Fecha final de la fase actual',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'HistorialOrden',
@level2type = N'Column', @level2name = 'Final';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Responsable del cliente',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Cliente',
@level2type = N'Column', @level2name = 'ResponsableId';
GO

ALTER TABLE [Usuario] ADD FOREIGN KEY ([RolId]) REFERENCES [Rol] ([RolId])
GO

ALTER TABLE [Producto] ADD FOREIGN KEY ([ColorId]) REFERENCES [Color] ([ColorId])
GO

ALTER TABLE [Producto] ADD FOREIGN KEY ([CategoriaId]) REFERENCES [Categoria] ([CategoriaId])
GO

ALTER TABLE [Producto] ADD FOREIGN KEY ([FamiliaId]) REFERENCES [Familia] ([FamiliaId])
GO

ALTER TABLE [Inventario] ADD FOREIGN KEY ([ProductoId]) REFERENCES [Producto] ([ProductoId])
GO

/*ALTER TABLE [Producto] ADD FOREIGN KEY ([EstadoId]) REFERENCES [Estado] ([EstadoId])
GO*/

ALTER TABLE [Orden] ADD FOREIGN KEY ([UsuarioId]) REFERENCES [Usuario] ([UsuarioId])
GO

ALTER TABLE [Orden] ADD FOREIGN KEY ([ClienteId]) REFERENCES [Cliente] ([ClienteId])
GO

ALTER TABLE [Orden] ADD FOREIGN KEY ([EventoId]) REFERENCES [Evento] ([EventoId])
GO

ALTER TABLE [HistorialOrden] ADD FOREIGN KEY ([OrdenId]) REFERENCES [Orden] ([OrdenId])
GO

ALTER TABLE [HistorialOrden] ADD FOREIGN KEY ([FaseId]) REFERENCES [Fase] ([FaseId])
GO

ALTER TABLE [Detalle] ADD FOREIGN KEY ([OrdenId]) REFERENCES [Orden] ([OrdenId])
GO

ALTER TABLE [Detalle] ADD FOREIGN KEY ([ProductoId]) REFERENCES [Producto] ([ProductoId])
GO

ALTER TABLE [Cliente] ADD FOREIGN KEY ([ResponsableId]) REFERENCES [Usuario] ([UsuarioId])
GO

ALTER TABLE [ClienteSegmento] ADD FOREIGN KEY ([ClienteId]) REFERENCES [Cliente] ([ClienteId])
GO

ALTER TABLE [ClienteSegmento] ADD FOREIGN KEY ([SegmentoId]) REFERENCES [Segmento] ([SegmentoId])
GO

ALTER TABLE [ClienteComunicacion] ADD FOREIGN KEY ([ClienteId]) REFERENCES [Cliente] ([ClienteId])
GO

ALTER TABLE [ClienteComunicacion] ADD FOREIGN KEY ([MedioId]) REFERENCES [MedioComunicacion] ([MedioId])
GO