import React, { useState, useEffect } from "react";

const Detalles = ({ detalleId }) => {
  const [detalle, setDetalle] = useState([]);
  const [producto, setProducto] = useState([]);

  const fetchDetalle = async () => {
    try {
      const response = await fetch(`https://localhost:44493/api/detalle/`);
      const data = await response.json();
      setDetalle(data.filter((d) => d.ordenId === detalleId));
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchProducto = async (detalleId) => {
    try {
      const response = await fetch(`https://localhost:44493/api/producto/`);
      const data = await response.json();
      setProducto(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    // Tomar los datos de todas las ordenes
    fetchDetalle(detalleId);
    fetchProducto(detalleId);
  }, [detalleId]);


  const paddedDetalleId = String(detalleId).padStart(5, "0");
  return (
    <div
      class="modal fade"
      id={`modalDetalle${detalleId}`}
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Productos solicitado en orden <strong>{paddedDetalleId}</strong>
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="list-group">
              {detalle.map((detalle) => (
                <a
                  // href="#"
                  class="list-group-item list-group-item-action"
                  aria-current="true"
                >
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">
                      {producto.find((p) => p.productoId === detalle.productoId)?.nombre || "NULL"}
                    </h5>
                    <medium>{detalle.productoId}</medium>
                  </div>
                  <ul class="list-group list-group-horizontal-sm">
                    <li class="list-group-item">
                      <span class="pe-4">Pedidos </span>
                      <strong>
                        {detalle.pedidos}
                      </strong>
                    </li>
                    <li class="list-group-item">
                      <span class="pe-4">Usados </span>
                      <strong>
                        {detalle.usados}
                      </strong>
                    </li>
                    <li class="list-group-item">
                      <span class="pe-4">Devueltos </span>
                      <strong>
                        {detalle.devueltos}
                      </strong>
                    </li>
                    <li class="list-group-item">
                      <span class="badge text-bg-info">
                        Descuento {detalle.descuento !== null ? detalle.descuento : 0}%
                      </span>
                    </li>
                  </ul>
                </a>
              ))}
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detalles;
