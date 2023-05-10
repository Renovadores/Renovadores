#!/bin/bash

# Variables de conexión
SERVER="172.17.0.3"
USER="sa"
PASSWORD="Hola1234"

# Comando para conectarse a la base de datos
CMD="sqlcmd -S $SERVER -U $USER -P $PASSWORD"

# Verifica si se ha pasado un archivo SQL como argumento
if [ "$1" != "" ] && [ "${1##*.}" == "sql" ]; then
    # Ejecuta el archivo SQL
    $CMD -i "$1"
else
    # Ejecuta la consulta proporcionada como argumento
    $CMD -Q "$*"
fi
