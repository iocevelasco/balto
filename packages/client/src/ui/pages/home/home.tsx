import { UnauthenticatedApp } from 'src/ui/layouts/UnauthenticatedApp'
import { PetList } from './components/petsList'
import { Flex, Text } from '@radix-ui/themes'
import { HeroBanner } from 'src/ui/components/HeroBanner'
import { SheltersList } from './components/sheltersList'

function HomeScreen() {
  return (
    <>
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
        <SheltersList />
      </Flex>
    </>
  )
}

export { HomeScreen }
