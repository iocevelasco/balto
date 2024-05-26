import { Link } from 'react-router-dom'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from 'src/ui/design-system/AlertDialog'
import { ButtonWithIcon } from 'src/ui/design-system/Button'
import { LANDING_ROUTES } from 'src/App'
import { PawPrint } from 'lucide-react'

export function ModalConfirmCreateShelter() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <ButtonWithIcon
          icon={<PawPrint size={20} color="hsl(var(--primary))" />}
          variant="roundedWhite"
        >
          Continue as shelter
        </ButtonWithIcon>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Link to={LANDING_ROUTES.shelterForm}>
            <AlertDialogAction>Continue</AlertDialogAction>
          </Link>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
