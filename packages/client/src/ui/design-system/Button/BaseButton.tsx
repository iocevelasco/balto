import type * as Stitches from '@stitches/react'
import tw from 'twin.macro'
import { styled } from 'src/config/stitches'

const BaseButton = styled('button', {
  ...tw`
    inline-flex
    justify-center
    items-center px-4 py-2
    text-neutral-700
    hover:bg-neutral-200
    text-base font-medium rounded-md
    active:(transform scale-95)
    `,
  // temporary disabling outlines until "we make beautiful ones"
  // focus:(outline-none ring-2 ring-offset-2 ring-neutral-500)

  '&': {
    svg: {
      pointerEvents: 'none',
    },
  },

  compoundVariants: [
    {
      css: tw`border-yellow-500`,
      tone: 'filterActive',
      variant: 'filter',
    },
    {
      css: tw`border-emerald-500`,
      tone: 'brandAccent',
      variant: 'ghost',
    },
    {
      css: tw`bg-emerald-200`,
      tone: 'brandAccent',
      variant: 'soft',
    },
    {
      css: tw`bg-white hover:bg-gray-50`,
      tone: 'white',
      variant: 'solid',
    },
    {
      css: tw`text-white bg-emerald-500 hover:bg-emerald-600`,
      tone: 'brandAccent',
      variant: 'solid',
    },
    {
      css: tw`border-critical-600`,
      tone: 'critical',
      variant: 'ghost',
    },
    {
      css: tw`bg-critical-300`,
      tone: 'critical',
      variant: 'soft',
    },
    {
      css: tw`text-white bg-critical-600 hover:bg-critical-700`,
      tone: 'critical',
      variant: 'solid',
    },
    {
      css: tw`border-caution-600`,
      tone: 'caution',
      variant: 'ghost',
    },
    {
      css: tw`bg-caution-300`,
      tone: 'caution',
      variant: 'soft',
    },
    {
      css: tw`text-white bg-caution-500 hover:bg-caution-600`,
      tone: 'caution',
      variant: 'solid',
    },
    {
      css: tw`border-neutral-600`,
      tone: 'neutral',
      variant: 'ghost',
    },
    {
      css: tw`bg-neutral-300`,
      tone: 'neutral',
      variant: 'soft',
    },
    {
      css: tw`text-white bg-neutral-600 hover:bg-neutral-700`,
      tone: 'neutral',
      variant: 'solid',
    },
    {
      css: tw`text-neutral-500 hover:bg-neutral-600`,
      isDisabled: true,
      link: false,
      variant: 'solid',
    },
    {
      css: tw`text-neutral-500 hover:(no-underline! cursor-not-allowed)`,
      isDisabled: true,
      link: true,
      variant: 'solid',
    },
    {
      css: tw`text-neutral-200 hover:bg-neutral-100`,
      isDisabled: true,
      variant: 'soft',
    },
    {
      css: tw`text-neutral-200 hover:bg-white`,
      isDisabled: true,
      variant: 'ghost',
    },
    {
      css: tw`text-neutral-200 hover:bg-transparent`,
      isDisabled: true,
      variant: 'transparent',
    },
    {
      css: tw`text-emerald-400 hover:bg-emerald-500`,
      isDisabled: true,
      tone: 'brandAccent',
      variant: 'solid',
    },
    {
      css: tw`text-emerald-300 hover:bg-emerald-200`,
      isDisabled: true,
      tone: 'brandAccent',
      variant: 'soft',
    },
    {
      css: tw`text-emerald-200 hover:bg-white`,
      isDisabled: true,
      tone: 'brandAccent',
      variant: 'ghost',
    },
    {
      css: tw`text-emerald-200 hover:bg-transparent`,
      isDisabled: true,
      tone: 'brandAccent',
      variant: 'transparent',
    },
    {
      css: tw`text-critical-500 hover:bg-critical-600`,
      isDisabled: true,
      tone: 'critical',
      variant: 'solid',
    },
    {
      css: tw`text-critical-400 hover:bg-critical-300`,
      isDisabled: true,
      tone: 'critical',
      variant: 'soft',
    },
    {
      css: tw`text-critical-200 hover:bg-white`,
      isDisabled: true,
      tone: 'critical',
      variant: 'ghost',
    },
    {
      css: tw`text-critical-200 hover:bg-transparent`,
      isDisabled: true,
      tone: 'critical',
      variant: 'transparent',
    },
    {
      css: tw`text-caution-300 hover:bg-caution-500`,
      isDisabled: true,
      tone: 'caution',
      variant: 'solid',
    },
    {
      css: tw`text-caution-400 hover:bg-caution-300`,
      isDisabled: true,
      tone: 'caution',
      variant: 'soft',
    },
    {
      css: tw`text-caution-200 hover:bg-white`,
      isDisabled: true,
      tone: 'caution',
      variant: 'ghost',
    },
    {
      css: tw`text-caution-200 hover:bg-transparent`,
      isDisabled: true,
      tone: 'caution',
      variant: 'transparent',
    },
    {
      css: tw`p-0 bg-transparent text-info-500 shadow-none hover:(bg-transparent underline) active:underline focus:ring-transparent`,
      link: true,
      variant: 'solid',
    },
    {
      color: 'brandAccent',
      css: tw`text-emerald-500`,
      variant: 'solid',
    },
    {
      color: 'caution',
      css: tw`text-caution-500`,
      variant: 'solid',
    },
    {
      color: 'clovisNavy',
      css: tw`text-slate-900`,
      variant: 'solid',
    },
    {
      color: 'clovisRed',
      css: tw`text-rose-500`,
      variant: 'solid',
    },
    {
      color: 'critical',
      css: tw`text-critical-500`,
      variant: 'solid',
    },
    {
      color: 'info',
      css: tw`text-info-500`,
      variant: 'solid',
    },
    {
      color: 'neutral',
      css: tw`text-neutral-500`,
      variant: 'solid',
    },
    {
      color: 'positive',
      css: tw`text-positive-500`,
      variant: 'solid',
    },
    {
      color: 'promote',
      css: tw`text-promote-500`,
      variant: 'solid',
    },
    {
      circular: true,
      css: { padding: '7px', width: '38px' },
      size: 'small',
    },
    {
      circular: true,
      css: { padding: '5px', width: '30px' },
      size: 'xsmall',
    },
    {
      circular: true,
      css: { padding: 0, width: '$buttonHeight' },
      size: 'standard',
    },
    {
      circular: true,
      css: { padding: 0, width: '50px' },
      size: 'large',
    },
    {
      circular: true,
      css: { padding: 0, width: '56px' },
      size: 'xlarge',
    },
    {
      circular: true,
      css: tw`text-white hover:bg-neutral-700`,
      variant: 'solid',
    },
    {
      circular: true,
      css: tw`hover:bg-emerald-700`,
      tone: 'brandAccent',
      variant: 'solid',
    },
    {
      circular: true,
      css: tw`hover:bg-critical-700`,
      tone: 'critical',
      variant: 'solid',
    },
    {
      css: tw`inline-flex`,
      truncate: true,
      width: 'auto',
    },
    {
      color: 'white',
      css: tw`border-neutral-100 hover:bg-opacity-20`,
      variant: 'ghost',
    },
    {
      color: 'white',
      css: tw`hover:bg-opacity-20`,
      variant: 'transparent',
    },
    {
      color: 'white',
      css: tw`bg-neutral-100 text-neutral-700 hover:bg-neutral-200`,
      variant: 'solid',
    },
    {
      color: 'white',
      css: tw`bg-neutral-100 text-neutral-700 hover:bg-neutral-200`,
      variant: 'soft',
    },
    {
      circular: true,
      css: tw`shadow-none`,
      variant: 'transparent',
    },
    {
      circular: true,
      css: tw`shadow-md`,
      variant: 'solid',
    },
  ],
  defaultVariants: {
    opacity: 'full',
    size: 'standard',
    variant: 'solid',
  },
  variants: {
    borderWidth: {
      medium: tw`!border-2`,
      thick: tw`border-4`,
      thin: tw`border`,
    },
    circular: {
      true: tw`justify-center border border-transparent
      rounded-full shadow-sm text-neutral-700`,
    },
    color: {
      brandAccent: tw`text-emerald-500`,
      caution: tw`text-caution-500`,
      clovisNavy: tw`text-slate-900`,
      clovisRed: tw`text-rose-500`,
      critical: tw`text-critical-500`,
      info: tw`text-blue-400`,
      neutral: tw`text-neutral-500`,
      positive: tw`text-positive-500`,
      promote: tw`text-promote-500`,
      secondary: tw`text-gray-500`,
      secondaryLight: tw`text-gray-300`,
      white: tw`text-neutral-100`,
    },
    isDisabled: {
      true: tw`cursor-default`,
    },
    link: {
      true: tw``,
    },
    loading: {
      true: tw``,
    },
    opacity: {
      full: tw`bg-opacity-100`,
      light: tw`bg-opacity-60`,
    },
    rotateLeadingIcon: {
      180: {
        '& .leadingIcon': { transform: 'rotate(180deg)' },
      },
      270: {
        '& .leadingIcon': { transform: 'rotate(270deg)' },
      },
      90: {
        '& .leadingIcon': { transform: 'rotate(90deg)' },
      },
    },
    rounded: {
      true: tw`rounded-full`,
    },
    size: {
      large: { ...tw`text-base px-6`, minHeight: '50px' },
      small: { ...tw`text-sm px-3`, minHeight: '38px' },
      standard: { ...tw`text-base px-4`, minHeight: '$buttonHeight' },
      xlarge: { ...tw`text-lg px-6`, minHeight: '56px' },
      xsmall: { ...tw`text-sm px-2`, minHeight: '30px' },
    },
    tone: {
      // temporary disabling outlines until "we make beautiful ones"
      brandAccent: tw`text-emerald-500 hover:bg-emerald-200`, // focus:ring-emerald-500!`,
      caution: tw`text-caution-600 hover:bg-caution-300`, // focus:ring-caution-600!`,
      critical: tw`text-critical-600 hover:bg-critical-300`,
      filterActive: tw`text-yellow-500 bg-white hover:bg-caution-100 hover:bg-opacity-50`,
      neutral: tw`text-neutral-600 hover:bg-neutral-300`,
      white: tw`text-black hover:bg-gray-50`,
    },
    truncate: {
      true: {
        display: 'inline-block',
        overflow: 'hidden',
        textAlign: 'left',
        textDecoration: 'none',
        textOverflow: 'ellipsis',
        width: '100%',
      },
    },
    variant: {
      filter: tw`border border-neutral-300 shadow-sm`,
      ghost: tw`border border-neutral-300 shadow-sm`,
      soft: tw`border border-transparent bg-neutral-100`,
      solid: tw`border border-transparent shadow-sm text-white bg-neutral-600 hover:bg-neutral-700`,
      text: {
        color: 'inherit',
        ...tw`p-0 bg-transparent shadow-none hover:(bg-transparent no-underline) focus:ring-transparent`,
      },
      transparent: tw`border border-transparent bg-transparent`,
    },
    width: {
      auto: tw`w-auto`,
      full: tw`w-full`,
    },
  },
})

type BaseButtonProps = React.ComponentProps<typeof BaseButton>
type BaseButtonVariants = Stitches.VariantProps<typeof BaseButton>

export type { BaseButtonProps, BaseButtonVariants }
export { BaseButton }
