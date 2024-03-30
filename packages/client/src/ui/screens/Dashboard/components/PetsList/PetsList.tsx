import React from 'react'
import { BaseCard } from 'src/ui/components/Cards'
import mocks from 'mocks/pets.json'
import tw from 'twin.macro'
import { Box, Grid } from '@radix-ui/themes'

interface Pet {
  id: number
  name: string
  species: string
  breed: string
  age: number
  color: string
  image: string
}

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
      p={{
        initial: '3',
        md: '5',
        lg: '7',
      }}
      gap="3"
      rows="repeat(2, 1fr)"
    >
      {pets.map((pet) => (
        <BaseCard key={pet.id} {...pet} />
      ))}
    </Grid>
  )
}

export { PetList }
