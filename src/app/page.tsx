import { Grid } from '@mui/material'
import { ReactComponent as ArrowDownLarge } from '@/assets/Icons/Navigation/ArrowDownLarge.svg'
import { AddPetForm } from '@components/AddPetForm'
import { PetsList } from '@components/PetsList'

export default function HomePage() {
  return (
    <Grid>
      <PetsList/>
      <AddPetForm/>
    </Grid>
  )
}
