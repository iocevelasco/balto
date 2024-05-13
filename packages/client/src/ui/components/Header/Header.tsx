import { ReactComponent as Brand } from 'src/assets/brand/brand-white.svg'
import { Link } from 'react-router-dom'
import { Button } from 'src/ui/design-system/Button'
import { Box, Container, Flex } from '@radix-ui/themes'
import { useAuth } from 'src/utils/hooks/useAuth'
import { UserDrawer } from './components/UserDrawer'
import { PawPrint } from 'lucide-react'

function Header() {
  const [authState, actions] = useAuth()
  return (
    <Flex className="bg-yellow-400 sticky top-0 z-10 px-2">
      <Container size="4">
        <Box className="flex justify-between align-middle content-center">
          <Flex display="flex" justify="between" align="center">
            <Link to="/">
              <Brand className="h-16" />
            </Link>
          </Flex>
          <Flex display="flex" justify="between" align="center">
            {authState ? (
              <UserDrawer />
            ) : (
              <Button variant="roundedWhite" className="w-fit" onClick={actions.login}>
                <Flex gap="3" align="center" justify="between" className="w-full pl-4">
                  Sign up
                  <Box className="bg-transparent p-2 rounded-full">
                    <PawPrint size={20} color="hsl(var(--primary))" />
                  </Box>
                </Flex>
              </Button>
            )}
          </Flex>
        </Box>
      </Container>
    </Flex>
  )
}

export { Header }
