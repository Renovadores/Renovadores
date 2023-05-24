// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";

const Vacio = () => {
  // Chakra Color Mode
  return (
    <AdminLayout>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <p> Aquí van las cosas </p>
      </Box>
    </AdminLayout>
  );
}

export default Vacio;
