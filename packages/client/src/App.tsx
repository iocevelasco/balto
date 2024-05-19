import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { UNSAFE_RouteContext as RouteContext } from 'react-router'

const APP_BASE_ROUTES = {
  home: '/',
  adoptionForm: 'form',
  petDetails: {
    root: 'pet',
    id: ':id',
  },
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

const PublicApp = () => {
  const contextValue = React.useContext(RouteContext)
  return (
    <React.Suspense fallback={'...loading'}>
      <RouteContext.Provider value={contextValue}>
        <Routes>
          <Route path={APP_BASE_ROUTES.home} element={<HomeScreen />} />
          <Route path={APP_BASE_ROUTES.adoptionForm} element={<AdoptionForm />} />
          <Route path={APP_BASE_ROUTES.shelterForm} element={<ShelterForm />} />
          <Route path={`${APP_BASE_ROUTES.petDetails}/:id`} element={<PetDetail />} />
        </Routes>
      </RouteContext.Provider>
    </React.Suspense>
  )
}

export { PublicApp as App, APP_BASE_ROUTES }
