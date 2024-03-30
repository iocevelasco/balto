import { Card, Text, Heading, Box, Inset, Strong } from '@radix-ui/themes'
import tw from 'twin.macro'

interface BaseCardProps {
  name: string
  species: string
  breed: string
  age: number
  color: string
  image: string
}

const BaseCard = ({ image, name, species, age }: BaseCardProps) => {
  return (
    <Box>
      <Card size="2">
        <Inset clip="padding-box" side="top" pb="current">
          <img
            src={image}
            alt={name}
            style={{
              display: 'block',
              objectFit: 'cover',
              width: '100%',
              height: 140,
              backgroundColor: 'var(--gray-5)',
            }}
          />
        </Inset>
        <Text as="p" size="3">
          <Box>
            <Strong>{name}</Strong>
            <Text>{age}</Text>
          </Box>
        </Text>
      </Card>
    </Box>
  )
}

export { BaseCard }
export type { BaseCardProps }
