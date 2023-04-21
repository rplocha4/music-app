import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import Cookies from 'universal-cookie';
import { Album, Artist, TrackItem } from '../../types/types';
import { Song } from '../playerSlice';

export const serverApi = createApi({
  reducerPath: 'serverApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
  endpoints: (builder) => ({
    followArtist: builder.mutation({
      query: (artist: Artist) => ({
        url: `followArtist/${localStorage.getItem('USERNAME')}`,
        method: 'POST',
        body: { artist },
      }),
    }),
    unfollowArtist: builder.mutation({
      query: (artistId: string) => ({
        url: `unfollowArtist/${localStorage.getItem('USERNAME')}`,
        method: 'POST',
        body: { artistId },
      }),
    }),

    likeAlbum: builder.mutation({
      query: (album: Album) => ({
        url: `likeAlbum/${localStorage.getItem('USERNAME')}`,
        method: 'POST',
        body: { album },
      }),
    }),
    unlikeAlbum: builder.mutation({
      query: (albumId: string) => ({
        url: `unlikeAlbum/${localStorage.getItem('USERNAME')}`,
        method: 'POST',
        body: { albumId },
      }),
    }),
    getLikedTracks: builder.query<any, void>({
      query: () => `likedTracks/${localStorage.getItem('USERNAME')}`,
    }),
    isLikingTrack: builder.query({
      query: (id) => `isLikingTrack/${localStorage.getItem('USERNAME')}/${id}`,
    }),
    likeTrack: builder.mutation({
      query: (track: TrackItem|Song) => ({
        url: `likeTrack/${localStorage.getItem('USERNAME')}`,
        method: 'POST',
        body: { track },
      }),
    }),
    unlikeTrack: builder.mutation({
      query: (trackId: string) => ({
        url: `unlikeTrack/${localStorage.getItem('USERNAME')}`,
        method: 'POST',
        body: { trackId },
      }),
    }),
    createPlaylist: builder.mutation({
      query: (playlist: {
        name: string;
        description: string;
        images: [{ url: string}];
        owner: { display_name: string };
        public: boolean;
        followers: { total: number };
        tracks: { items: [] , total: number};
        id: string;
      }) => ({
        url: `createPlaylist/${localStorage.getItem('USERNAME')}`,
        method: 'POST',
        body: { playlist },
      }),
    }),
    getUserPlaylists: builder.query<any,void>({
      query: () => `getUserPlaylists/${localStorage.getItem('USERNAME')}`,
    }),
    addTrackToPlaylist: builder.mutation({
      query: ({playlistId,track}) => ({
        url: `addTrackToPlaylist/${localStorage.getItem('USERNAME')}`,
        method: 'POST',
        body: { playlistId, track },
      }),
    }),
  }),
});

export const {
  useFollowArtistMutation,
  useUnfollowArtistMutation,
  useLikeAlbumMutation,
  useUnlikeAlbumMutation,
  useGetLikedTracksQuery,
  useLikeTrackMutation,
  useUnlikeTrackMutation,
  useIsLikingTrackQuery,
  useCreatePlaylistMutation,
  useGetUserPlaylistsQuery,
  useAddTrackToPlaylistMutation,
} = serverApi;
