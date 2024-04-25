import { HomeModernIcon } from '@heroicons/react/24/solid'
import { ReactComponent as Brand } from 'src/assets/brand/brand-white.svg'
import { Navigation, type NavigationProps } from '../Navigation'
import { APP_BASE_ROUTES } from 'src/App'
import { matchPath, useNavigate } from 'react-router-dom'
import { Avatar } from '../Avatar/Avatar'
import { Box, Button, Container, Flex } from '@radix-ui/themes'
import { useAuth } from 'src/utils/hooks/useAuth'
import { useAppSelector } from 'src/config/store'
import { selectUser } from 'src/config/store/slices'

function Header() {
  const [authState, actions] = useAuth()
  const userProps = useAppSelector(selectUser)
  const navigate = useNavigate()
  const tabs: NavigationProps['tabs'] = [
    {
      active: !!matchPath(APP_BASE_ROUTES.home, location.pathname),
      icon: <HomeModernIcon />,
      name: 'home',
      url: '/',
    },
  ]

  const onRedirectToForm = () => navigate('/')

  return (
    <Flex className="bg-yellow-400 sticky top-0 z-10">
      <Container size="4">
        <Box className="flex justify-between align-middle content-center">
          <Flex display="flex" justify="between" align="center">
            <button onClick={onRedirectToForm}>
              <Brand className="h-16" />
            </button>
          </Flex>
          <Navigation tabs={tabs} />
          {!authState && <Button onClick={actions.login}>Sign up</Button>}
          {authState && <Button onClick={actions.logout}>Log auth</Button>}
          <Flex display="flex" justify="between" align="center">
            <Avatar src={userProps?.photoURL || ''} />
          </Flex>
        </Box>
      </Container>
    </Flex>
  )
}

export { Header }
