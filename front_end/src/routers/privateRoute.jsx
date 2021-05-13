import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export function PrivateRoute({children, ...rest}) {
  return (
    <Route
      {...rest}
      render={({location}) => 
        (localStorage.getItem("isAuthenticated")) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location}
            }}
          />
        )
      }
    />
  );
}

