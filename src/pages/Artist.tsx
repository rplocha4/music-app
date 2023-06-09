import React from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';
import AlbumResults from '../components/Album/AlbumResults';
import ArtistFront from '../components/Artist/ArtistFront';
import TopTracks from '../components/Artist/TopTracks';
import Album from './Album';
import { Artist as ArtistT } from '../types/types';

import Loading from '../components/Animate/Loading';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

import {
  useFollowArtistMutation,
  useUnfollowArtistMutation,
} from '../store/features/ServerApi';
import { useDispatch, useSelector } from 'react-redux';
import { showInfo } from '../store/uiSlice';
import ArtistsResults from '../components/Artist/ArtistsResults';
import { RootState } from '../store/store';
const Artist = () => {
  const data: any = useLoaderData();
  const {
    artist,
    topTracks,
    albums: albums,
    isFollowing,
    relatedArtists,
  } = data;
  const { username } = useSelector((state: RootState) => state.user);

  const [isFollowingState, setIsFollowingState] = React.useState(isFollowing);
  // console.log(artist.images[0].url);
  const [followArtist, followArtistResult] = useFollowArtistMutation();
  const [unFollowArtist, unFollowArtistResult] = useUnfollowArtistMutation();
  const dispatch = useDispatch();
  const unfollowArtistHandler = (artist: ArtistT) => {
    setIsFollowingState(false);
    unFollowArtist(artist).then((res: any) => {
      dispatch(showInfo(res.data.message));
    });
  };
  const followArtistHandler = (artist: ArtistT) => {
    setIsFollowingState(true);

    followArtist(artist).then((res: any) => {
      dispatch(showInfo(res.data.message));
    });
  };

  return (
    <div className="flex w-full flex-col text-white">
      <React.Suspense fallback={<Loading />}>
        <Await resolve={artist}>
          {(loadedArtist: ArtistT) => {
            return (
              <div className="">
                <ArtistFront
                  followers={loadedArtist.followers.total}
                  name={loadedArtist.name}
                  img={loadedArtist.images[0].url}
                />
                {username && (
                  <button
                    onClick={() =>
                      !isFollowingState
                        ? followArtistHandler(loadedArtist)
                        : unfollowArtistHandler(loadedArtist)
                    }
                    className="m-2 grow-0 rounded-md border border-gray-600 p-2 hover:border-white"
                  >
                    {isFollowingState ? 'FOLLOWING' : 'FOLLOW'}
                  </button>
                )}
              </div>
            );
          }}
        </Await>
        <h1 className="p-3 text-3xl font-bold">Popular</h1>
        <Await resolve={topTracks}>
          {(loadedTracks) => {
            return <TopTracks tracks={loadedTracks.tracks} />;
          }}
        </Await>
        <Await resolve={albums}>
          {(loadedAlbums) => {
            return (
              <>
                <h1 className="p-3 text-3xl font-bold">Albums</h1>
                <div className="grid grid-cols-2 gap-5 px-2 md:grid-cols-3 lg:grid-cols-5 ">
                  <AlbumResults
                    albums={loadedAlbums.items.reduce((acc: any, curr: any) => {
                      if (!acc.some((el: any) => el.name === curr.name)) {
                        acc.push(curr);
                      }
                      return acc;
                    }, [])}
                  />
                </div>
              </>
            );
          }}
        </Await>
      </React.Suspense>
      <React.Suspense fallback={<Loading />}>
        <h1 className="p-3 text-3xl font-bold">Related Artists</h1>
        <div className="grid grid-cols-1 gap-5 px-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          <Await resolve={relatedArtists}>
            {(loadedRelatedArtists: { artists: ArtistT[] }) => {
              return (
                <ArtistsResults
                  artists={loadedRelatedArtists.artists.map(
                    (artist: any) => artist
                  )}
                />
              );
            }}
          </Await>
        </div>
      </React.Suspense>
    </div>
  );
};

export default Artist;

export async function loader({ params }: { params: { id?: string } }) {
  const { id: artistId } = params;
  let isFollowing = false;

  const username = localStorage.getItem('USERNAME');
  if (username) {
    const res = await fetch(
      `https://music-backend-2hi1.onrender.com/api/isFollowingArtist/${username}/${artistId}`
    );
    try {
      const data = await res.json();
      isFollowing = data.isFollowing;
    } catch (err) {
      // console.log(err);
    }
  }

  const artist = fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  const topTracks = fetch(
    `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }
  );
  const albums = fetch(
    `https://api.spotify.com/v1/artists/${artistId}/albums`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }
  );
  const relatedArtists = fetch(
    `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }
  );

  return defer({
    artist: artist.then((res) => res.json()),
    topTracks: topTracks.then((res) => res.json()),
    albums: albums.then((res) => res.json()),
    relatedArtists: relatedArtists.then((res) => res.json()),
    isFollowing,
  });
}
