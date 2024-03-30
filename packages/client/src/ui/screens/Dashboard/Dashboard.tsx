import React from 'react'
import { Text } from 'src/ui/design-system/Text'
import { UnauthenticatedApp } from 'src/ui/layouts/UnauthenticatedApp'
import { PetList } from './components/PetsList/PetsList'
import { Flex } from '@radix-ui/themes'

function Dashboard() {
  return (
    <UnauthenticatedApp>
      <Flex
        direction="column"
        gap="3"
        width="100%"
        style={{
          overflow: 'scroll',
        }}
      >
        <Text truncate="noEllipsis" tone="black" weight="medium" size="xlarge">
          dashboard
        </Text>
        <PetList />
      </Flex>
    </UnauthenticatedApp>
  )
}

export { Dashboard }
