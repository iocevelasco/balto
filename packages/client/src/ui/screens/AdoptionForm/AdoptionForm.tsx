import { FormWrapper } from './components/FormWrapper'
import { UnauthenticatedApp } from 'src/ui/layouts/UnauthenticatedApp'
import { Container, Flex, Text } from '@radix-ui/themes'

const AdoptionForm = () => {
  return (
    <UnauthenticatedApp>
      <Container size="3">
        <Flex direction="column" m="8" gap="3">
          <Text size="8">Adoption Form</Text>
          <FormWrapper />
        </Flex>
      </Container>
    </UnauthenticatedApp>
  )
}

export { AdoptionForm }
