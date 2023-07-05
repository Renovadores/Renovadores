import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";

function NavMenu(props) {
  const [collapsed, setState] = useState(true);
  const toggleNavbar = () => {
    setState(!collapsed);
  };
  return (
    <header>
      <Navbar
        className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
        color="primary"
      >
        <img src="images\Logotipo (12).jpg" alt="logo" width="40" height="40" />
        <NavbarBrand tag={Link} className="text-light" to="/">
          FicusApp
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2 navbar-dark border border-2" />
        <Collapse
          className="d-sm-inline-flex flex-sm-row-reverse"
          isOpen={!collapsed}
          navbar
        >
          <ul className="navbar-nav flex-grow" onClick={toggleNavbar}>
            <NavItem>
              <NavLink tag={Link} className="text-light" to="/">
                Inicio
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} className="text-light" to="/ordenes">
                Ordenes
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} className="text-light" to="/productos">
                Productos
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} className="text-light" to="/clientes">
                Clientes
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} className="text-light" to="/eventos">
                Eventos
              </NavLink>
            </NavItem>
            <NavLink tag={Link} className="text-light" to="/inventario">
              Inventario
            </NavLink>
            <NavItem>
              <NavLink tag={Link} className="text-light" to="/cerrarSesion" onClick={props.handleCloseSession}>
                Cerrar Sesion
              </NavLink>
            </NavItem>
          </ul>
        </Collapse>
      </Navbar>
    </header>
  );
}
export default NavMenu;
