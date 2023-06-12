import React, { useState, useEffect } from "react";
import { Modal } from "bootstrap";

import Detalles from "./Detalles.js";

// Mejora el formato de las fechas
function formatDate(dateUnFormatted) {
  const date = new Date(dateUnFormatted);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleString("es-ES", options);
  return formattedDate;
}

// Customiza la forma en la que se ve cada estado
function getFaseBadge({ faseId, faseText }) {
  const opciones = {
    1: <span class="badge text-bg-secondary">{faseText}</span>,
    2: <span class="badge text-bg-warning">{faseText}</span>,
    3: <span class="badge text-bg-success">{faseText}</span>,
    default: <span class="badge text-bg-secondary">Indefinido</span>,
  };
  const resultado = opciones[faseId] || opciones.default;
  return resultado;
}

const RowOrden = ({ ordenId, clienteId, fechaAlquiler, faseId, monto }) => {
  const paddedOrdenId = String(ordenId).padStart(5, "0");

  const [fase, setFase] = useState([]);
  // Pedir los datos de una fase con su ID
  const fetchFase = async (faseId) => {
    try {
      const response = await fetch(
        `https://localhost:44493/api/fase/${faseId}`
      );
      const data = await response.json();
      setFase(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchFase(faseId);
  }, [faseId]);

  return (
    <>
      <tr>
        <th scope="row">{paddedOrdenId}</th>
        <td>{clienteId}</td>
        <td>{formatDate(fechaAlquiler)}</td>
        <td>
          <div>
            {getFaseBadge({ faseId: faseId, faseText: fase.descripcionEstado })}
          </div>
        </td>
        <td>₡ {monto.toLocaleString()}</td>
        <td>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            data-bs-toggle="modal"
            data-bs-target={`#modalDetalle${ordenId}`}
          >
            Mostrar detalles
          </button>
        </td>
      </tr>
      <Detalles detalleId={ordenId} />
    </>
  );
};

export default RowOrden;
