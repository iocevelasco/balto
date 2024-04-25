import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { persistStore } from 'redux-persist'
import type { RootState, AppDispatch } from './store'
import { store } from './store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const persistor = persistStore(store)
export default store
export { storeFactory } from './store'
