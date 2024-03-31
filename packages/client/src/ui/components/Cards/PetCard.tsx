import { Card, Text, Box, Inset, Strong } from '@radix-ui/themes'
import { Button } from 'src/ui/design-system/Button/Button'
import type { Pet } from 'src/utils/types/pet'

interface BaseCardProps {
  onClick: () => void
  children?: React.ReactNode | React.ReactNode[]
  thumbnail?: React.ReactNode
}

const BaseCard = (props: BaseCardProps) => {
  return (
    <Box>
      <Card size="2">
        <Inset clip="padding-box" side="top" pb="current">
          {props.thumbnail || <Box></Box>}
        </Inset>
        {props.children}
        <Button size="3" onClick={props.onClick}>
          Adopt
        </Button>
      </Card>
    </Box>
  )
}

interface PetCardProps {
  onClick: () => void
  petDetails: Pet
}

const PetCard = (props: PetCardProps) => {
  const image = (
    <img
      src={props.petDetails.image}
      alt={props.petDetails.name}
      style={{
        display: 'block',
        objectFit: 'cover',
        width: '100%',
        height: 140,
        backgroundColor: 'var(--gray-5)',
      }}
    />
  )

  return (
    <BaseCard thumbnail={image} onClick={props.onClick}>
      <Box>
        <Strong>{props.petDetails.name}</Strong>
        <Text>{props.petDetails.age}</Text>
        <Text>{props.petDetails.breed}</Text>
      </Box>
    </BaseCard>
  )
}

export { BaseCard, PetCard }
export type { BaseCardProps }
