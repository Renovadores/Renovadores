#!/bin/bash

# Variables de conexión
SERVER="ficus-server-pi2023.database.windows.net"
USER="AdminFicus"
PASSWORD="Hola1234"
DATABASE="FicusDataBase"

# Comando para conectarse a la base de datos
CMD="sqlcmd -S $SERVER -d $DATABASE -U $USER -P $PASSWORD -Y 15"

# Verifica si se ha pasado un archivo SQL como argumento
if [ "$1" != "" ] && [ "${1##*.}" == "sql" ]; then
    # Ejecuta el archivo SQL
    $CMD -i "$1"
else
    # Ejecuta la consulta proporcionada como argumento
    $CMD -Q "$*"
fi

unset SERVER USER PASSWORD DATABASE
