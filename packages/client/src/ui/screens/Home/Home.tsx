import { UnauthenticatedApp } from 'src/ui/layouts/UnauthenticatedApp'
import { PetList } from './components/PetsList'
import { Flex, Text } from '@radix-ui/themes'
import { HeroBanner } from 'src/ui/components/HeroBanner'

function HomeScreen() {
  return (
    <UnauthenticatedApp>
      <HeroBanner
        headline="Find Your Perfect Companion at Our Pet Shelter"
        subheadline="Explore our lovingly cared for animals waiting for their forever homes. Adopt, don't shop, and make a difference in a pet's life today"
        backgroundImage="https://www.debt.com/es/wp-content/uploads/2020/01/8-Costs-to-Know-Before-Adopting-a-Pet.jpg"
      />
      <Flex
        direction="column"
        gap="3"
        width="100%"
        p={{
          initial: '3',
          md: '5',
          lg: '7',
        }}
      >
        <PetList />
      </Flex>
    </UnauthenticatedApp>
  )
}

export { HomeScreen }
