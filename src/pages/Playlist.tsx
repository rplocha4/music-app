import React from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';
import Loading from '../components/Animate/Loading';
import TrackResults from '../components/Tracks/TrackResults';

const Playlist = () => {
  const data: any = useLoaderData();
  const { playlist } = data;

  return (
    <React.Suspense fallback={<Loading />}>
      <Await resolve={playlist}>
        {(loadedPlaylist: any) => {
          console.log(loadedPlaylist);
          return (
            <div className="w-full flex flex-col text-white p-5 gap-5">
              <div className="flex items-center justify-start h-full">
                <img
                  src={loadedPlaylist.images[0].url}
                  alt="album image"
                  className="rounded-md"
                  style={{ width: '200px', height: '200px' }}
                />
                <div className="flex flex-col px-5 justify-end gap-5 min-h-full">
                  <p>
                    {loadedPlaylist.public ? 'Public ' : 'Private '} Playlist
                  </p>
                  <p className="text-5xl font-bold">{loadedPlaylist.name}</p>
                  <p className="text-gray-400">{loadedPlaylist.description}</p>
                  <p className="text-gray-400 flex gap-2">
                    <span className="text-white">
                      Mady by {loadedPlaylist.owner.display_name}
                    </span>
                    <p className="font-extrabold">·</p>
                    <span>{loadedPlaylist.followers.total} followers</span>
                    <p className="font-extrabold">·</p>
                    <span>{loadedPlaylist.tracks.total} songs</span>
                  </p>
                </div>
              </div>
              <TrackResults
                tracks={loadedPlaylist.tracks.items.map((item: any) => {
                  return item.track;
                })}
                showInfo={true}
              />
            </div>
          );
        }}
      </Await>
    </React.Suspense>
  );
};

export default Playlist;

export async function loader({ params }: any) {
  const id = params.id;
  const res = fetch(`https://api.spotify.com/v1/playlists/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  return defer({
    playlist: res.then((res) => res.json()),
  });
}