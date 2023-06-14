import React, { useState, useEffect } from "react";
import {formatDate} from "./utils.js"

const ClienteInfo = ({ clienteId }) => {
  const [cliente, setCliente] = useState([]);
  const fetchCliente = async () => {
    try {
      const response = await fetch(`/api/cliente/GetCliente/${clienteId}`);
      const data = await response.json();
        setCliente(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchCliente(clienteId);
  }, [clienteId]);

  return (
    <div>
      <div class="list-group">
        <div class="list-group-item">
          <strong>Fecha Agregado:</strong> {formatDate(cliente?.fechaAgregado)}
        </div>
        <div class="list-group-item">
          <strong>Prioridad:</strong> {cliente?.prioridad}
        </div>
        <div class="list-group-item">
          <strong>Estado:</strong> {cliente?.estado}
        </div>
        <div class="list-group-item">
          <strong>Nombre Empresa:</strong> {cliente?.nombreEmpresa}
        </div>
        <div class="list-group-item">
          <strong>Contacto:</strong> {cliente?.contacto}
        </div>
        <div class="list-group-item">
          <strong>Teléfono:</strong> {cliente?.telefono}
        </div>
        <div class="list-group-item">
          <strong>Correo:</strong> {cliente?.correo}
        </div>
        <div class="list-group-item">
          <strong>Web:</strong> {cliente?.web}
        </div>
      </div>
    </div>
  );
};

export default ClienteInfo;
