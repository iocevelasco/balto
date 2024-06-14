import { routes } from 'src/routes/paths'
import { ErrorBoundary } from 'src/ui/components/ErrorBoundary/ErrorBoundary'
import { DashboardLayout } from 'src/ui/layouts/DashboardLayout'

const privateRoutes = [
  {
    path: routes.private.dashboard,
    element: <DashboardLayout />,
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
    ],
  },
]

export { privateRoutes }
