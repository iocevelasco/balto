import React from 'react'
import { Footer } from 'src/ui/components/Footer'
import { Header } from 'src/ui/components/Header'
import { Box, Flex } from '@radix-ui/themes'

interface UnauthenticatedAppProps {
  children: React.ReactNode | React.ReactNode[]
}

const UnauthenticatedApp = (props: UnauthenticatedAppProps) => {
  return (
    <Flex
      direction="column"
      style={{
        height: '100vh',
        overflowY: 'auto',
      }}
    >
      <Flex direction="column">
        <Header />
        <Box style={{ overflowY: 'scroll', display: 'flex' }}>{props.children}</Box>
      </Flex>
      <Footer />
    </Flex>
  )
}

export type { UnauthenticatedAppProps }

export { UnauthenticatedApp }
