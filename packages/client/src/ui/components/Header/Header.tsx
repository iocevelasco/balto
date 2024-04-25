import { HomeModernIcon } from '@heroicons/react/24/solid'
import { googleAuthProvider, auth } from 'src/config/firebase/firebase'
import { signInWithPopup, signOut } from 'firebase/auth'
import { ReactComponent as Brand } from 'src/assets/brand/brand-white.svg'
import { Navigation, type NavigationProps } from '../Navigation'
import { APP_BASE_ROUTES } from 'src/App'
import { matchPath, useNavigate } from 'react-router-dom'
import { Avatar } from '../Avatar/Avatar'
import { Box, Button, Container, Flex } from '@radix-ui/themes'

function Header() {
  const navigate = useNavigate()
  const tabs: NavigationProps['tabs'] = [
    {
      active: !!matchPath(APP_BASE_ROUTES.home, location.pathname),
      icon: <HomeModernIcon />,
      name: 'home',
      url: '/',
    },
  ]
  const isAuth = auth?.currentUser?.getIdToken()
  console.log(isAuth)
  const onRedirectToForm = () => navigate('/')

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider)
    } catch (error) {
      console.error(error)
    }
  }

  const handleLogOut = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Flex className="bg-yellow-400 sticky top-0 z-10">
      <Container size="4">
        <Box className="flex justify-between align-middle content-center">
          <Flex display="flex" justify="between" align="center">
            <button onClick={onRedirectToForm}>
              <Brand className="h-16" />
            </button>
          </Flex>
          <Navigation tabs={tabs} />
          <Button onClick={handleSignInWithGoogle}>Sign up</Button>
          <Button onClick={handleLogOut}>Log out</Button>
          <Avatar />
        </Box>
      </Container>
    </Flex>
  )
}

export { Header }
