import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute({children, ...rest}) {
  return (
    <Route
      {...rest}
      render={({location}) => 
        (localStorage.getItem("isAuthenticated")) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location}
            }}
          />
        )
      }
    />
  );
}

