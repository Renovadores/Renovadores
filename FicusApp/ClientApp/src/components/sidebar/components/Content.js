import logo_sidebar from "../../../assets/ficus/img/tagline_red.png"
// chakra imports
import { Box, Flex, Stack, Center, Image } from "@chakra-ui/react";
//   Custom components
import Links from "components/sidebar/components/Links";
import React from "react";

// FUNCTIONS

function SidebarContent(props) {
  const { routes } = props;
  // SIDEBAR
  return (
    <Flex direction='column' height='100%' pt='25px' borderRadius='30px'>
      <Flex align='center' direction='column' >
        <Image src={logo_sidebar} alt="Ficus logo"
          style={{ 
            marginTop: "-30%", 
            marginBottom: "-20%" }}
        />
      </Flex>
      <Stack direction='column' mb='auto' mt='8px'>
        <Box ps='20px' pe={{ md: "16px", "2xl": "1px" }}>
         <Links routes={routes} />
        </Box>
      </Stack>
    </Flex>
  );
}

export default SidebarContent;
