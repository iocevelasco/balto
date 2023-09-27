import { Raleway } from 'next/font/google'

const getRalewayFont = Raleway({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-raleway',
})

export default getRalewayFont
