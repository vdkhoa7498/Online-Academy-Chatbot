import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function AdminRoute({ children, ...rest }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user ? user.role : null;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        role === "admin" ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
