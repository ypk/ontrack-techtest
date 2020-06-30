import React from "react";
import { Navbar, Container } from "react-bootstrap";

import Routes from "./common/routes.jsx";

function App() {
  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">OnTrack Test</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
      <Routes></Routes>
      </Container>
    </>
  );
}

export default App;
