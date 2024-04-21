import { FormWrapper } from './components/FormWrapper'
import { UnauthenticatedApp } from 'src/ui/layouts/UnauthenticatedApp'
import { Box, Container, Flex, Text } from '@radix-ui/themes'
import { useLocation } from 'react-router-dom'
import { PetDetail } from './components/PetDetail'
import mocks from 'src/mocks/pet-detail.json'

const AdoptionForm = () => {
  const location = useLocation()
  console.log({ location })
  return (
    <UnauthenticatedApp>
      <Container size="3">
        <Flex direction="column" m="8" gap="3" className="m-2 md:m-8">
          <PetDetail />
          <Box className="bg-white p-4 md:p-8 rounded-lg">
            <FormWrapper />
          </Box>
        </Flex>
      </Container>
    </UnauthenticatedApp>
  )
}

export { AdoptionForm }
