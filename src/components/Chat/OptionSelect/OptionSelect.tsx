import { Button } from '@mui/material'

export interface OptionsProps {
  options: { label: string; value: string; onClick: () => void }[]
  value?: string | null
  className?: string
}

export const OptionSelect = ({ options, value, className }: OptionsProps) => {
  return (
    <div className={`flex flex-wrap gap-4 justify-evenly ${className}`}>
      {options.map((option, index) => (
        <Button
          className={`${
            value === option.value
              ? 'bg-green-darker text-black font-bold'
              : 'bg-gray-dark text-white font-normal'
          }`}
          onClick={option.onClick}
          key={index}
        >
          {option.label}
        </Button>
      ))}
    </div>
  )
}
