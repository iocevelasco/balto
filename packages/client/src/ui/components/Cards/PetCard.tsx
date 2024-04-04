import { Card, Text, Box, Inset, Strong, Flex } from '@radix-ui/themes'
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
      <Card size="2" className="hover:bg-yellow-100 hover:drop-shadow-lg border-transparent">
        <Flex gap="1" direction="column">
          <Inset clip="padding-box" side="top" pb="current">
            {props.thumbnail || <Box></Box>}
          </Inset>
          {props.children}
          <Button size="3" m="2" onClick={props.onClick}>
            Adopt
          </Button>
        </Flex>
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
      <Flex gap="1" direction="column">
        <Strong>{props.petDetails.name}</Strong>
        <Flex gap="2">
          <Text>{props.petDetails.sex},</Text>
          <Text>Age {props.petDetails.age}</Text>
        </Flex>
        <Text>{props.petDetails.location}</Text>
      </Flex>
    </BaseCard>
  )
}

export { BaseCard, PetCard }
export type { BaseCardProps }
