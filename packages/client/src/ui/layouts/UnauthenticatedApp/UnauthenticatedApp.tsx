import React from 'react'
import { UNSAFE_RouteContext as RouteContext } from 'react-router'
import { Footer } from 'src/ui/components/Footer'
import { Header } from 'src/ui/components/Header'
import { Box, Flex } from '@radix-ui/themes'

interface UnauthenticatedAppProps {
  children: React.ReactNode | React.ReactNode[]
}

const UnauthenticatedApp = (props: UnauthenticatedAppProps) => {
  return (
    <Flex direction="column">
      <Header />
      <Box style={{ overflow: 'scroll', display: 'flex' }}>{props.children}</Box>
      <Footer />
    </Flex>
  )
}

export type { UnauthenticatedAppProps }

export { UnauthenticatedApp }
