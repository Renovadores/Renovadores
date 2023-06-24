import React, { useState, useEffect } from "react";

import RowOrden from "./components/RowOrden.js";
import ActionsOrdenes from "./components/ActionsOrdenes.js";
import { GetToken } from "../../GetToken";

const Orden = () => {
  const [token, setToken] = useState("");
  const [orden, setOrden] = useState([]);
  const fetchOrden = async () => {
    try {
      const response = await fetch("/api/orden/GetOrders");
      const data = await response.json();
      setOrden(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const [historial, setHistorial] = useState([]);
  const fetchHistorial = async () => {
    try {
      const response = await fetch(`/api/historialorden/`);
      const data = await response.json();
      setHistorial(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const [cliente, setCliente] = useState([]);
    const fetchCliente = async () => {
      try {
        const response = await fetch(`/api/cliente/GetClientes/`, {
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
    fetchHistorial();
    fetchOrden();
  }, []);

  useEffect(() => {
    if (token !== "") {
      fetchCliente();
    } else {
      const getToken = async () => {
        const dbToken = await GetToken();
        setToken(dbToken);
      }
      getToken();
    }
  }, [token]);

  const getFase = (ordenId) => {
    const fases = historial
      .filter((d) => d.ordenId === ordenId)
      .map((d) => d.faseId);

    if (fases.length === 0) {
      return null;
    }

    return fases.reduce((maxFaseId, faseId) => {
      return Math.max(maxFaseId, faseId);
    });
  };

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredOrden = orden.filter((orden) => {
    return (
      orden.ordenId.toString().includes(searchTerm)
    );
  });

  return (
    <>
      <ActionsOrdenes
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />
      <div class="card overflow-y-scroll" style={{ height: "75vh" }}>
        <table className="table table-hover ">
          <thead>
            <tr>
              <th scope="col" className="text-center">
                ID Orden
              </th>
              <th scope="col" className="text-center">
                Cliente
              </th>
              <th scope="col" className="text-center">
                Fecha de Alquiler
              </th>
              <th scope="col" className="text-center">
                Fase
              </th>
              <th scope="col" className="text-center">
                Monto
              </th>
              <th scope="col" className="text-center">
                Acción
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredOrden.map((orden) => (
              <RowOrden
                ordenId={orden.ordenId}
                clienteId={
                  cliente.filter(c => c.clienteId === orden.clienteId)[0]?.nombreEmpresa
                }
                fechaAlquiler={orden.fechaAlquiler}
                faseId={getFase(orden.ordenId)}
                monto={orden.monto}
                key={orden.ordenId}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Orden;
