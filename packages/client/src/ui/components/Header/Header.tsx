import React from 'react'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { Box } from 'src/ui/design-system/Box'
import { Stack } from 'src/ui/design-system/Stack'
import { Text } from 'src/ui/design-system/Text'
import { Navigation, type NavigationProps } from '../Navigation'
import { APP_BASE_ROUTES } from 'src/App'
import { matchPath } from 'react-router-dom'

function Header() {
  const tabs: NavigationProps['tabs'] = [
    {
      active: !!matchPath(APP_BASE_ROUTES.dashboard, location.pathname),
      icon: <ChevronLeftIcon />,
      name: 'dashboard',
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
    <Box
      position="sticky"
      background="brand"
      css={{
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
        <Box display="flex" justifyContent="spaceBetween" alignItems="center"></Box>
        <Text>header</Text>
        <Navigation tabs={tabs} />
      </Stack>
    </Box>
  )
}

export { Header }
