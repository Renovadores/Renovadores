import React, { useState, useEffect, useRef } from "react";
import { getFaseButton, getLatestFase } from "./utils.js";

const FaseDropDown = ({ ordenId, fases, historialOrden, token, onFaseChange }) => {
  const [faseId, setFaseId] = useState();
  const latestFase = useRef(getLatestFase(historialOrden, ordenId));

  useEffect(() => {
    setFaseId(getLatestFase(historialOrden, ordenId)?.faseId);
  }, [historialOrden]);

  const handleCambioFase = async ({ nuevaFaseId }) => {
    try {
      const url = `/api/historialorden/`;
      const currentDate = new Date();

      var payload = {
        ordenId: ordenId,
        faseId: nuevaFaseId,
        inicio: currentDate.toISOString(),
        final: latestFase.current?.inicio || null,
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
        if (onFaseChange) {
          onFaseChange();
        }
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

  const renderFases = fases.map((fase) => {
    if (fase.faseId > faseId || faseId == null) {
      return (
        <li key={fase.faseId}>
          <button
            className="dropdown-item"
            onClick={() => handleCambioFase({ nuevaFaseId: fase?.faseId })}
          >
            {fase?.descripcionEstado}
          </button>
        </li>
      );
    } else {
      return null;
    }
  });

  return (
    <div>
      {getFaseButton({ fases, faseId })}
      <ul className="dropdown-menu">
        {!renderFases.every((element) => element === null) ? (
          renderFases
        ) : (
          <li>
            <button className="dropdown-item" disabled>
              No más fases disponibles
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default FaseDropDown;
