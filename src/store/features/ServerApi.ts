import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import Cookies from 'universal-cookie';    
import { Artist } from '../../types/types';
const cookies = new Cookies();

const username = cookies.get('USERNAME');

export const serverApi = createApi({
  reducerPath: 'serverApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
    endpoints: (builder) => ({
        followArtist: builder.mutation({
            query: (artist: Artist) => ({
                url: `followArtist/${username}`,
                method: 'POST',
                body: {artist},
            }),
        }),
        unfollowArtist: builder.mutation({
            query: (artistId: string) => ({
                url: `unfollowArtist/${username}`,
                method: 'POST',
                body: {artistId},
            }),
        }),


    })
})

export const { useFollowArtistMutation, useUnfollowArtistMutation  } = serverApi;