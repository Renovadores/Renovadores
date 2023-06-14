import React from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';

function Layout (props) {
  return (
    <div>
      <NavMenu userId={props.userId} handleCloseSession={props.handleCloseSession} />
      <Container tag="main">
        {props.children}
      </Container>
    </div>
  );
}
export default Layout;