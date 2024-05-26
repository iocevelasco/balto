import { Color, colorToHexValues } from 'src/config/colors/colors'
import React from 'react'
import { keyframes, styled } from 'src/config/stitches'

const rotation = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(359deg)' },
})

const SpinnerBody = styled('span', {
  animation: `${rotation} 0.6s linear infinite`,
  borderRadius: '50%',
  borderStyle: 'solid',
  boxSizing: 'border-box',
  defaultVariants: {
    tone: 'neutral',
  },
  display: 'block',
  left: 0,
  position: 'absolute',
  top: 0,
  variants: {
    tone: {
      brandAccent: {
        borderColor: colorToHexValues.get(Color.Emerald)?.light.background,
        borderTopColor: colorToHexValues.get(Color.Emerald)?.plain.background,
      },
      info: {
        borderColor: colorToHexValues.get(Color.Blue)?.light.background,
        borderTopColor: colorToHexValues.get(Color.Blue)?.plain.background,
      },
      neutral: {
        borderColor: colorToHexValues.get(Color.Gray)?.light.background,
        borderTopColor: colorToHexValues.get(Color.Gray)?.plain.background,
      },
    },
  },
})

const SpinnerWrapper = styled('div', {
  defaultVariants: {
    size: 'medium',
  },
  position: 'relative',
  variants: {
    size: {
      large: {
        height: 'calc($space$large * 1.5)',
        width: 'calc($space$large * 1.5)',
        [`& ${SpinnerBody}`]: {
          borderWidth: '4px',
          height: 'calc($space$large * 1.5)',
          width: 'calc($space$large * 1.5)',
        },
      },
      medium: {
        height: 'calc($space$medium * 1.5)',
        width: 'calc($space$medium * 1.5)',
        [`& ${SpinnerBody}`]: {
          borderWidth: '3px',
          height: 'calc($space$medium * 1.5)',
          width: 'calc($space$medium * 1.5)',
        },
      },
      small: {
        height: 'calc($space$small * 1.5)',
        width: 'calc($space$small * 1.5)',
        [`& ${SpinnerBody}`]: {
          borderWidth: '2px',
          height: 'calc($space$small * 1.5)',
          width: 'calc($space$small * 1.5)',
        },
      },
    },
  },
})

type SpinnerProps = React.ComponentProps<typeof SpinnerBody> &
  React.ComponentProps<typeof SpinnerWrapper>

const Spinner = (props: SpinnerProps) => {
  const { size } = props

  return (
    <SpinnerWrapper size={size}>
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    </SpinnerWrapper>
  )
}

export { Spinner }
