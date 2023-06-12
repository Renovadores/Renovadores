import React, { useState, useEffect } from "react";
import Dashboard from "layouts/admin";
import { Box } from "@chakra-ui/react";

import RowOrden from "./components/RowOrden.js";
import ActionsOrdenes from "./components/ActionsOrdenes.js";

const Orden = () => {
  const [orden, setOrden] = useState([]);
  const [fase, setFase] = useState([]);
  const fetchOrden = async () => {
    try {
      const response = await fetch("https://localhost:44493/api/orden/");
      const data = await response.json();
      setOrden(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    // Tomar los datos de todas las ordenes
    fetchOrden();
  }, []);

  return (
    <Dashboard>
      <Box fontFamily="Overpass Light, sans-serif">
          <ActionsOrdenes/>
      <div class="card overflow-y-scroll" style={{height: "75vh"}}>
        <table className="table table-hover ">
          <thead>
            <tr>
              <th scope="col">ID Orden</th>
              <th scope="col">Cliente</th>
              <th scope="col">Fecha de Alquiler</th>
              <th scope="col">Fase</th>
              <th scope="col">Monto</th>
              <th scope="col">Detalle</th>
            </tr>
          </thead>

          <tbody>
            {orden.map((orden) => (
              <RowOrden
                ordenId={orden.ordenId}
                clienteId={orden.clienteId}
                fechaAlquiler={orden.fechaAlquiler}
                faseId={orden.faseId}
                monto={orden.monto}
                key={orden.ordenId}
              />
            ))}
          </tbody>
        </table>
      </div>
      </Box>
    </Dashboard>
  );
};

export default Orden;
