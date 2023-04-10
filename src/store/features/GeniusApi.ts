import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const geniusApi = createApi({
  reducerPath: 'geniusApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://genius-song-lyrics1.p.rapidapi.com/',
  }),
  endpoints: (builder) => ({
    getSongId: builder.query({
      query: (params) => ({
        method: 'GET',
        url: `search?q=${params}&per_page=10&page=1`,
        headers: {
          'X-RapidAPI-Key':
            '8f5e49604amsh7932ebb0aefea30p1b4c3bjsn7ac20affb784',
          'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com',
        },
        // params: {
        //   q: params,
        //   per_page: '10',
        //   page: '1',
        // },
      }),
    }),
    getSongLyricks: builder.query({
      query: (params) => ({
        method: 'GET',
        url: `song/lyrics`,
        headers: {
          'X-RapidAPI-Key':
            '8f5e49604amsh7932ebb0aefea30p1b4c3bjsn7ac20affb784',
          'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com',
        },
        params: {
          id: params,
        },
      }),
    }),
  }),
});

export const { useGetSongIdQuery, useGetSongLyricksQuery } = geniusApi;
