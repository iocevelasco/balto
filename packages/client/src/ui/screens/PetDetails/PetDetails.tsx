import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Container, Flex, Text } from '@radix-ui/themes'
import { Button } from 'src/ui/components/Button'
import { useNavigate } from 'react-router-dom'
import { Tooltip, TooltipTrigger, TooltipContent } from '@radix-ui/react-tooltip'
import type { Pet } from 'src/utils/types/pet'
import mocks from 'src/mocks/pets.json'
import { UnauthenticatedApp } from 'src/ui/layouts/UnauthenticatedApp'
import { APP_BASE_ROUTES } from 'src/App'

const PetDetails = () => {
  const navigate = useNavigate()
  const goBack = () => navigate(`${APP_BASE_ROUTES.home}`)
  const { id: petId } = useParams<{ id: string }>()
  const [isLoaded, setIsLoaded] = useState(false)
  const [pet, setPet] = useState<Pet>({} as Pet)

  useEffect(() => {
    setIsLoaded(true)
    const pet = mocks.pets.find((pet) => pet.id === Number(petId)) as Pet
    setPet(pet)
  }, [])

  const onRedirectToForm = () => navigate(`/${APP_BASE_ROUTES.adoptionForm}`)

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  return (
    <UnauthenticatedApp>
      <Container size="4" m="5">
        <Flex direction="column" align="start" className="h-full">
          <Button onClick={goBack}>Go back</Button>
          <Flex align="start" className="h-full">
            <Box>
              <img
                src={pet?.image}
                alt={pet?.name}
                style={{ width: '200px', height: '200px', borderRadius: '50%' }}
              />
            </Box>
            <Box>
              <div>
                <Text size="6"> {pet?.name} </Text>
                <Text> ID: {pet?.id} </Text>
                <Text> Species: {pet?.species} </Text>
                <Text> Breed: {pet?.breed} </Text>
                <Text> Age: {pet?.age} </Text>
                <Text> Color: {pet?.color} </Text>
                <Text> Sex: {pet?.sex} </Text>
                <Text>
                  Location:
                  <Tooltip>
                    <TooltipTrigger>
                      <span style={{ color: 'blue', cursor: 'pointer' }}>{pet?.location}</span>
                    </TooltipTrigger>
                    <TooltipContent side="top" sideOffset={5}>
                      {pet?.location}
                    </TooltipContent>
                  </Tooltip>
                </Text>
              </div>
              <Button onClick={onRedirectToForm}>Start Adoption process</Button>
            </Box>
          </Flex>
        </Flex>
      </Container>
    </UnauthenticatedApp>
  )
}

export { PetDetails }
