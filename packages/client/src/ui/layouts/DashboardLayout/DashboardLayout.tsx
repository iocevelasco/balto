import { Footer } from 'src/ui/components/Footer'
import { Header } from 'src/ui/components/Header'
import { Box, Flex } from '@radix-ui/themes'
import { useAuth } from 'src/utils/hooks/useAuth'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
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
              <Outlet />
            </Flex>
          </Box>
        </Flex>
        <Footer />
      </Flex>
    </>
  )
}

export { DashboardLayout }
