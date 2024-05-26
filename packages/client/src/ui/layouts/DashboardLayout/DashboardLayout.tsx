import { Footer } from 'src/ui/components/Footer'
import { Header } from 'src/ui/components/Header'
import { Box, Flex } from '@radix-ui/themes'
import { ReactNode } from 'src/utils/types/commons'
import { FullScreenSpinLoader } from 'src/ui/design-system/Spinner/SpinLoader'
import { useAuth } from 'src/utils/hooks/useAuth'
import { useEffect } from 'react'

interface UnauthenticatedAppProps extends ReactNode {
  isLoading?: boolean
}

const DashboardLayout = (props: UnauthenticatedAppProps) => {
  const [isAuthenticated, actions] = useAuth()

  useEffect(() => {
    if (!isAuthenticated) {
      actions.logout()
    }
  }, [isAuthenticated])

  return (
    <>
      <Flex className="bg-yellow-50" direction="column">
        <Flex direction="column" className="min-h-screen">
          <Header />
          <Box className="bg-layout-background h-screen">
            <Flex justify="center" align="center" className="h-full">
              {props.isLoading ? <FullScreenSpinLoader /> : props.children}
            </Flex>
          </Box>
        </Flex>
        <Footer />
      </Flex>
    </>
  )
}

export type { UnauthenticatedAppProps }

export { DashboardLayout }
