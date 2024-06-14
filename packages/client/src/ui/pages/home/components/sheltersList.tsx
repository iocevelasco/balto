import { PetCardContainer } from './cardPetContainer'
import { Container, Flex, Grid, Text, Box, Inset } from '@radix-ui/themes'
import mocks from 'src/mocks/shelters-mock.json'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from 'src/ui/design-system/Card'

const shelters = mocks.shelters

const SheltersList = () => {
  return (
    <Container size="4">
      <Flex justify="center" p="5">
        <Text> Our Shelters </Text>
      </Flex>
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
        {shelters.map((shelter) => (
          <Card key={shelter.id}>
            <CardContent>
              <Inset clip="padding-box" className="h-96" side="top" pb="current">
                {shelter.image || <Box></Box>}
              </Inset>
              <CardTitle className="align-center">{shelter.name}</CardTitle>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Container>
  )
}

export { SheltersList }
