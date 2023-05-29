import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import Cookies from 'universal-cookie';
import { Album, Artist, TrackItem } from '../../types/types';
import { Song } from '../playerSlice';

export const serverApi = createApi({
  reducerPath: 'serverApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
  refetchOnReconnect: true,

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
    getLikedTracks: builder.query({
      query: (username) => `likedTracks/${username}`,
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
        createdBy:string;
        id: string;
      }) => ({
        url: `createPlaylist`,
        method: 'POST',
        body: { ...playlist },
      }),
    }),
    getUserPlaylists: builder.query<any,void>({
      query: () => `getUserPlaylists/${localStorage.getItem('ID')}`,
    }),
    addTrackToPlaylist: builder.mutation({
      query: ({playlistId,track}) => ({
        url: `addTrackToPlaylist/${playlistId}`,
        method: 'POST',
        body: { track },
      }),
    }),
    removeTrackFromPlaylist: builder.mutation({
      query: ({playlistId,trackId}) => ({
        url: `${playlistId}/songs/${trackId}`,
        method: 'delete',
        body: { trackId },
      }),
    }),
    getPlaylist: builder.query({
      query: (playlistId) => `playlists/${playlistId}`,
    }),

    followPlaylist: builder.mutation({
      query: (playlistId) => ({
        url: `${localStorage.getItem('ID')}/playlists/${playlistId}/follow`,
        method: 'POST',
      }),
    }),
    unfollowPlaylist: builder.mutation({
      query: (playlistId) => ({
        url: `${localStorage.getItem('ID')}/playlists/${playlistId}/unfollow`,
        method: 'PUT',
      }),
    }),

    followingPlaylist: builder.query({
      query: () => `${localStorage.getItem('ID')}/playlists/following`,
    }),
    isFollowingPlaylist: builder.query({
      query: (playlistId) => `${localStorage.getItem('ID')}/playlists/${playlistId}/following`,
    }),
    searchPlaylist: builder.query({
      query: (query) => `searchPlaylists/${query}`,
  }),
  deletePlaylist: builder.mutation({
    query: (playlistId) => ({
      url: `playlists/${playlistId}`,
      method: 'delete',
    }),
  }),
  searchUser: builder.query({
    query: (query) => `searchUser/${query}`,
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
  useRemoveTrackFromPlaylistMutation,
  useFollowPlaylistMutation,
  useFollowingPlaylistQuery,
  useUnfollowPlaylistMutation,
  useIsFollowingPlaylistQuery,
  useGetPlaylistQuery,
  useSearchPlaylistQuery,
  useLazySearchPlaylistQuery,
  useLazySearchUserQuery,
  useDeletePlaylistMutation,
  useSearchUserQuery,
} = serverApi;
