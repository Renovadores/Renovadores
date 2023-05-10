#! /bin/bash
if sudo docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=Hola1234" \
   -p 3333:3333 --name Ficus --hostname Ficus \
   -d \
   mcr.microsoft.com/mssql/server:2019-latest 2>/dev/null
then
   sudo docker start Ficus
fi
sudo docker ps -a
sudo docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' Ficus
