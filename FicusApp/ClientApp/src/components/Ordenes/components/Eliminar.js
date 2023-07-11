import React, { useState } from "react";
import { getLatestFase } from "./utils.js";

import { GetToken } from "../../../GetToken";

//TODO: eliminar detalles y hostorial de ordenes liberar a inventario productos

const EliminarOrden = ({ ordenId }) => {
  const [token, setToken] = useState("");
    const [historial, setHistorial] = useState([]);
  const fetchHistorial = async () => {
    try {
      const response = await fetch(`/api/historialorden/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setHistorial(data);
    } catch (error) {
      console.log(error.message);
    }
  };


  const handleDeleteOrden = async ({ ordenId }) => {
    try {
      const url = `/api/historialorden/`;
      const currentDate = new Date();

      var payload = {
        ordenId: ordenId,
        faseId: 0,
        inicio: currentDate.toISOString(),
        final: getLatestFase(historial, ordenId)?.inicio,
        fase: null,
        orden: null,
      };
      console.log(payload);

      const response = await fetch(url, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log("Valor agregado correctamente a la columna.");
      } else {
        const errorResponse = await response.json();
        throw new Error(
          `Error en la solicitud: ${response.status} - ${errorResponse}`
        );
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };



















  const paddedOrdenId = String(ordenId).padStart(5, "0");
  return (
    <div
      className="modal fade"
      id={`modalEliminarOrden${ordenId}`}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" style={{ transform: "translateY(100%)" }}>
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              ¿Seguro que desea eliminar la orden{" "}
              <strong>{paddedOrdenId}</strong>?
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-secondary me-5"
              data-bs-dismiss="modal"
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => handleDeleteOrden({ordenId: ordenId})}
              data-bs-dismiss="modal"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EliminarOrden;
