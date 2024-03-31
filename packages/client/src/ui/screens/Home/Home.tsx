import { UnauthenticatedApp } from 'src/ui/layouts/UnauthenticatedApp'
import { PetList } from './components/PetsList'
import { Flex, Text } from '@radix-ui/themes'

function HomeScreen() {
  return (
    <UnauthenticatedApp>
      <Flex
        direction="column"
        gap="3"
        width="100%"
        p={{
          initial: '3',
          md: '5',
          lg: '7',
        }}
        style={{
          overflow: 'scroll',
        }}
      >
        <Text align="center" weight="medium">
          Dashboard
        </Text>
        <PetList />
      </Flex>
    </UnauthenticatedApp>
  )
}

export { HomeScreen }
