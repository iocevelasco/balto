import { FormWrapper } from './components/FormWrapper'
import { UnauthenticatedApp } from 'src/ui/layouts/UnauthenticatedApp'
import { Box, Container, Flex, Text } from '@radix-ui/themes'

const AdoptionForm = () => {
  return (
    <UnauthenticatedApp>
      <Container size="3">
        <Flex direction="column" m="8" gap="3">
          <Text size="8">Adoption Form</Text>
          <Box className="bg-white p-8 rounded-lg">
            <FormWrapper />
          </Box>
        </Flex>
      </Container>
    </UnauthenticatedApp>
  )
}

export { AdoptionForm }
