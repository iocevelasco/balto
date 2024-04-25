import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { googleAuthProvider, auth } from 'src/config/firebase/firebase'
import { signInWithPopup, signOut } from 'firebase/auth'
import { useAppDispatch, useAppSelector } from 'src/config/store'
import { selectIsAuth, userAuth, userLoadData } from 'src/config/store/slices/userSlice'
import { APP_BASE_ROUTES } from 'src/App'

export const OriginPathnameKey = 'originPathname'
export type LocationState = {
  state?: {
    [OriginPathnameKey]?: string
  }
}

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const authState = useAppSelector(selectIsAuth)
  const { state } = useLocation() as LocationState
  const navigate = useNavigate()

  const actions = useMemo(
    () => ({
      login: async () => {
        try {
          await signInWithPopup(auth, googleAuthProvider).then(() => { 
            dispatch(userAuth(true))
            dispatch(userLoadData({
              isAuth: true,
              name: auth.currentUser?.displayName,
              email: auth.currentUser?.email,
              photoURL: auth.currentUser?.photoURL,
              uid: auth.currentUser?.uid,
              token: auth.currentUser?.refreshToken,
            }))
          })
        } catch (error) {
          console.error(error)
        }
        if (state?.[OriginPathnameKey]) {
          navigate(state[OriginPathnameKey])
        }
      },
      logout: async () => {
          try {
            await signOut(auth).then(() => { 
              dispatch(userAuth(false))
            })
          } catch (error) {
            console.error(error)
          }
        navigate(APP_BASE_ROUTES.home)
      },
    }),
    [dispatch, navigate, state]
  )



  return [authState, actions] as [boolean, typeof actions]
}
