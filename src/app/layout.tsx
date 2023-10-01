import * as React from 'react'
import { Footer } from '@components/Footer'
import { Navbar } from '@components/Navbar'
import ThemeRegistry from '@components/ThemeRegistry/ThemeRegistry'
import { APP_ROOT_ID } from '@utils/constants'
import getRalewayFont from '@utils/functions/getRalewayFont'
import './globals.css'
import { Metadata } from 'next'
import { Grid } from '@mui/material'
import { MainLayout } from '@layouts/MainLayout/MainLayout'
const raleway = getRalewayFont

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Patitas',
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

  return (
    <html lang="en" className={raleway.variable}>
      <body>
        <div id={APP_ROOT_ID}>
          <ThemeRegistry>
            <Grid>
              <Navbar />
                <MainLayout>
                {children}
                </MainLayout>
              <Footer />
            </Grid>
          </ThemeRegistry>
        </div>
      </body>
    </html>
  )
}
