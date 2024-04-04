import { PetCardContainer } from './CardPetContainer'
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
          md: '5',
          xl: '7',
        }}
        gap="3"
        rows="repeat(2, 1fr)"
      >
        {pets.map((pet) => (
          <PetCardContainer petDetails={pet} />
        ))}
      </Grid>
    </Container>
  )
}

export { PetList }
