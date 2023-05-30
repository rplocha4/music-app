import React from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import ArtistsResults from '../components/Artist/ArtistsResults';
import AlbumResults from '../components/Album/AlbumResults';
import { defer } from 'react-router-dom';
import Loading from '../components/Animate/Loading';

function Home() {
  const data = useLoaderData();
  const { topArtists, newReleases }: any = data;

  return (
    <div className="flex flex-col gap-5 p-5 text-white">
      <React.Suspense fallback={<Loading />}>
        <Await resolve={topArtists}>
          {(loadedArtists) => {
            return (
              <>
                <h1 className="text-3xl font-bold">
                  Listen To your top Artists
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-5 px-2">
                  <ArtistsResults artists={loadedArtists.items} />
                </div>
              </>
            );
          }}
        </Await>
        <Await resolve={newReleases}>
          {(loadedReleases) => {
            return (
              <>
                <h1 className="text-3xl font-bold">Checkout newest releases</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 px-2">
                  <AlbumResults albums={loadedReleases.albums?.items} />
                </div>
              </>
            );
          }}
        </Await>
      </React.Suspense>
    </div>
  );
}

export default Home;

export function loader({ params }: any) {
  const topArtists = fetch(
    `https://api.spotify.com/v1/me/top/artists?limit=5&time_range=long_term`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }
  );

  const topTracks = fetch(
    `https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=long_term`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }
  );
  const newReleases = fetch(
    `https://api.spotify.com/v1/browse/new-releases?limit=5&country=US`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }
  );

  return defer({
    topArtists: topArtists.then((res) => res.json()),
    topTracks: topTracks.then((res) => res.json()),
    newReleases: newReleases.then((res) => res.json()),
  });
}
