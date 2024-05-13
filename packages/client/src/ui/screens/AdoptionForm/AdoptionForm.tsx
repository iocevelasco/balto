import { FormWrapper } from './components/FormWrapper'
import { UnauthenticatedApp } from 'src/ui/layouts/UnauthenticatedApp'
import { Box, Container, Flex } from '@radix-ui/themes'
import { PetDetail } from './components/PetDetail'

const AdoptionForm = () => {
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
