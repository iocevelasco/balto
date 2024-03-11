import type * as Stitches from '@stitches/react'
import React from 'react'
import tw from 'twin.macro'
import type { CSS } from 'src/config/stitches'
import { styled } from 'src/config/stitches'
import { Divider } from '../Divider'

const StackWrapper = styled('div', {
  ...tw`grid`,

  defaultVariants: {
    align: 'left',
    space: 'small',
    width: 'full',
  },

  variants: {
    align: {
      center: tw`justify-items-center`,
      left: tw`justify-items-start`,
      right: tw`justify-items-end`,
    },
    space: {
      gutter: {
        gap: '$gutter',
      },
      large: {
        gap: '$large',
      },
      medium: {
        gap: '$medium',
      },
      none: {},
      small: {
        gap: '$small',
      },
      xlarge: {
        gap: '$xlarge',
      },
      xsmall: {
        gap: '$xsmall',
      },
      xxlarge: {
        gap: '$xxlarge',
      },
      xxsmall: {
        gap: '$xxsmall',
      },
    },
    width: {
      auto: tw`w-auto`,
      full: tw`w-full`,
    },
  },
})

const StackContent = styled('div', {
  ...tw`w-full min-w-0`,

  variants: {
    align: {
      center: tw`flex justify-center`,
      left: tw`flex justify-start`,
      right: tw`flex justify-end`,
    },
    space: {
      gutter: {
        '& > .divider': {
          marginBottom: '$gutter',
        },
      },
      large: {
        '& > .divider': {
          marginBottom: '$large',
        },
      },
      medium: {
        '& > .divider': {
          marginBottom: '$medium',
        },
      },
      none: {},
      small: {
        '& > .divider': {
          marginBottom: '$small',
        },
      },
      xlarge: {
        '& > .divider': {
          marginBottom: '$xlarge',
        },
      },
      xsmall: {
        '& > .divider': {
          marginBottom: '$xsmall',
        },
      },
      xxlarge: {
        '& > .divider': {
          marginBottom: '$xxlarge',
        },
      },
      xxsmall: {
        '& > .divider': {
          marginBottom: '$xxsmall',
        },
      },
    },
  },
})

type StackProps = {
  children: React.ReactNode | React.ReactNode[]
  align?: Stitches.VariantProps<typeof StackWrapper>['align']
  space?: Stitches.VariantProps<typeof StackWrapper>['space']
  dividers?: boolean | 'strong'
  width?: Stitches.VariantProps<typeof StackWrapper>['width']
  css?: CSS
}

/* !Warning: rendering conditions can't be put inside <stack children components because <Stack creates void divs 
  even if components returns null, creating unecessary margins */
const Stack = React.forwardRef(function Stack(props: StackProps, ref: React.Ref<HTMLDivElement>) {
  return (
    <StackWrapper
      align={props.align}
      space={props.space ?? 'none'}
      width={props.width}
      css={props.css}
      ref={ref}
    >
      {Array.isArray(props.children) ? (
        props.children.length > 0 &&
        props.children
          /* filter to prevent not rendered children from adding space */
          .filter((child) => Boolean(child))
          .map((child, index) => {
            if (index === 0) {
              return (
                <StackContent key={index} align={props.align}>
                  {child}
                </StackContent>
              )
            } else {
              return (
                <StackContent key={index} space={props.space} align={props.align}>
                  {props.dividers === true && <Divider className="divider" />}
                  {props.dividers === 'strong' && <Divider className="divider" weight="strong" />}
                  {child}
                </StackContent>
              )
            }
          })
      ) : (
        <>{props.children}</>
      )}
    </StackWrapper>
  )
})

export type { StackProps }
export { Stack }
