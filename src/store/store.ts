import { configureStore } from '@reduxjs/toolkit'
import playerReducer from './playerSlice'
import { spotifyApi } from './features/SpotifyApi'
import { setupListeners } from '@reduxjs/toolkit/query'
import { shazamApi } from './features/ShazamApi'
import { geniusApi } from './features/GeniusApi'

const store = configureStore({
  reducer: {
    player: playerReducer,
    [spotifyApi.reducerPath]: spotifyApi.reducer,
    [shazamApi.reducerPath]: shazamApi.reducer,
    [geniusApi.reducerPath]: geniusApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }).concat(spotifyApi.middleware).concat(shazamApi.middleware)
  .concat(geniusApi.middleware),

})
export type RootState = ReturnType<typeof store.getState>
export default store;

setupListeners(store.dispatch)