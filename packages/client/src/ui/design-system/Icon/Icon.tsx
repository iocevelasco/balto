import * as AccessibleIcon from '@radix-ui/react-accessible-icon'
import type * as Stitches from '@stitches/react'
import * as React from 'react'
import tw from 'twin.macro'
import type { CSS } from 'src/config/stitches'
import { styled } from 'src/config/stitches'

const IconSize = {
  LARGE: 'large',
  MEDIUM: 'medium',
  SMALL: 'small',
  XLARGE: 'xlarge',
  XSMALL: 'xsmall',
  XXLARGE: 'xxlarge',
  XXSMALL: 'xxsmall',
} as const

const IconSvg = styled('svg', {
  defaultVariants: {
    size: 'medium',
  },
  variants: {
    color: {
      brandAccent: tw`text-emerald-500`,
      caution: tw`text-caution-500`,
      clovisNavy: tw`text-slate-900`,
      clovisRed: tw`text-rose-500`,
      critical: tw`text-critical-500`,
      info: tw`text-info-500`,
      neutral: tw`text-neutral-500`,
      neutralLight: tw`text-neutral-300`,
      positive: tw`text-positive-500`,
      promote: tw`text-promote-500`,
      white: tw`text-white`,
    },
    size: {
      large: tw`h-8 w-8`,
      medium: tw`h-6 w-6`,
      small: tw`h-5 w-5`,
      xlarge: tw`h-10 w-10`,
      xsmall: tw`h-4 w-4`,
      xxlarge: tw`h-12 w-12`,
      xxsmall: tw`h-3 w-3`,
    },
  },
})

const IconDiv = styled('div', {
  '& > svg': {
    height: 'inherit',
    width: 'inherit',
  },
  defaultVariants: {
    size: 'medium',
  },
  variants: {
    color: {
      brandAccent: tw`text-emerald-500`,
      caution: tw`text-caution-500`,
      clovisNavy: tw`text-slate-900`,
      clovisRed: tw`text-rose-500`,
      critical: tw`text-critical-500`,
      info: tw`text-info-500`,
      neutral: tw`text-neutral-500`,
      neutralLight: tw`text-neutral-300`,
      positive: tw`text-positive-500`,
      promote: tw`text-promote-500`,
      white: tw`text-white`,
    },
    size: {
      large: tw`h-8 w-8`,
      medium: tw`h-6 w-6`,
      small: tw`h-5 w-5`,
      xlarge: tw`h-10 w-10`,
      xsmall: tw`h-4 w-4`,
      xxlarge: tw`h-12 w-12`,
      xxsmall: tw`h-3 w-3`,
    },
  },
})

type IconSvgProps = Stitches.VariantProps<typeof IconSvg>
type IconDivProps = Stitches.VariantProps<typeof IconDiv>
type IconBaseProps = AccessibleIcon.AccessibleIconProps & {
  className?: string
  css?: CSS
  children: React.ReactNode
}
type IconVariantProps =
  | (IconDivProps & { svg?: false })
  | (IconSvgProps & { svg: true; viewBox?: string })

type IconProps = IconBaseProps & IconVariantProps

const Icon = (props: IconProps) => {
  const { label, svg, ...iconProps } = props
  return (
    <AccessibleIcon.Root label={label}>
      {svg ? <IconSvg {...iconProps} /> : <IconDiv {...iconProps} />}
    </AccessibleIcon.Root>
  )
}

export type { IconProps }
export { Icon, IconSize }
