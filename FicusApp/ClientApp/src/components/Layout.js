import React from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';
import Login from './Login'

function Layout (props) {
  return (
      <div>
          <NavMenu />
          <Container tag="main">
              {props.children}
          </Container>
    </div>
  );
}
export default Layout;