import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { Stack } from 'src/ui/design-system/Stack'
import { Text } from 'src/ui/design-system/Text'
import { Navigation, type NavigationProps } from '../Navigation'
import { APP_BASE_ROUTES } from 'src/App'
import { matchPath } from 'react-router-dom'
import { Avatar } from '../Avatar/Avatar'
import { Flex } from '@radix-ui/themes'

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
    <Flex
      className="bg-yellow-400"
      style={{
        position: 'sticky',
        background: 'brand',
        height: '60px',
      }}
    >
      <Stack
        space="medium"
        css={{
          display: 'flex',
          alignContent: 'center',
          alignItems: 'center',
        }}
      >
        <Flex display="flex" justify="between" align="center"></Flex>
        <Text>header</Text>
        <Navigation tabs={tabs} />
        <Avatar />
      </Stack>
    </Flex>
  )
}

export { Header }
