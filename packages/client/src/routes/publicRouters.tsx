import { Outlet } from 'react-router-dom'
import { routes } from 'src/routes/paths'
import { ErrorBoundary } from 'src/ui/components/ErrorBoundary/ErrorBoundary'
import { UnauthenticatedApp } from 'src/ui/layouts/UnauthenticatedApp'

const publicRouters = [
  {
    path: routes.public.home,
    element: (
      <UnauthenticatedApp>
        <Outlet />
      </UnauthenticatedApp>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        async lazy() {
          let { HomeScreen } = await import('../ui/pages/home/home')
          return { Component: HomeScreen }
        },
      },
      {
        path: routes.public.adoptionProcess.details.id,
        async lazy() {
          let { PetDetails } = await import('../ui/pages/adoptionProcess/petDetails/petDetails')
          return { Component: PetDetails }
        },
      },
      {
        path: routes.public.adoptionProcess.adoptionForm,
        async lazy() {
          let { AdoptionForm } = await import(
            '../ui/pages/adoptionProcess/adoptionForm/adoptionForm'
          )
          return { Component: AdoptionForm }
        },
      },
      {
        path: routes.public.registration.shelterForm,
        async lazy() {
          let { ShelterForm } = await import('../ui/pages/registration/shelterForm/shelterForm')
          return { Component: ShelterForm }
        },
      },
      {
        path: routes.public.registration.termsAndConditions,
        async lazy() {
          let { TermsAndConditions } = await import(
            '../ui/pages/registration/termsAndConditions/termsAndConditions'
          )
          return { Component: TermsAndConditions }
        },
      },
      {
        path: routes.public.registration.confirmation,
        async lazy() {
          let { Confirmation } = await import('../ui/pages/registration/confirmation/confirmation')
          return { Component: Confirmation }
        },
      },
    ],
  },
]

export { publicRouters }
