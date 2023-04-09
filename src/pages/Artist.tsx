import React from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import AlbumResults from '../components/Album/AlbumResults';
import ArtistFront from '../components/Artist/ArtistFront';
import TopTracks from '../components/Artist/TopTracks';
import Album from './Album';
import Loading from '../components/Animate/Loading';

const Artist = () => {
  const data: any = useLoaderData();
  const { artist, topTracks, albums: albums } = data;
  // console.log(artist.images[0].url);

  return (
    <div className="w-full flex flex-col text-white">
      <React.Suspense fallback={<Loading />}>
        <Await resolve={artist}>
          {(loadedArtist) => {
            return (
              <>
                <ArtistFront
                  followers={loadedArtist.followers.total}
                  name={loadedArtist.name}
                  img={loadedArtist.images[0].url}
                />
              </>
            );
          }}
        </Await>
        <h1 className="font-bold text-3xl p-3">Popular</h1>
        <Await resolve={topTracks}>
          {(loadedTracks) => {
            return <TopTracks tracks={loadedTracks.tracks} />;
          }}
        </Await>
        <Await resolve={albums}>
          {(loadedAlbums) => {
            return (
              <>
                <h1 className="font-bold text-3xl p-3">
                  Albums by {artist.name}
                </h1>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 px-2 ">
                  <AlbumResults
                    albums={loadedAlbums.items.reduce((acc: any, curr: any) => {
                      if (curr.album_type === 'album') {
                        if (!acc.some((el: any) => el.name === curr.name)) {
                          acc.push(curr);
                        }
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
    </div>
  );
};

export default Artist;

export async function loader({ params }: { params: { id?: string } }) {
  const { id } = params;
  const artist = fetch(`https://api.spotify.com/v1/artists/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  const topTracks = fetch(
    `https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }
  );
  const albums = fetch(`https://api.spotify.com/v1/artists/${id}/albums`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });

  return {
    artist: artist.then((res) => res.json()),
    topTracks: topTracks.then((res) => res.json()),
    albums: albums.then((res) => res.json()),
  };
}
