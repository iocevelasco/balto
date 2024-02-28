import React from 'react';
import { UNSAFE_RouteContext as RouteContext } from "react-router";

interface UnauthenticatedAppProps { 
  children: React.ReactNode | React.ReactNode[];
}

const UnauthenticatedApp = (props: UnauthenticatedAppProps) => {
  const contextValue = React.useContext(RouteContext);

  return (
    <React.Suspense
      fallback={'...loading'}
    >
      <RouteContext.Provider value={contextValue}>
      {props.children}
       </RouteContext.Provider>
      </React.Suspense>
  );
}

export type {
  UnauthenticatedAppProps
}

export {
  UnauthenticatedApp
}
