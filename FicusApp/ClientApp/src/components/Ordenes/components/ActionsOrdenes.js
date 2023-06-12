import React, { useState, useEffect } from "react";

const ActionsOrdenes = () => {
  const [searchRow, setSearchRow] = useState([]);

  return (
    <div class="mb-2">
      <div class="container px-2 text-center">
        <div class="row g-4">
          <div class="col text-start">
            <div class="col-auto">
              <input
                type="text"
                class="form-control"
                placeholder="Buscar..."
                value={searchRow}
                onChange={(e) => setSearchRow(e.target.value)}
              />
            </div>
          </div>
          <div class="col-auto">
            <button type="submit" class="btn btn-primary">
              Buscar
            </button>
          </div>
          <div class="col-auto text-end">
            <button type="submit" class="btn btn-success">
              Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ActionsOrdenes;
