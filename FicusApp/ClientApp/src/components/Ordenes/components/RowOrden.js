import React from "react";
import { Link } from "react-router-dom";

import { BsTrashFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";

import DetallesOrden from "./Detalles.js";
import EliminarOrden from "./Eliminar.js";
import FaseDropDown from "./FaseDropdown.js";
import { formatDate } from "./utils.js";

const RowOrden = ({
  orden,
  cliente,
  fases,
  historialOrden,
  onFaseChange,
  token,
}) => {
  const { ordenId, clienteId, fechaAlquiler, monto } = orden;
  const paddedOrdenId = String(ordenId).padStart(5, "0");
  const clienteEmpresa = cliente.find(
    (c) => c.clienteId === clienteId
  )?.nombreEmpresa;
  console.log(cliente);
  console.log(orden);

  return (
    <tr>
      <th scope="row" className="text-center">
        <Link to={`/ordenes/${ordenId}`}>{paddedOrdenId}</Link>
      </th>
      <td className="text-center">{clienteEmpresa}</td>
      <td className="text-center">{formatDate(fechaAlquiler)}</td>
      <td className="text-center">
        <FaseDropDown
          ordenId={ordenId}
          fases={fases}
          historialOrden={historialOrden}
          onFaseChange={onFaseChange}
          token={token}
        />
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
        <DetallesOrden detalleId={ordenId} key={ordenId} />
        <EliminarOrden ordenId={ordenId} />
      </td>
    </tr>
  );
};

export default RowOrden;
