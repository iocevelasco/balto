import { PetCardContainer } from './cardPetContainer'
import { Container, Grid } from '@radix-ui/themes'
import type { Pet } from 'src/utils/types/pet'
import mocks from 'src/mocks/pets.json'

const pets: Pet[] = mocks.pets

const PetList = () => {
  return (
    <Container size="4">
      <Grid
        columns={{
          initial: '1',
          sm: '3',
          md: '4',
          xl: '5',
        }}
        gap={{
          initial: '1',
          sm: '2',
          md: '4',
          lg: '4',
        }}
        rows="repeat(2, 1fr)"
      >
        {pets.map((pet) => (
          <PetCardContainer key={pet.id} petDetails={pet} />
        ))}
      </Grid>
    </Container>
  )
}

export { PetList }
