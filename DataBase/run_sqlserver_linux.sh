#! /bin/bash
if sudo docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=Hola1234" \
   -p 1433:1433 --name sql1 --hostname sql1 \
   -d \
   mcr.microsoft.com/mssql/server:2019-latest 2>/dev/null
then
   sudo docker start sql1
fi
sudo docker ps -a
sudo docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' sql1
