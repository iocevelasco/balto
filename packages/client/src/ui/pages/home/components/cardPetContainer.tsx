import { PetCard } from 'src/ui/components/Cards'
import type { Pet } from 'src/utils/types/pet'
import { routes } from 'src/routes/paths'

type PetContainerDetailProps = {
  petDetails: Pet
}

const PetCardContainer = (props: PetContainerDetailProps) => {
  const petDetailUrl = `${routes.public.adoptionProcess.details.root}/${props.petDetails.id}`
  console.log({ petDetailUrl })
  return <PetCard petDetails={props.petDetails} redirectUrl={petDetailUrl} />
}

export { PetCardContainer }
export type { PetContainerDetailProps }
