import { lazy } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { FullScreenSpinLoader } from './ui/design-system/Spinner/SpinLoader'
import { routes } from 'src/routes/paths'
import { publicRouters } from './routes/publicRouters'
import { privateRoutes } from './routes/privateRoutes'
import { ErrorBoundary } from './ui/components/ErrorBoundary/ErrorBoundary'

const commonRoutes = [
  {
    path: routes.public.all,
    errorElement: <ErrorBoundary />,
    async lazy() {
      let { NotFound } = await import('./ui/pages/notFound/notFound')
      return { Component: NotFound }
    },
  },
]

const router = createBrowserRouter([...publicRouters, ...commonRoutes, ...privateRoutes])

const App = () => {
  return <RouterProvider router={router} fallbackElement={<FullScreenSpinLoader />} />
}

export { App }
