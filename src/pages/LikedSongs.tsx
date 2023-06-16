import React, { useEffect } from 'react';
import {
  Await,
  Navigate,
  defer,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import Loading from '../components/Animate/Loading';
import TrackResultsSortable from '../components/Tracks/TrackResultsSortable';
import { RiHeartFill } from 'react-icons/ri';
import { useGetLikedTracksQuery } from '../store/features/ServerApi';
import { formatDuration } from '../utils';
import { useSelector } from 'react-redux';
import { showInfo } from '../store/uiSlice';
import { RootState } from '../store/store';

const LikedSongs = () => {
  // const data: any = useLoaderData();
  // const { likedSongs } = data;
  const { username } = useSelector((state: RootState) => state.user);
  if (!username) {
    return <Navigate to="/" replace />;
  }

  const { data, isLoading, refetch, isError } = useGetLikedTracksQuery(
    username,
    {
      skip: !username,
    }
  );
  const totalDuration =
    data?.likedTracks.reduce(
      (acc: number, item: any) => acc + item.track.duration_ms,
      0
    ) ?? 0;

  return (
    <div className="">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div
            className="flex justify-start p-5 text-white"
            style={{
              background:
                'linear-gradient(321deg, rgba(9,9,121,1) 37%, rgba(0,212,255,1) 100%)',
              boxShadow: `0px 0px 60px 5px rgba(9, 9, 121, 1)`,
            }}
          >
            <RiHeartFill
              size={200}
              className=" p-14 text-white"
              style={{
                background:
                  'linear-gradient(129deg, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)',
                boxShadow: `0px 0px 60px 5px rgba(9, 9, 121, 1)`,
              }}
            />
            <div className="ml-5 flex flex-col justify-between font-semibold">
              <p>Playlist</p>
              <h1 className="text-5xl font-bold text-white">Liked Songs</h1>
              <div className="flex gap-1 ">
                <p>{localStorage.getItem('USERNAME')}</p>
                <p className="font-extrabold">·</p>
                <p> {data.likedTracks.length} songs,</p>

                <p className="text-gray-400">{formatDuration(totalDuration)}</p>
              </div>
            </div>
          </div>
          {data && data.likedTracks.length !== 0 && (
            <TrackResultsSortable
              tracks={data.likedTracks}
              onDelete={() => {}}
            />
          )}
        </>
      )}
    </div>
  );
};

export default LikedSongs;

export async function loader({ params }: any) {
  // const res = fetch(
  //   `https://music-backend-2hi1.onrender.com/api/likedTracks/${localStorage.getItem('USERNAME')}`
  // );
  // return defer({
  //   likedSongs: res.then((res) => res.json()),
  // });
  return null;
}
