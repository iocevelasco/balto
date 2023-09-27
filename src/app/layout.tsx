import * as React from 'react'
import NavElementsData from '@/components/Navbar/MockNavData.json'
import { Footer, Navbar, type NavLinkData, ChatBot } from '@/components'
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry'
import { APP_ROOT_ID } from '@/utils/constants'
import getRalewayFont from '@/utils/functions/getRalewayFont'
import './globals.css'
import { Metadata } from 'next'

const raleway = getRalewayFont

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'ErDesarrollo',
    description: 'metadata.metaDescription',
    icons: {
      icon: './favicon.ico',
    },
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const NavMenuMockData = {
    TextCTA: 'Contact Sales',
  }

  return (
    <html lang="en" className={raleway.variable}>
      <body>
        <div id={APP_ROOT_ID}>
          <ThemeRegistry>
            <div className="main-container">
              <Navbar
                links={NavElementsData as Array<NavLinkData>}
                textCTA={NavMenuMockData.TextCTA}
              />
              {children}
              <Footer />
            </div>
            <ChatBot />
          </ThemeRegistry>
        </div>
      </body>
    </html>
  )
}
