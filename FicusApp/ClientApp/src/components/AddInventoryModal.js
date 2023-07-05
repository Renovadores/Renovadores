import { Link } from "react-router-dom";

function AddInventoryModal({ productoId }) {
  return (
    <div
      id="goInventoryModal"
      className="modal"
      tabIndex="-1"
      aria-labelledby="goInventoryModalLabel"
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="goInventoryModalLabel">
              {productoId}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              {" "}
            </button>
          </div>
          <div className="modal-body">
            <label>
              Desea agregar inventario para el producto {productoId}
            </label>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            //onClick={onCancel}
            >
              Cancelar
            </button>

            <Link to={`/inventario`}>
              <button
                className="btn btn-primary"
                data-bs-dismiss="modal"
                type="button"
              >
                Ir a inventario
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddInventoryModal;