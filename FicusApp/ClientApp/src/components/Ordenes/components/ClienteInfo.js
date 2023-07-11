import React, { useState, useEffect } from "react";
import {formatDate} from "./utils.js"
import { GetToken } from "../../../GetToken";

const ClienteInfo = ({ clienteId }) => {
  const [cliente, setCliente] = useState([]);
  const [token, setToken] = useState("");
  const fetchCliente = async () => {
    try {
      const response = await fetch(`api/cliente/GetCliente/${clienteId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setCliente(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (token !== "") {
      fetchCliente(clienteId);
    } else {
      const getToken = async () => {
        const dbToken = await GetToken();
        setToken(dbToken);
      }
      getToken();
    }
    
  }, [clienteId, token]);

  return (
    <div>
      <div className="list-group">
        <div className="list-group-item">
          <strong>Fecha Agregado:</strong> {formatDate(cliente?.fechaAgregado)}
        </div>
        <div className="list-group-item">
          <strong>Prioridad:</strong> {cliente?.prioridad}
        </div>
        <div className="list-group-item">
          <strong>Estado:</strong> {cliente?.estado}
        </div>
        <div className="list-group-item">
          <strong>Nombre Empresa:</strong> {cliente?.nombreEmpresa}
        </div>
        <div className="list-group-item">
          <strong>Contacto:</strong> {cliente?.contacto}
        </div>
        <div className="list-group-item">
          <strong>Teléfono:</strong> {cliente?.telefono}
        </div>
        <div className="list-group-item">
          <strong>Correo:</strong> {cliente?.correo}
        </div>
        <div className="list-group-item">
          <strong>Web:</strong> {cliente?.web}
        </div>
      </div>
    </div>
  );
};

export default ClienteInfo;
