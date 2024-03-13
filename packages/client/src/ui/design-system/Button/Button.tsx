import type * as Polymorphic from '@radix-ui/react-polymorphic'
import * as React from 'react'
import tw from 'twin.macro'
import type { CSS } from 'src/config/stitches'
import { Box } from '../Box'
import type { IconProps } from '../Icon'
import { Icon, IconSize } from '../Icon'
import { Spinner } from '../Spinner'
import { Text } from '../Text'
import type { BaseButtonVariants } from './BaseButton'
import { BaseButton } from './BaseButton'

const ButtonSize = {
  LARGE: 'large',
  SMALL: 'small',
  STANDARD: 'standard',
  XLARGE: 'xlarge',
  XSMALL: 'xsmall',
} as const

const buttonSizeToIconSize = new Map([
  [ButtonSize.XSMALL, IconSize.SMALL],
  [ButtonSize.SMALL, IconSize.SMALL],
  [ButtonSize.STANDARD, IconSize.MEDIUM],
  [ButtonSize.LARGE, IconSize.LARGE],
  [ButtonSize.XLARGE, IconSize.XLARGE],
])

/* as prop is coming from polymorphic, we should refacto later to not use the depracated "as" */
type AsPolymorphicProp = any | 'button'

// eslint-disable-next-line @typescript-eslint/sort-type-union-intersection-members
type ButtonOwnProps = React.ComponentProps<'button'> &
  BaseButtonVariants & {
    css?: CSS
    children?: React.ReactNode
    loading?: boolean
    rotateLeadingIcon?: 90 | 180 | 270
    leadingIcon?: React.ReactNode
    trailingIcon?: React.ReactNode
    size?: typeof ButtonSize[keyof typeof ButtonSize]
    iconLabel?: string
    iconSize?: IconProps['size']
  }

const Button = React.forwardRef(function Button(props, ref) {
  const {
    disabled,
    leadingIcon,
    loading,
    trailingIcon,
    size: buttonSize = ButtonSize.STANDARD,
    iconLabel,
    iconSize,
    ...baseButtonProps
  } = props

  const iconSizeUsed = iconSize ?? buttonSizeToIconSize.get(buttonSize)
  const isAsLink =
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (props.as as AsPolymorphicProp)?.render?.displayName === 'Link'

  // TODO: only activate the loading state after 300ms to avoid flashes (with a React.useEffect)
  const isDisabled = disabled ?? loading

  const children = loading ? (
    <Spinner
      size={props.size === ButtonSize.LARGE ? 'medium' : 'small'}
      tone={props.tone === 'brandAccent' ? 'brandAccent' : 'neutral'}
    />
  ) : (
    props.children
  )

  return (
    <BaseButton
      {...baseButtonProps}
      ref={ref}
      isDisabled={isDisabled}
      disabled={isDisabled}
      size={buttonSize}
      role={isAsLink ? undefined : 'button'}
    >
      {leadingIcon && !loading && (
        <Box
          display="flex"
          paddingRight={children ? 'xsmall' : undefined}
          css={children ? tw`-ml-0.5` : undefined}
        >
          <Icon className="leadingIcon" size={iconSizeUsed} label={iconLabel ?? 'leading icon'}>
            {leadingIcon}
          </Icon>
        </Box>
      )}
      {props.circular ? (
        <Icon
          size={
            props.size === ButtonSize.XSMALL
              ? IconSize.XSMALL
              : props.size === ButtonSize.SMALL
              ? IconSize.SMALL
              : IconSize.MEDIUM
          }
          label={iconLabel ?? 'circular icon'}
        >
          {children}
        </Icon>
      ) : props.truncate ? (
        <Text weight="medium" size={props.size} truncate>
          {children}
        </Text>
      ) : (
        children
      )}
      {trailingIcon && !loading && (
        <Box display="flex" paddingRight="xsmall" css={tw`-mr-0.5`}>
          <Icon size={iconSizeUsed} label={iconLabel ?? 'trailing icon'}>
            {trailingIcon}
          </Icon>
        </Box>
      )}
    </BaseButton>
  )
}) as Polymorphic.ForwardRefComponent<'button', ButtonOwnProps>

type ButtonProps = ButtonOwnProps

export type { ButtonProps }
export { Button, ButtonSize }
