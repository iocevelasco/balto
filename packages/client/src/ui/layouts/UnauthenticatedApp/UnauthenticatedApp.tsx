import { Footer } from 'src/ui/components/Footer'
import { Header } from 'src/ui/components/Header'
import { Box, Flex } from '@radix-ui/themes'
import { ReactNode } from 'src/utils/types/commons'

interface UnauthenticatedAppProps extends ReactNode {}

const UnauthenticatedApp = (props: UnauthenticatedAppProps) => {
  return (
    <>
      <Flex className="bg-yellow-50" direction="column">
        <Flex direction="column" className="min-h-screen">
          <Header />
          <Box>{props.children}</Box>
        </Flex>
        <Footer />
      </Flex>
    </>
  )
}

export type { UnauthenticatedAppProps }

export { UnauthenticatedApp }
