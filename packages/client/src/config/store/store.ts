import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import {
  navBarSliceReducer,
  userSliceReducer,
} from './slices'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['navBar'], // reducers that should not be persisted
  whitelist: ['user'], // reducers that will be persisted
}

const rootReducer = combineReducers({
  navBar: navBarSliceReducer,
  user: userSliceReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(),
})

export const storeFactory = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(),
  })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
