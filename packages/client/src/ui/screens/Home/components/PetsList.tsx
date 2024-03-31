import React from 'react'
import { PetCardContainer } from './CardPetContainer'
import { Grid } from '@radix-ui/themes'
import type { Pet } from 'src/utils/types/pet'
import mocks from 'mocks/pets.json'

const pets: Pet[] = mocks.pets

const PetList = () => {
  return (
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
  )
}

export { PetList }
