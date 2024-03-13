import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { UNSAFE_RouteContext as RouteContext } from 'react-router'

const APP_BASE_ROUTES = {
  dashboard: '/',
  adoptionForm: '/form',
}

const Dashboard = React.lazy(() =>
  import('./ui/screens/Dashboard/Dashboard').then((m) => ({
    default: m.Dashboard,
  }))
)

const AdoptionForm = React.lazy(() =>
  import('./ui/screens/AdoptionForm/AdoptionForm').then((m) => ({
    default: m.AdoptionForm,
  }))
)

const PublicApp = () => {
  const contextValue = React.useContext(RouteContext)
  return (
    <React.Suspense fallback={'...loading'}>
      <RouteContext.Provider value={contextValue}>
        <Routes>
          <Route path={APP_BASE_ROUTES.dashboard} element={<Dashboard />} />
          <Route path={APP_BASE_ROUTES.adoptionForm} element={<AdoptionForm />} />
        </Routes>
      </RouteContext.Provider>
    </React.Suspense>
  )
}

export { PublicApp as App, APP_BASE_ROUTES }
