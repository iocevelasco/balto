import { FormWrapper } from './components/formWrapper'
import { Box, Container, Flex, Text } from '@radix-ui/themes'
import { ShelterFormMessages } from './shelterForm.utils'

const ShelterForm = () => {
  return (
    <Container size="3">
      <Flex direction="column" m="8" gap="3" className="m-2 md:m-8">
        <Box>
          <Text>{ShelterFormMessages.Title}</Text>
        </Box>
        <Box className="bg-white p-4 md:p-8 rounded-lg">
          <FormWrapper />
        </Box>
      </Flex>
    </Container>
  )
}

export { ShelterForm }
