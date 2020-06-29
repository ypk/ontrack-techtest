import React from 'react'
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom'
import ListingPage from "../listing-page/listing-page.jsx";
import { NotFound } from "./common.jsx";

/**
 * routes for the app
 */
const Routes = () => {
  return (
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
  );
};

export default Routes;
