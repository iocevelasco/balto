import { Button } from '@/components/index'
import { Typography } from '@mui/material'
import { ReactComponent as ArrowDownLarge } from '@/assets/Icons/Navigation/ArrowDownLarge.svg'

export default function HomePage() {
  return (
    <div className="page-wrapper flex justify-center items-center">
      <div className="flex container flex-col gap-6 p-1 md:p-16 md:pt-8">
        <Typography
          variant="h1"
          className="!font-light text-gray-mid max-w-[45rem]"
        >
          We’re a Design First{' '}
          <span className="!font-semibold">AI Powered </span>
          Software Company
        </Typography>
        <Typography variant="subtitle1" className="text-black !font-light">
          The nearshore solution for your industry{' '}
          <span className="font-bold text-green-primary">FINTECH</span>
        </Typography>
        <Button
          variant="iconButton"
          className="w-[16rem]"
          endIcon={
            <ArrowDownLarge
              width="1rem"
              height="1rem"
              className="rotate-[270deg]"
            />
          }
        >
          Find out why
        </Button>
      </div>
    </div>
  )
}
