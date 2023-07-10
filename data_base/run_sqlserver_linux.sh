#! /bin/bash
SERVER="172.17.0.2"
USER="sa"
PASSWORD="Hola1234"
DATABASE="Ficus"

if sudo docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=Hola1234" \
   -p 3333:3333 --name Ficus --hostname Ficus \
   -d \
   mcr.microsoft.com/mssql/server:2019-latest 2>/dev/null
then
   sudo docker ps -a
   sudo docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' Ficus
else
   sudo docker start Ficus
   sudo docker ps -a
   sudo docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' Ficus
fi

sqlcmd -S $SERVER -U $USER -P $PASSWORD -Q "CREATE DATABASE Ficus"
sqlcmd -S $SERVER -U $USER -P $PASSWORD -Q "SELECT name FROM sys.databases"
unset SERVER USER PASSWORD DATABASE
