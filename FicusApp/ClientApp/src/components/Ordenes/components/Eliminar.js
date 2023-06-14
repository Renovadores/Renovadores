import React from "react";

//TODO: eliminar detalles y hostorial de ordenes liberar a inventario productos

const EliminarOrden = ({ ordenId }) => {
  const handleDeleteOrden = async () => {
    try {
      const response = await fetch(`/api/Orden/${ordenId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Deletion successful
        console.log("Orden deleted successfully");
        // Perform any necessary updates in your component state or UI
      } else {
        // Error occurred
        console.error("Failed to delete Orden");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const paddedOrdenId = String(ordenId).padStart(5, "0");
  return (
    <div
      class="modal fade"
      id={`modalEliminarOrden${ordenId}`}
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" style={{ transform: "translateY(100%)" }}>
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              ¿Seguro que desea eliminar la orden{" "}
              <strong>{paddedOrdenId}</strong>?
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body d-flex justify-content-center">
            <button
              type="button"
              class="btn btn-secondary me-5"
              data-bs-dismiss="modal"
            >
              Cancelar
            </button>
            <button type="button" class="btn btn-danger" onClick={handleDeleteOrden}>
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EliminarOrden;
