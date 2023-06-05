#! /bin/bash

dotnet build

modelos=(
	"Usuario"
	"Rol"
	"Producto"
	"Categoria"
	"Familia"
	"Color"
	"Estado"
	"Inventario"
	"Orden"
	"Evento"
	"Fase"
	"HistorialOrden"
	"Detalle"
	"Cliente"
	"Segmento"
	"MedioComunicacion"
)

for ((i=0; i<${#modelos[@]}; i++))
do
    echo -e "\n\n---------------------------------------------------------"
    echo "Tratando de crear el controllador para el modelo" ${modelos[i]}
    dotnet aspnet-codegenerator controller -name ${modelos[i]}Controller -m ${modelos[i]} -dc FicusContext --relativeFolderPath Controllers --useDefaultLayout --referenceScriptLibraries -f -api --no-build
    echo -e "---------------------------------------------------------\n\n"
done
