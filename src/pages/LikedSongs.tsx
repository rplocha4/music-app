import React from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Loading from '../components/Animate/Loading';
import TrackResultsSortable from '../components/Tracks/TrackResultsSortable';
const cookies = new Cookies();
const LikedSongs = () => {
  const data: any = useLoaderData();
  const { likedSongs } = data;
  return (
    <>
      <div>
        <h1 className="text-5xl font-bold text-white">Liked Songs</h1>
      </div>

      <React.Suspense fallback={<Loading />}>
        <Await resolve={likedSongs}>
          {(loadedLikedSongs: any) => {
            return (
              <TrackResultsSortable tracks={loadedLikedSongs.likedTracks} />
            );
          }}
        </Await>
      </React.Suspense>
    </>
  );
};

export default LikedSongs;

export async function loader({ params }: { params: { username: string } }) {
  const username = params.username;
  const res = fetch(
    `http://localhost:5000/api/likedTracks/${localStorage.getItem('USERNAME')}`
  );
  return defer({
    likedSongs: res.then((res) => res.json()),
  });
}
