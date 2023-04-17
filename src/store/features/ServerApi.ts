import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import Cookies from 'universal-cookie';
import { Album, Artist, TrackItem } from '../../types/types';
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
        body: { artist },
      }),
    }),
    unfollowArtist: builder.mutation({
      query: (artistId: string) => ({
        url: `unfollowArtist/${username}`,
        method: 'POST',
        body: { artistId },
      }),
    }),

    likeAlbum: builder.mutation({
      query: (album: Album) => ({
        url: `likeAlbum/${username}`,
        method: 'POST',
        body: { album },
      }),
    }),
    unlikeAlbum: builder.mutation({
      query: (albumId: string) => ({
        url: `unlikeAlbum/${username}`,
        method: 'POST',
        body: { albumId },
      }),
    }),
    getLikedTracks: builder.query<any, void>({
      query: () => `likedTracks/${username}`,
    }),
    isLikingTrack: builder.query({
      query: (id) => `isLikingTrack/${username}/${id}`,
    }),
    likeTrack: builder.mutation({
      query: (track: TrackItem) => ({
        url: `likeTrack/${username}`,
        method: 'POST',
        body: { track },
      }),
    }),
    unlikeTrack: builder.mutation({
      query: (trackId: string) => ({
        url: `unlikeTrack/${username}`,
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
        url: `createPlaylist/${username}`,
        method: 'POST',
        body: { playlist },
      }),
    }),
    getUserPlaylists: builder.query<any,void>({
      query: () => `getUserPlaylists/${username}`,
    }),
    addTrackToPlaylist: builder.mutation({
      query: ({playlistId,track}) => ({
        url: `addTrackToPlaylist/${username}`,
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
