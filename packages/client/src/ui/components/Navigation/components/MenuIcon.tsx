import { Box, Flex } from '@radix-ui/themes'
import { styled } from 'src/config/stitches'

type MenuIconProps = {
  notifications?: JSX.Element
  children: JSX.Element
}

const NotificationBadgeWrapper = styled('div', {
  // Put notification badge slightly over the button icon
  position: 'absolute',
  transform: 'translate(70%, -30%)',
})

function MenuIcon(props: MenuIconProps) {
  const { notifications } = props
  if (notifications) {
    return (
      <Flex display="flex" justify="center">
        <NotificationBadgeWrapper>{notifications}</NotificationBadgeWrapper>
      </Flex>
    )
  }
  return <Box width="5">{props.children}</Box>
}

export type { MenuIconProps }
export { MenuIcon }
