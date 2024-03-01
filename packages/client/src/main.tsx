import React from 'react'
import ReactDOM from 'react-dom/client'
import { Config } from "./config";
import { App } from './App.tsx'
import './index.css'

void main();

async function main() {
  ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Config>
        <App />
      </Config>
  </React.StrictMode>,
);
}