import { lazy, Suspense, useContext } from 'react'
import { Route, Routes, createBrowserRouter } from 'react-router-dom'
import { UNSAFE_RouteContext as RouteContext } from 'react-router'
import { FullScreenSpinLoader } from 'src/ui/design-system/Spinner/SpinLoader'
import { routes } from 'src/utils/constants/routes'
import { ErrorBoundary } from './ui/components/ErrorBoundary/ErrorBoundary'

const HomeScreen = lazy(() =>
  import('./ui/routes/home/home').then((m) => ({
    default: m.HomeScreen,
  }))
)

const AdoptionForm = lazy(() =>
  import('./ui/routes/adoptionProcess/adoptionForm/adoptionForm').then((m) => ({
    default: m.AdoptionForm,
  }))
)

const PetDetail = lazy(() =>
  import('./ui/routes/adoptionProcess/petDetails/petDetails').then((m) => ({
    default: m.PetDetails,
  }))
)

const ShelterForm = lazy(() =>
  import('./ui/routes/registration/shelterForm/shelterForm').then((m) => ({
    default: m.ShelterForm,
  }))
)

const ShelterProfile = lazy(() =>
  import('./ui/routes/shelter/profile/profile').then((m) => ({
    default: m.ShelterProfile,
  }))
)

const NotFound = lazy(() =>
  import('./ui/routes/notFound/notFound').then((m) => ({
    default: m.NotFound,
  }))
)

const TermsAndConditions = lazy(() =>
  import('./ui/routes/registration/termsAndConditions/termsAndConditions').then((m) => ({
    default: m.TermsAndConditions,
  }))
)

const Confirmation = lazy(() =>
  import('./ui/routes/registration/confirmation/confirmation').then((m) => ({
    default: m.Confirmation,
  }))
)

const router = createBrowserRouter([
  {
    path: routes.public.home,
    element: (
      <Suspense fallback={<FullScreenSpinLoader />}>
        <HomeScreen />
      </Suspense>
    ),
    errorElement: <ErrorBoundary />,
  },
])

const RootApp = () => {
  const contextValue = useContext(RouteContext)
  return (
    <Suspense fallback={<FullScreenSpinLoader />}>
      <RouteContext.Provider value={contextValue}>
        <Routes>
          <Route path={routes.public.home} element={<HomeScreen />} />
          <Route path={routes.public.registration.root}>
            <Route path={routes.public.registration.shelterForm} element={<ShelterForm />} />
            <Route
              path={routes.public.registration.termsAndConditions}
              element={<TermsAndConditions />}
            />
            <Route
              path={routes.public.registration.termsAndConditions}
              element={<Confirmation />}
            />
          </Route>
          <Route path={routes.public.registration.root}>
            <Route path={routes.public.adoptionProcess.details.id} element={<PetDetail />} />
            <Route path={routes.public.adoptionProcess.adoptionForm} element={<AdoptionForm />} />
          </Route>
          <Route path={routes.private.dashboard} element={<ShelterProfile />} />
          <Route path={routes.public.all} element={<NotFound />} />
        </Routes>
      </RouteContext.Provider>
    </Suspense>
  )
}

export { RootApp as App, router }
