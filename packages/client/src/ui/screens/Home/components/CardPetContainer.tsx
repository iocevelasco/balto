import { useNavigate } from 'react-router-dom'
import { PetCard } from 'src/ui/components/Cards'
import type { Pet } from 'src/utils/types/pet'
import { LANDING_ROUTES } from 'src/App'

type PetContainerDetailProps = {
  petDetails: Pet
}

const PetCardContainer = (props: PetContainerDetailProps) => {
  const navigate = useNavigate()
  const onRedirectDetail = () => navigate(`${LANDING_ROUTES.petDetails}/${props.petDetails.id}`)
  return <PetCard petDetails={props.petDetails} onClick={onRedirectDetail} />
}

export { PetCardContainer }
export type { PetContainerDetailProps }
