/* eslint-disable */
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
// chakra imports
import { Box, Flex, HStack, Text, useColorModeValue } from "@chakra-ui/react";

export function SidebarLinks(props) {
  //   Chakra color mode
  let location = useLocation();
  let activeColor = useColorModeValue("gray.700", "white");
  let activeIcon = useColorModeValue("grey.500", "white");
  let textColor = useColorModeValue("secondaryGray.500", "white");
  let brandColor = useColorModeValue("red.500", "brand.400");

  const { routes } = props;

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName);
  };

  // this function creates the links from the secondary accordions (for example auth -> sign-in -> default)
  const createLinks = (routes) => {
    return routes.map((route, index) => {
      if (route.category) {
        return (
          <>
            <Text
              fontSize={"md"}
              color={activeColor}
              mx='auto'
              ps={{
                sm: "10px",
                xl: "16px",
              }}
              pt='18px'
              pb='12px'
              key={index}>
              {route.name}
            </Text>
            {createLinks(route.items)}
          </>
        );
      } else /*if (
        route.layout === "/admin" ||
        route.layout === "/auth" ||
        route.layout === "/rtl"
      )*/ {
        return (
          <NavLink key={index} to={route.path}>
            {(
              <Box _hover={{ color: brandColor }}>
                <HStack
                  alignItems="center"
                  justifyContent="space-between"
                  spacing={
                    activeRoute(route.path) ? "22px" : "26px"
                  }
                  py='5px'
                  ps='10px'>
                  <Flex w='50%' alignItems='center' justifyContent='center'>
                    <Box
                      color={
                        activeRoute(route.path)
                          ? brandColor
                          : activeIcon
                      }
                      me='18px'>
                      {route.icon}
                    </Box>
                    <Box
                      fontFamily="Chivo, sans-serif"
                      me='auto'
                      color={textColor}
                      fontWeight={
                        activeRoute(route.path)
                          ? "bold"
                          : "normal"
                      }>
                      {route.name}
                    </Box>
                  </Flex>
                  <Box
                    h='36px'
                    w='4px'
                    bg={
                      activeRoute(route.path)
                        ? brandColor
                        : "transparent"
                    }
                    borderRadius='5px'
                  />
                </HStack>
              </Box>
            )}
          </NavLink>
        );
      }
    });
  };
  return createLinks(routes);
}

export default SidebarLinks;
