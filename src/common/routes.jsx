import React, { Suspense, lazy } from "react";
import { BrowserRouter, Redirect, Switch, Route } from "react-router-dom";

import { NotFound, Loader } from "./common.jsx";
const ListingPage = lazy(() => import("../listing-page/listing-page.jsx"));

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
          <Suspense fallback={<Loader />}>
            <ListingPage />
          </Suspense>
        </Route>
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
