import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import { Config } from './config'
import { router } from './App'
import store, { persistor } from 'src/config/store'
import { PersistGate } from 'redux-persist/integration/react'
import { RouterProvider } from 'react-router-dom'
import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import './globals.css'

void main()

async function main() {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Config>
            <Theme radius="full" accentColor="amber">
              <RouterProvider router={router} />
            </Theme>
          </Config>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  )
}
