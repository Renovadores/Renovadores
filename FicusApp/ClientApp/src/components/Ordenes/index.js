import React, { useState, useEffect } from "react";
import { GetToken } from "../../GetToken.js";

import RowOrden from "./components/RowOrden.js";
import ActionsOrdenes from "./components/ActionsOrdenes.js";

const Orden = () => {
  const [token, setToken] = useState("");
  const [orden, setOrden] = useState([]);
  const [cliente, setCliente] = useState([]);
  const [fases, setFases] = useState([]);
  const [historialOrden, setHistorialOrden] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [historialOrdenEliminadas, setHistorialOrdenEliminadas] = useState([]);

  const fetchOrden = async () => {
    try {
      const response = await fetch(`/api/orden/GetOrders`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const dataOrden = await response.json();
      try {
        const response = await fetch(`/api/historialorden/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setHistorialOrden(data);
        const filteredHistorialOrden = data.filter((item) => item.faseId === 0);
        setHistorialOrdenEliminadas(filteredHistorialOrden);

        const ordenIdsEliminadas = historialOrdenEliminadas.map(
          (historial) => historial.ordenId
        );
        const filteredOrden = dataOrden.filter((orden) =>
          !ordenIdsEliminadas.includes(orden.ordenId)
        );

        setOrden(filteredOrden);
      } catch (error) {
        console.log(error.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchCliente = async () => {
    try {
      const response = await fetch(`api/cliente/GetAllClientes/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setCliente(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Pedir los datos de una fase con su ID
  const fetchFases = async () => {
    try {
      const response = await fetch(`/api/fase/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setFases(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (token !== "") {
      fetchOrden();
      fetchCliente();
      fetchFases();
    } else {
      const getToken = async () => {
        const dbToken = await GetToken();
        setToken(dbToken);
      };
      getToken();
    }
  }, [token, historialOrden]);


  const handleFaseChange = async () => {
    try {
      fetchOrden();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

const filteredOrden = orden.filter((orden) => {
  const clienteEmpresa = cliente.find(
    (c) => c.clienteId === orden.clienteId
  )?.nombreEmpresa;

  const searchTermWithoutSpaces = searchTerm.replace(/\s/g, '');

  return (
    orden.ordenId.toString().includes(searchTermWithoutSpaces) ||
    clienteEmpresa.replace(/\s/g, '').includes(searchTermWithoutSpaces)
  );
});

  filteredOrden.sort((a, b) => new Date(b.fechaAlquiler) - new Date(a.fechaAlquiler));

  return (
    <>
      <ActionsOrdenes
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />
      <div
        className="card overflow-y-scroll"
        style={{ height: "75vh", overflowY: "auto" }}
      >
        <table className="table table-hover">
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
                key={orden.ordenId}
                orden={orden}
                cliente={cliente}
                fases={fases}
                historialOrden={historialOrden}
                onFaseChange={handleFaseChange}
                token={token}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Orden;
