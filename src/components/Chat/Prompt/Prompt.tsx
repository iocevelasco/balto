import { CircularProgress, InputBase, InputBaseProps } from '@mui/material'
import { ReactComponent as ArrowUpIcon } from '@/assets/Icons/Navigation/ArrowUp.svg'

export interface PromptProps extends InputBaseProps {
  className?: string
  isLoading?: boolean
}

export const Prompt = ({ isLoading, ...rest }: PromptProps) => {
  return (
    <InputBase
      {...rest}
      multiline
      maxRows={8}
      fullWidth
      className="bg-white items-center rounded-md min-h-11 p-2.5"
      endAdornment={
        isLoading ? (
          <CircularProgress className="!text-gray-dark !w-4 !h-4" />
        ) : (
          <ArrowUpIcon className="!text-gray-dark !w-4 !h-4 cursor-pointer" />
        )
      }
    />
  )
}
