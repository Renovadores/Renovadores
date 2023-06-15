import ListaProductos from "./ListaProductos.js";

const DetallesOrden = ({ detalleId }) => {
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
            <ListaProductos ordenId={detalleId} />
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

export default DetallesOrden;
