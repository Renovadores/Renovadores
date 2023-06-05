import React, { useState, useEffect } from 'react';
import Dashboard from 'layouts/admin';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Box,
} from "@chakra-ui/react"


const Vacio = () => {
  const [orden, setOrden] = useState([]);
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    // Tomar los datos de la orden
    fetch('https://localhost:44493/api/orden/')
      .then((response) => response.json())
      .then((data) => {
        setOrden(data);
      })
      .catch((err) => {
        console.log(err.message);
      });

    // Tomar los datos del historial de ordenes
    fetch('https://localhost:44493/api/historial_orden/')
      .then((response) => response.json())
      .then((data) => {
        setHistorial(data);
      })
      .catch((err) => {
        console.log(err.message);
      });

  }, []);



  console.log(historial);
  historial.filter(h => h.orden === "ORD002");

  return (
    <Dashboard>
      <Box fontFamily="Overpass Light, sans-serif">
        <Table bg='white'>
          <Thead>
            <Tr>
              <Th scope="col">ID</Th>
              <Th scope="col">Cliente</Th>
              <Th scope="col">Fase</Th>
              <Th scope="col">Fecha de Alquiler</Th>
              <Th scope="col">Detalle</Th>
            </Tr>
          </Thead>
          <Tbody class="table-group-divider">
            {orden.map((orden) => (
              <Tr>
                <Th scope="row">{orden.id_orden}</Th>
                <Td>{orden.cliente}</Td>
                <Td>{orden.fecha_alquiler}</Td>
                <Td>{orden.datalle}</Td>

              </Tr>
            ))}
          </Tbody>
        </Table>
    </Box>
    </Dashboard>
  );
};


export default Vacio;
