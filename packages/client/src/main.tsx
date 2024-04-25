import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import { Config } from './config'
import { App } from './App'
import store, { persistor } from 'src/config/store'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import { client } from './config/apollo/client'
import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import './globals.css'

void main()

async function main() {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <Provider store={store}>
            <PersistGate persistor={persistor}>
              <Config>
                <Theme radius="full" accentColor="amber">
                  <App />
                </Theme>
              </Config>
            </PersistGate>
          </Provider>
        </ApolloProvider>
      </BrowserRouter>
    </React.StrictMode>
  )
}
