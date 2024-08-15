# Monorepo with React and Vite

This monorepo houses a React project using Vite and follows a monorepo architecture. The monorepo structure allows for shared code and dependencies management across multiple projects.

## Project Structure

|-- packages/
| |-- client/ # All relative with Client and UI
| |-- server/ # Backend archives
|-- package.json
|-- yarn.lock
|-- vite.config.js
|-- README.md

## Getting Started

1. Clone the repository:

```bash
git clone <repository-url>
cd Balto

Install dependencies:
yarn install

# React Project (client)
Development
To start the React project in development mode:

yarn workspace client dev
Open http://localhost:8080 in your browser to view the app.


