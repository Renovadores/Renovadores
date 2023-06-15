import React, { useState, useEffect } from "react";

const ActionsOrdenes = ({ searchTerm, handleSearchChange }) => {
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
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <div class="col-auto text-end ms-5">
            <a
              href="/ordenes/nueva-orden"
              type="submit"
              class="btn btn-success"
              role="button"
            >
              Nueva orden
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ActionsOrdenes;
