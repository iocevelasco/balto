import { Footer } from 'src/ui/components/Footer'
import { Header } from 'src/ui/components/Header'
import { Box, Flex } from '@radix-ui/themes'
import { ReactNode } from 'src/utils/types/commons'

interface UnauthenticatedAppProps extends ReactNode {}

const UnauthenticatedApp = (props: UnauthenticatedAppProps) => {
  return (
    <Flex
      className="bg-yellow-50"
      direction="column"
      style={{
        height: '100vh',
        overflowY: 'auto',
      }}
    >
      <Flex direction="column" className="h-screen">
        <Header />
        <Box style={{ display: 'flex' }}>{props.children}</Box>
      </Flex>
      <Footer />
    </Flex>
  )
}

export type { UnauthenticatedAppProps }

export { UnauthenticatedApp }
