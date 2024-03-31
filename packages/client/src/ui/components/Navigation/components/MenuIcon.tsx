import { styled } from 'src/config/stitches'
import { Box } from 'src/ui/design-system/Box'
import type { IconProps } from 'src/ui/design-system/Icon'
import { Icon } from 'src/ui/design-system/Icon'

type MenuIconProps = IconProps & {
  notifications?: JSX.Element
}

const NotificationBadgeWrapper = styled('div', {
  // Put notification badge slightly over the button icon
  position: 'absolute',
  transform: 'translate(70%, -30%)',
})

function MenuIcon(props: MenuIconProps) {
  const { notifications, ...iconProps } = props
  if (notifications) {
    return (
      <Box display="flex" justifyContent="center">
        <NotificationBadgeWrapper>{notifications}</NotificationBadgeWrapper>
        <Icon css={{ justifySelf: 'center' }} {...iconProps} />
      </Box>
    )
  }
  return <Icon css={{ justifySelf: 'center' }} {...iconProps} />
}

export type { MenuIconProps }
export { MenuIcon }
