#! /bin/bash

# Connect locally
sqlcmd -S localhost -U sa -P 'Hola1234'

# Connect to docker SQL Server
# sudo docker exec -it sql1 "bash"
# Connect locally with sqlcmd
# /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "Hola1234"
