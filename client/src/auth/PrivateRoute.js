import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({
  component: RouteComponent,
  isAuthenticated,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={routeProps =>
        isAuthenticated === true ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};
export default PrivateRoute;
