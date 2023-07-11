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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseToken = await GetToken();
        setToken(responseToken);

        const [
          responseOrden,
          responseCliente,
          responseFases,
        ] = await Promise.all([
          fetch(`/api/orden/GetOrders`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${responseToken}`,
            },
          }),
          fetch(`api/cliente/GetAllClientes/`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${responseToken}`,
            },
          }),
          fetch(`/api/fase/`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${responseToken}`,
            },
          }),
        ]);

        const dataOrden = await responseOrden.json();
        const dataCliente = await responseCliente.json();
        const dataFases = await responseFases.json();

        fetchHistorialOrden();
        setOrden(dataOrden);
        setCliente(dataCliente);
        setFases(dataFases);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  const fetchHistorialOrden = async (token) => {
    const response = await fetch(`/api/historialorden/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setHistorialOrden(data);
  };

  const handleFaseChange = async () => {
    console.log("Actualice my compa...");
    try {
      fetchHistorialOrden();
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
