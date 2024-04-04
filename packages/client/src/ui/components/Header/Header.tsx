import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { ReactComponent as Brand } from 'src/assets/brand/brand-white.svg'
import { Navigation, type NavigationProps } from '../Navigation'
import { APP_BASE_ROUTES } from 'src/App'
import { matchPath } from 'react-router-dom'
import { Avatar } from '../Avatar/Avatar'
import { Box, Container, Flex } from '@radix-ui/themes'

function Header() {
  const tabs: NavigationProps['tabs'] = [
    {
      active: !!matchPath(APP_BASE_ROUTES.home, location.pathname),
      icon: <ChevronLeftIcon />,
      name: 'home',
      url: '/',
    },
    {
      active: !!matchPath(APP_BASE_ROUTES.adoptionForm, location.pathname),
      icon: <ChevronLeftIcon />,
      name: 'form',
      url: '/form',
    },
  ]

  return (
    <Flex className="bg-yellow-400 sticky top-0 z-10">
      <Container size="4">
        <Box className="flex justify-between align-middle content-center">
          <Flex display="flex" justify="between" align="center">
            <Brand className="h-16" />
          </Flex>
          <Navigation tabs={tabs} />
          <Avatar />
        </Box>
      </Container>
    </Flex>
  )
}

export { Header }
