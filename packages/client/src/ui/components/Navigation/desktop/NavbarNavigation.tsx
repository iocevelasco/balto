import tw from 'twin.macro'
import { styled } from 'src/config/stitches'
import type { NavigationComponentProps } from '../Navigation'
import { NavigationButton } from './NavigationButton'

const StyledRoot = styled('ul', {
  ...tw`w-full flex`,
  gap: '$xxsmall',
  padding: '$xxsmall',
})

function NavbarNavigation(props: NavigationComponentProps) {
  return (
    <>
      <StyledRoot>
        {props.tabs.map((tab, index) => (
          <NavigationButton key={index} {...tab} />
        ))}
      </StyledRoot>
    </>
  )
}

export { NavbarNavigation }
