import { React, BrowserRouter, Switch, Route } from "../common";

import routes from "./routes.js";

const RouteBuilder = (route) => {
  return (
    <Route
      path={route.path}
      render={(props) => {
        if (route.isRedirect) Object.assign(props, route.redirectTo)
        return <route.component {...props} />;
      }}
    />
  );
};

/**
 * routes for the app
 */ 
const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map((routes, index) => {
          return <RouteBuilder key={index} {...routes} />;
        })}
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
