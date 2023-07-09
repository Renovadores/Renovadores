# Renovadores

Repositorio del equipo Renovadores, del curso Proyecto Integrador de Ingeniería de Software y Bases de Datos (CI-0128).

# Proyecto Web App para Ficus

Este repositorio contiene el código fuente de una aplicación web de manejo de inventario y cálculo de métricas diseñada específicamente para la empresa [Ficus](https://www.ficusbox.com/).

[Backlog](https://renovadores-ucr.atlassian.net/jira/software/c/projects/REN/boards/1?atlOrigin=eyJpIjoiZmEyMDlhMjRhNzliNGM5NTg2NDBhMjA3MTJjYWM4YWYiLCJwIjoiaiJ9)

[Repositorio](https://github.com/Renovadores/Renovadores)

## 🗃️ Tabla de contenidos
- [Guía de compilación](#-guía-de-compilación)
- [Cómo usarlo](#-cómo-usarlo)
- [Funcionalidades básicas](#-funcionalidades-básicas)
- [Autores, licencia](#-autores)


## Objetivo del producto
Desarrollar una aplicación web que ayude a la empresa Ficus a manejar la logística, el inventario y las métricas para su negocio de alquiler de vajillas reutilizables y venta de recipientes biodegradables para envíos de comida.

### Definition of Ready (DoR)
- La tarea debe tener una estimación de complejidad (puntos de historia).
- La tarea no debe tener bloqueos que impidan su ejecución.
- La tarea debe poder validarse y verificarse dentro del Sprint.


### Definition of Done (DoD)
- Pruebas unitarias aprobadas
- Criterios de aceptación cumplidos
- Documentación realizada


## Objetivo del Sprint
Generar una propuesta de la aplicación web que ayude a la empresa Ficusbox a manejar la logística, el inventario y las métricas para su negocio.

## 📦 Guía de compilación

- Cómo configurar y correr el proyecto en una máquina nueva

Para poder correr el programa, la máquina debe contar previamente con las siguientes aplicaciones:

Node.JS: necesario para poder ejecutar código de Javascript.

Microsoft Visual Studio 2022: se requiere de este IDE para poder compilar y ejecutar el programa e instalar las dependencias anteriormente mencionadas. De igual forma se necesita instalar las siguientes herramientas y funcionalidades:

Microsoft SQL Server 2019: DBA utilizado para administrar la base de datos del proyecto. Una vez instalado, se crea la base de datos Ficus y se ejecuta el script QueryCreaFicusDB.sql para crear las tablas necesarias. Posteriormente se ejecuta el script QueryDatosFicusDB.sql para agregar información a las tablas. Ambos scripts se encuentran en la carpeta data_base..

Ejecutar el comando npm install: es necesario ejecutar el comando npm install en la carpeta de clientApp, para agregar paquetes requeridos por algunos componentes y así evitar errores de compilación.

Configuración de la cadena de conexión: Para conectar el proyecto con la base de datos Ficus es necesario cambiar la cadena de conexión que se encuentra en el archivo FicusContext.cs (ubicado dentro de la carpeta Models) por la cadena que suministra Management Studio.

Una vez hecho lo anterior, se puede ejecutar el programa. Cabe mencionar que para iniciar sesión se puede ingresar con los siguientes usuarios y sus contraseñas:

Usuario     Contraseña
Andrea      contrasena1
Fabiola     contrasena2
Alejandro   contrasena3

## 🧰 Funcionalidades básicas

Las funcionalidades implementadas en el sistema, fueron las siguientes: 
Primeramente productos, dentro de productos se implementaron todos los CRUD, es decir que se permite ver el listado de los productos, y la información detallada de cada uno de ellos; Ingresar un producto nuevo con todos sus detalles, además de poder editar aquellos que ya fueron introducidos en la base de datos, y finalmente el eliminar un producto.

Clientes, se comporta de una manera similar a los productos, permite ver los clientes y sus detalles, además de poder añadir clientes nuevos y los que ya están en la base de datos editarlos, además de eliminar los clientes. 

Orden, dentro de orden podemos generar nuevas órdenes las cuales nos muestran todos los detalles de estas, incluidos los productos y si pertenece a un evento, podemos ingresar nuevas órdenes, y se pueden editar estas, sin embargo aún hace falta la implementación de cambiar los estados de los productos dentro de una orden, y el estado de una orden como tal. 

También se implementó el inventario, en donde se puede ver el detalle de todos los productos que hay disponibles, cantidad, en uso, etc. Se puede añadir nuevos lotes de productos dentro del inventario con sus cantidades, y se puede modificar los detalles del inventario, en caso de ser necesario, acá haría falta implementar el eliminar, aunque aún no sabemos si esto es del todo necesario, se discutirá para el último sprint.

Por último se implementó el inicio de sesión de un usuario, en este caso con el rol administrador, aunque ya la base está lista para aceptar nuevos roles, y también se implementó un cerrar sesión, esto para no permitir que cualquier persona pueda entrar a la aplicación, si no solo el personal deseado.

Importante aclarar que todos los borrados son de manera visual, ya que creemos que esta fue la manera más óptima y necesaria para el caso. 


## 🚀 Cómo usarlo

Por hacer...

## 👤 Autores
#### Oscar Quesada Webb  
- oscar.quesadawebb@ucr.ac.cr
#### Javier Donato  
- javier.donato@ucr.ac.cr
#### Isabela Rodriguez  
- isabela.rodriguez@ucr.ac.cr
#### Kevin Barboza  
- kevin.barbozaramirez@ucr.ac.cr
#### Bryan Villegas  
- bryan.villegasalvarado@ucr.ac.cr
