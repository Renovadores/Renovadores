import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { BsTrashFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";

import DetallesOrden from "./Detalles.js";
import EliminarOrden from "./Eliminar.js";
import { formatDate, getFaseBadge } from "./utils.js";

const RowOrden = ({ ordenId, clienteId, fechaAlquiler, faseId, monto }) => {
  const paddedOrdenId = String(ordenId).padStart(5, "0");

  const [fase, setFase] = useState([]);
  // Pedir los datos de una fase con su ID
  const fetchFase = async (faseId) => {
    try {
      const response = await fetch(`/api/fase/${faseId}`);
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
    <tr>
      <th scope="row" className="text-center">
        <Link to={`/ordenes/${ordenId}`}>{paddedOrdenId}</Link>
      </th>
      <td className="text-center">{clienteId}</td>
      <td className="text-center">{formatDate(fechaAlquiler)}</td>
      <td className="text-center">
        <div>
          {getFaseBadge({ faseId: faseId, faseText: fase.descripcionEstado })}
        </div>
      </td>
      <td className="text-center">₡ {monto.toLocaleString()}</td>
      <td className="text-center">
        <div className="d-flex justify-content-center align-items-center">
          <button
            type="button"
            className="btn btn-primary btn-sm d-flex align-items-center me-2"
            data-bs-toggle="modal"
            data-bs-target={`#modalDetalle${ordenId}`}
          >
            <span className="me-1">Más</span>
            <FaPlus />
          </button>

          <button
            type="button"
            className="btn btn-danger btn-sm d-flex align-items-center"
            data-bs-toggle="modal"
            data-bs-target={`#modalEliminarOrden${ordenId}`}
          >
            <span className="me-1">Eliminar</span>
            <BsTrashFill />
          </button>
        </div>
      </td>

      <DetallesOrden detalleId={ordenId} />
      <EliminarOrden ordenId={ordenId} />
    </tr>
  );
};

export default RowOrden;
