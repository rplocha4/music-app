import { configureStore } from '@reduxjs/toolkit'
import playerReducer from './playerSlice'
import { spotifyApi } from './features/SpotifyApi'
import { setupListeners } from '@reduxjs/toolkit/query'
import { geniusApi } from './features/GeniusApi'
import { serverApi } from './features/ServerApi'
import userReducer from './userSlice'
import uiReducer from './uiSlice'

const store = configureStore({
  reducer: {
    player: playerReducer,
    ui: uiReducer,
    user: userReducer,
    [spotifyApi.reducerPath]: spotifyApi.reducer,
    [geniusApi.reducerPath]: geniusApi.reducer,
    [serverApi.reducerPath]: serverApi.reducer,

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }).concat(spotifyApi.middleware)
  .concat(geniusApi.middleware).concat(serverApi.middleware)

})
export type RootState = ReturnType<typeof store.getState>
export default store;

setupListeners(store.dispatch)