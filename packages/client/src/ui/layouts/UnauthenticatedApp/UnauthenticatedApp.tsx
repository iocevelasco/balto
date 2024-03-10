import React from 'react';
import { UNSAFE_RouteContext as RouteContext } from "react-router";
import { Footer } from 'src/ui/components/Footer';
import { Header } from 'src/ui/components/Header';
import { Box } from 'src/ui/design-system/Box';

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
        <Box display='flex' flexDirection='column' height="screen">
        <Header />
        {props.children}
        <Footer />
        </Box>
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
