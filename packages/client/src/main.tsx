import React from 'react'
import ReactDOM from 'react-dom/client'
import { Config } from './config'
import { App } from './App'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import { client } from './config/apollo/client'
import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import './index.css'

void main()

async function main() {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <Config>
            <Theme radius="full" accentColor="amber">
              <App />
            </Theme>
          </Config>
        </ApolloProvider>
      </BrowserRouter>
    </React.StrictMode>
  )
}
