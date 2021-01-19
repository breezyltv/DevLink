import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  component: RouteComponent,
  isAuthenticated,
  ...rest
}) => {
  //const [isAuthenticated, setIsAuthenticated] = useState(null);
  //let isAuthenticated = localStorage.getItem("isLoggedIn");

  return (
    <Route
      {...rest}
      render={routeProps =>
        isAuthenticated ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};
export default PrivateRoute;
