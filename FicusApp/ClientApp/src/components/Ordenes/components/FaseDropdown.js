import React, { useState, useEffect } from "react";
import { getFaseButton, getLatestFase } from "./utils.js";
import { GetToken } from "../../../GetToken";

const FaseDropDown = ({ ordenId, fases }) => {
  const [token, setToken] = useState("");
  const [faseId, setFaseId] = useState();

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

  useEffect(() => {
    if (token !== "") {
      fetchHistorial();
      setFaseId(getLatestFase(historial, ordenId)?.faseId);
    } else {
      const getToken = async () => {
        const dbToken = await GetToken();
        setToken(dbToken);
      };
      getToken();
    }
  }, [token, faseId, historial, ordenId]);

  const handleCambioFase = async ({ nuevaFaseId }) => {
    try {
      const url = `/api/historialorden/`;
      const currentDate = new Date();

      var payload = {
        ordenId: ordenId,
        faseId: nuevaFaseId,
        inicio: currentDate.toISOString(),
        final: null,
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

  const renderFases = fases.map((fase) => {
    // Add your condition here to exclude certain options
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
