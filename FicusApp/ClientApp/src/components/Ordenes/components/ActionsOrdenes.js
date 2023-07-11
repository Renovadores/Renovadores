import React, { useState, useEffect } from "react";

const ActionsOrdenes = ({ searchTerm, handleSearchChange }) => {
  const [searchRow, setSearchRow] = useState([]);

  return (
    <div className="mb-2">
      <div className="container px-2 text-center">
        <div className="row g-4">
          <div className="col text-start">
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <div className="col-auto text-end ms-5">
            <a
              href="/ordenes/nueva-orden"
              type="submit"
              className="btn btn-success"
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
