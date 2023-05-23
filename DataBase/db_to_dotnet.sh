#! /bin/bash

dotnet ef dbcontext scaffold \
    "Server=172.17.0.2;User id=sa;password=Hola1234;Database=Ficus;MultipleActiveResultSets=true;TrustServerCertificate=True" \
    Microsoft.EntityFrameworkCore.SqlServer \
    --no-build \
    --no-pluralize \
    -o Models \
    -d \
    --use-database-names \
    -f \
