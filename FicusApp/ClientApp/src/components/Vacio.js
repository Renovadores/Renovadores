import React from 'react';
import Dashboard from 'layouts/admin';
import { Box } from "@chakra-ui/react";


const Vacio = () => {
  return (
    <Dashboard>
      <Box fontFamily="Overpass Light, sans-serif">
      <h1> Aquí no hay nada... </h1>
      </Box>
    </Dashboard>
  );
};

export default Vacio;
