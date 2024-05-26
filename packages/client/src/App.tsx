import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { UNSAFE_RouteContext as RouteContext } from 'react-router'
import { FullScreenSpinLoader } from 'src/ui/design-system/Spinner/SpinLoader'

const DASHBOARD_ROUTES = {
  dashboard: 'dashboard',
  adoptionForm: 'shelter-profile',
}

const LANDING_ROUTES = {
  home: '/',
  adoptionForm: 'form',
  petDetails: 'pet/:id',
  shelterForm: 'shelter',
}

const HomeScreen = React.lazy(() =>
  import('./ui/screens/Home/Home').then((m) => ({
    default: m.HomeScreen,
  }))
)

const AdoptionForm = React.lazy(() =>
  import('./ui/screens/AdoptionForm/AdoptionForm').then((m) => ({
    default: m.AdoptionForm,
  }))
)

const PetDetail = React.lazy(() =>
  import('./ui/screens/PetDetails/PetDetails').then((m) => ({
    default: m.PetDetails,
  }))
)

const ShelterForm = React.lazy(() =>
  import('./ui/screens/ShelterForm/ShelterForm').then((m) => ({
    default: m.ShelterForm,
  }))
)

const ShelterProfile = React.lazy(() =>
  import('./ui/screens/ShelterProfile').then((m) => ({
    default: m.ShelterProfile,
  }))
)

const RootApp = () => {
  const contextValue = React.useContext(RouteContext)
  return (
    <React.Suspense fallback={<FullScreenSpinLoader />}>
      <RouteContext.Provider value={contextValue}>
        <Routes>
          <Route path={LANDING_ROUTES.home} element={<HomeScreen />} />
          <Route path={LANDING_ROUTES.adoptionForm} element={<AdoptionForm />} />
          <Route path={LANDING_ROUTES.shelterForm} element={<ShelterForm />} />
          <Route path={LANDING_ROUTES.petDetails} element={<PetDetail />} />
          <Route path={DASHBOARD_ROUTES.dashboard} element={<ShelterProfile />} />
        </Routes>
      </RouteContext.Provider>
    </React.Suspense>
  )
}

export { RootApp as App, LANDING_ROUTES, DASHBOARD_ROUTES }
