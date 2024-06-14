import { Card, Text, Box, Inset, Flex } from '@radix-ui/themes'
import { MapPinIcon } from '@heroicons/react/24/solid'
import { Button } from 'src/ui/design-system/Button'
import type { Pet } from 'src/utils/types/pet'
import { Link } from 'react-router-dom'

interface BaseCardProps {
  redirectUrl: string
  children?: React.ReactNode | React.ReactNode[]
  thumbnail?: React.ReactNode
}

const BaseCard = (props: BaseCardProps) => {
  return (
    <Box>
      <Card size="2" className="hover:bg-yellow-100 hover:drop-shadow-lg border-transparent">
        <Flex gap="1" direction="column">
          <Inset clip="padding-box" className="h-96" side="top" pb="current">
            {props.thumbnail || <Box></Box>}
          </Inset>
          {props.children}
          <Link to={props.redirectUrl}>
            <Button className="mt-4">Adopt</Button>
          </Link>
        </Flex>
      </Card>
    </Box>
  )
}

interface PetCardProps {
  redirectUrl: string
  petDetails: Pet
}

const PetCard = (props: PetCardProps) => {
  const image = (
    <img
      src={props.petDetails.image}
      alt={props.petDetails.name}
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
    <BaseCard thumbnail={image} redirectUrl={props.redirectUrl}>
      <Flex direction="column">
        <Text weight="medium" size="6">
          {props.petDetails.name}
        </Text>
        <Flex gap="2">
          <Text>{props.petDetails.sex},</Text>
          <Text>Age {props.petDetails.age}</Text>
        </Flex>
        <Flex gap="2">
          <MapPinIcon className="w-4 text-orange-400" />
          <Text>{props.petDetails.location}</Text>
        </Flex>
      </Flex>
    </BaseCard>
  )
}

export { BaseCard, PetCard }
export type { BaseCardProps }
