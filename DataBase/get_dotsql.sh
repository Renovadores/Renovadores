#! /bin/bash

if [ "$(npm list -g --depth=0 | grep -c @dbml/cli)" -eq 0 ]; then
  echo "Instalando dependencia.."
  npm install -g @dbml/cli
fi

dbml2sql ./ficus.dbml --mssql -o ./db_ficus.sql
