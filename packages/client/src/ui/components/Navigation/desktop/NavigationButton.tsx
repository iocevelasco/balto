import { Link } from 'react-router-dom'
import tw from 'twin.macro'
import { styled } from 'src/config/stitches'
import { Text } from 'src/ui/design-system/Text'
import { MenuIcon } from '../components/MenuIcon'
import type { NavbarButtonProps } from '../Navigation'

const StyledItem = styled('li', {
  ...tw`w-full`,
  '&:hover': {
    backgroundColor: '#ffffff70',
  },
  alignItems: 'center',
  borderRadius: '$space$1',
  color: '$white',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  minHeight: '$12',
  gap: '$xsmall',
  padding: '$xxsmall',
  textAlign: 'center',
  variants: {
    active: {
      true: {
        '&:hover': {
          backgroundColor: '$white',
        },
        backgroundColor: '$white',
        color: '$slate900',
      },
    },
  },
})

function NavigationButton(props: NavbarButtonProps) {
  return (
    <StyledItem active={props.active} as={Link} to={props.url}>
      <MenuIcon>{props.icon}</MenuIcon>
      <Text
        css={{
          fontSize: 'x-small',
          lineHeight: '1em',
          paddingTop: '$xsmall',
          textTransform: 'uppercase',
        }}
      >
        {props.name}
      </Text>
    </StyledItem>
  )
}

export { NavigationButton }
