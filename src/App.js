import React from 'react';
import { Navbar, Container } from "react-bootstrap";
import { BrowserRouter, Redirect, Switch, Route } from "react-router-dom";
import ListingPage from './listing-page/listing-page.jsx'; 
import NotFound from './not-found/not-found.jsx';

function App() {
  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">
            OnTrack React Demo
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Redirect to="/books/1" />
            </Route>
            <Route exact path="/books/:page">
              <ListingPage />
            </Route>
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Container>
    </>
  );
}

export default App;
