'use client'

import {  Container } from './MainLayout.style'
import { ReactNode } from 'react'

export type MainLayoutProps = {
  children: ReactNode | JSX.Element | JSX.Element[]
}


export function MainLayout({children}: MainLayoutProps) {
  return (
    <Container>
      {children}
    </Container>
  )
}
