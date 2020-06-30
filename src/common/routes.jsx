import React from "react";
import { BrowserRouter, Redirect, Switch, Route } from "react-router-dom";

import { NotFound } from "./common.jsx";
import ListingPage from "../listing-page/listing-page.jsx";

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
