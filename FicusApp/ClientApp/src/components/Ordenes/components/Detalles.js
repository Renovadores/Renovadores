import ListaProductos from "./ListaProductos.js";

const DetallesOrden = ({ detalleId, onDetalleUpdate, token }) => {
  const paddedDetalleId = String(detalleId).padStart(5, "0");
  return (
    <div
      className="modal fade"
      id={`modalDetalle${detalleId}`}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Productos solicitado en orden <strong>{paddedDetalleId}</strong>
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body flex-wrap">
            <ListaProductos
              ordenId={detalleId}
              isOrden={true}
              isOrdenEditable={false}
              ordenUpdated={false}
              onDetalleUpdate={onDetalleUpdate}
              token={token}
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
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
