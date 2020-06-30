import React, { Suspense, lazy } from "react";
import { Navbar, Container } from "react-bootstrap";
import { Loader } from "./common/common.jsx";
const Routes = lazy(() => import("./common/routes.jsx"));

function App() {
  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">OnTrack Test</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <Suspense fallback={<Loader />}>
          <Routes></Routes>
        </Suspense>
      </Container>
    </>
  );
}

export default App;
