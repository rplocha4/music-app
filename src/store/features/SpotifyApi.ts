import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const spotifyApi = createApi({
  reducerPath: 'spotifyApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.spotify.com/v1/' }),
  endpoints: (builder) => ({
    getSongState: builder.query({
      query: () => ({
        url: `me/player`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
    }),
    playSongs: builder.mutation({
      query: (uris) => ({
        url: `me/player/play?device_id=${localStorage.getItem('device_id')}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: { uris },
      }),
    }),
    playContext: builder.mutation({
      query: (context_uri) => ({
        url: `me/player/play?device_id=${localStorage.getItem('device_id')}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: { context_uri },
      }),
    }),

    toggleShuffle: builder.mutation({
      query: (shuffle) => ({
        url: `me/player/shuffle?state=${shuffle}&device_id=${localStorage.getItem(
          'device_id'
        )}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
    }),
    seekToPosition: builder.mutation({
      query: (position) => ({
        url: `me/player/seek?position_ms=${position}&device_id=${localStorage.getItem(
          'device_id'
        )}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
    }),
    setPause: builder.mutation({
      query: () => ({
        url: `me/player/pause?device_id=${localStorage.getItem('device_id')}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
    }),
    setResume: builder.mutation({
      query: () => ({
        url: `me/player/play?device_id=${localStorage.getItem('device_id')}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
    }),
    setVolume: builder.mutation({
      query: (volume) => ({
        url: `me/player/volume?volume_percent=${volume}&device_id=${localStorage.getItem(
          'device_id'
        )}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          
        },
      }),
    }),
    getArtistInfo: builder.query({
      query: (artistId) => ({
        url: `artists/${artistId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
    }),
  }),
});

export const {
  useGetSongStateQuery,
  usePlaySongsMutation,
  useToggleShuffleMutation,
  useSeekToPositionMutation,
  useSetPauseMutation,
  useSetResumeMutation,
  useSetVolumeMutation,
  usePlayContextMutation,
  useGetArtistInfoQuery,
} = spotifyApi;
