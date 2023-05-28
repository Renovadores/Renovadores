// Fixes imports
import { Routes, Route, Navigate } from 'react-router-dom';
// Chakra imports
import { Portal, Box, useDisclosure, useColorModeValue } from "@chakra-ui/react";
// Layout components
import Navbar from "components/navbar/NavbarAdmin.js";
import Sidebar from "components/sidebar/Sidebar.js";
import { SidebarContext } from "contexts/SidebarContext";
import React, { useState } from "react";
// import { Redirect, Route, Switch } from "react-router-dom";
// import routes from "routes.js";
import AppRoutes from 'AppRoutes';

// Custom Chakra theme
export default function Dashboard({children}) {
  // states and functions
  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  // functions for changing the states from components
  const getRoute = () => {
    return window.location.pathname !== "/admin/full-screen-maps";
  };
  const getActiveRoute = (AppRoutes) => {
    const currentPath = window.location.pathname;
    for (let i = 0; i < AppRoutes.length; i++) {
      const route = AppRoutes[i];
      if (route.index && currentPath === '/') {
        return route.name;
      } else if (route.path && currentPath === route.path) {
        return route.name;
      }
    }
    // Return a default route name if no active route is found
    return "Predeterminada";
  };
  const getActiveNavbar = (AppRoutes) => {
    let activeNavbar = false;
    for (let i = 0; i < AppRoutes.length; i++) {
      if (AppRoutes[i].collapse) {
        let collapseActiveNavbar = getActiveNavbar(AppRoutes[i].items);
        if (collapseActiveNavbar !== activeNavbar) {
          return collapseActiveNavbar;
        }
      } else if (AppRoutes[i].category) {
        let categoryActiveNavbar = getActiveNavbar(AppRoutes[i].items);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (
          window.location.href.indexOf(AppRoutes[i].layout + AppRoutes[i].path) !== -1
        ) {
          return AppRoutes[i].secondary;
        }
      }
    }
    return activeNavbar;
  };
  const getActiveNavbarText = (AppRoutes) => {
    let activeNavbar = false;
    for (let i = 0; i < AppRoutes.length; i++) {
      if (AppRoutes[i].collapse) {
        let collapseActiveNavbar = getActiveNavbarText(AppRoutes[i].items);
        if (collapseActiveNavbar !== activeNavbar) {
          return collapseActiveNavbar;
        }
      } else if (AppRoutes[i].category) {
        let categoryActiveNavbar = getActiveNavbarText(AppRoutes[i].items);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (
          window.location.href.indexOf(AppRoutes[i].layout + AppRoutes[i].path) !== -1
        ) {
          return AppRoutes[i].messageNavbar;
        }
      }
    }
    return activeNavbar;
  };
  const getRoutes = (AppRoutes) => {
    return AppRoutes.map((prop, key) => {
      if (prop.layout === "/") {
        return (

          <Route
            path={prop.path}
            component={prop.element}
            key={key}
          />

          /*<Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />*/

        );
      }
      if (prop.collapse) {
        return getRoutes(prop.items);
      }
      if (prop.category) {
        return getRoutes(prop.items);
      } else {
        return null;
      }
    });
  };
  document.documentElement.dir = "ltr";
  const { onOpen } = useDisclosure();
  return (
    <Box>
      <SidebarContext.Provider
        value={{
          toggleSidebar,
          setToggleSidebar,
        }}>
        <Sidebar routes={AppRoutes} display='none'/>
        <Box
          float='right'
          minHeight='100vh'
          height='100%'
          overflow='auto'
          position='relative'
          maxHeight='100%'
          w={{ base: "100%", xl: "calc( 100% - 290px )" }}
          maxWidth={{ base: "100%", xl: "calc( 100% - 290px )" }}
          transition='all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
          transitionDuration='.2s, .2s, .35s'
          transitionProperty='top, bottom, width'
          transitionTimingFunction='linear, linear, ease'>
          <Portal>
            <Box>
              <Navbar
                onOpen={onOpen}
                logoText={"Ficus App"}
                brandText={getActiveRoute(AppRoutes)}
                secondary={getActiveNavbar(AppRoutes)}
                message={getActiveNavbarText(AppRoutes)}
                fixed={fixed}
              />
            </Box>
          </Portal>
          {getRoute() ? (
            <Box mx="auto" p={{ base: '20px', md: '30px' }} pe="20px" minH="100vh" pt="50px">
              {/*<Routes>
                {getRoutes(AppRoutes)}
                <Route path="/" element={<Navigate to="/admin/default" />} />
              </Routes>*/}
              <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
                <main>
                  {children}
                </main>
              </Box>
            </Box>
          ) : null}
          {/*{getRoute() ? (
            <Box
              mx='auto'
              p={{ base: "20px", md: "30px" }}
              pe='20px'
              minH='100vh'
              pt='50px'>
              <Switch>
                {getRoutes(routes)}
                <Redirect from='/' to='/admin/default' />
              </Switch>
            </Box>
          ) : null}*/}
          <Box>
            {/* Aqui va el footer */}
          </Box>
        </Box>
      </SidebarContext.Provider>
    </Box>
  );
}
