import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function LecturerRoute({ children, ...rest }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const access_token = localStorage.getItem("access_token");
  const role = user ? user.role : null;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        role === "lecturer" && access_token ? (
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
