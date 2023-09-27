import { CircularProgress } from '@mui/material'

export default function Loader() {
  return (
    <div className="flex items-center flex-col justify-center">
      <CircularProgress size="1rem" className="text-green-primary" />
    </div>
  )
}
