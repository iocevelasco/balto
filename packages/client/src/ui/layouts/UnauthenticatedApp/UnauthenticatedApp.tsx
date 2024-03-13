import React from 'react'
import { UNSAFE_RouteContext as RouteContext } from 'react-router'
import { Footer } from 'src/ui/components/Footer'
import { Header } from 'src/ui/components/Header'
import { Box } from 'src/ui/design-system/Box'

interface UnauthenticatedAppProps {
  children: React.ReactNode | React.ReactNode[]
}

const UnauthenticatedApp = (props: UnauthenticatedAppProps) => {
  return (
    <Box display="flex" flexDirection="column" height="screen">
      <Header />
      <Box display="flex" flexGrow="1" justifyContent="center" padding="large">
        {props.children}
      </Box>
      <Footer />
    </Box>
  )
}

export type { UnauthenticatedAppProps }

export { UnauthenticatedApp }
