import { Text, Box, Inset, Flex } from '@radix-ui/themes'
import type { Pet } from 'src/utils/types/pet'
import { useState } from 'react'
import mocks from 'src/mocks/pet-detail.json'

const PetDetail = () => {
  const [pet, _] = useState<Pet>(mocks as Pet)
  const image = (
    <img
      src={pet.image}
      alt={pet.name}
      className="object-cover h-full"
      style={{
        display: 'block',
        objectFit: 'cover',
        width: '100%',
        backgroundColor: 'var(--gray-5)',
      }}
    />
  )

  return (
    <Box className="bg-white p-4 md:p-8 rounded-lg">
      <Flex gap="3" align="center" justify="center">
        <Inset clip="padding-box" className="h-16 rounded-full w-16" side="top" pb="current">
          {image || <Box></Box>}
        </Inset>
        <Flex direction="column" justify="center">
          <Text weight="medium" size="2">
            Start the adoption process for
          </Text>
          <Text weight="medium" size="8" color="orange">
            {pet.name}
          </Text>
        </Flex>
      </Flex>
    </Box>
  )
}

export { PetDetail }
