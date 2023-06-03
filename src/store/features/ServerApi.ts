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
      query: (artist: Artist) => ({
        url: `unfollowArtist/${localStorage.getItem('USERNAME')}`,
        method: 'POST',
        body: { artist },
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
      query: (album: Album) => ({
        url: `unlikeAlbum/${localStorage.getItem('USERNAME')}`,
        method: 'POST',
        body: { album },
      }),
    }),
    getLikedTracks: builder.query({
      query: (username) => `likedTracks/${username}`,
    }),
    isLikingTrack: builder.query({
      query: (id) => `isLikingTrack/${localStorage.getItem('USERNAME')}/${id}`,
    }),
    likeTrack: builder.mutation({
      query: (track: TrackItem | Song) => ({
        url: `likeTrack/${localStorage.getItem('USERNAME')}`,
        method: 'POST',
        body: { track },
      }),
    }),
    unlikeTrack: builder.mutation({
      query: (track: TrackItem | Song) => ({
        url: `unlikeTrack/${localStorage.getItem('USERNAME')}`,
        method: 'POST',
        body: { track },
      }),
    }),
    createPlaylist: builder.mutation({
      query: (playlist: {
        name: string;
        description: string;
        images: [{ url: string }];
        owner: { display_name: string };
        public: boolean;
        followers: { total: number };
        tracks: { items: []; total: number };
        createdBy: string;
        id: string;
      }) => ({
        url: `createPlaylist`,
        method: 'POST',
        body: { ...playlist },
      }),
    }),
    getUserPlaylists: builder.query<any, void>({
      query: () => `getUserPlaylists/${localStorage.getItem('ID')}`,
    }),
    addTrackToPlaylist: builder.mutation({
      query: ({ playlistId, track }) => ({
        url: `addTrackToPlaylist/${playlistId}`,
        method: 'POST',
        body: { track },
      }),
    }),
    removeTrackFromPlaylist: builder.mutation({
      query: ({ playlistId, trackId }) => ({
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
      query: (playlistId) =>
        `${localStorage.getItem('ID')}/playlists/${playlistId}/following`,
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
    setProfilePic: builder.mutation({
      query: (image) => ({
        url: `upload/${localStorage.getItem('ID')}`,
        method: 'POST',

        body: image,
      }),
    }),
    followUser: builder.mutation({
      query: ({ username, user }) => ({
        url: `followUser/${username}`,
        method: 'POST',
        body: { user },
      }),
    }),
    unfollowUser: builder.mutation({
      query: ({ username, user }) => ({
        url: `unfollowUser/${username}`,
        method: 'POST',
        body: { user },
      }),
    }),
    getPlaylistInfo: builder.query({
      query: (playlistId) => `getPlaylist/${playlistId}`,
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
  useSetProfilePicMutation,
  useFollowUserMutation,
  useUnfollowUserMutation,
  useGetPlaylistInfoQuery,
} = serverApi;
