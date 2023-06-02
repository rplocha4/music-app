import React from 'react';
import {
  useLazyGetRecentlyPlayedQuery,
  usePlaySongsMutation,
} from '../store/features/SpotifyApi';
import { useDispatch } from 'react-redux';
import TrackResults from '../components/Tracks/TrackResults';
import { TrackItem } from '../types/types';
import Loading from '../components/Animate/Loading';
import { BsPlayCircleFill } from 'react-icons/bs';
import { makeQueue } from '../store/playerSlice';

function RecentlyPlayed() {
  const [getRecentyPlayed] = useLazyGetRecentlyPlayedQuery();
  const [limit, setLimit] = React.useState(20);
  const [tracks, setTracks] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [playSongs] = usePlaySongsMutation();
  const dispatch = useDispatch();
  const [songUris, setSongUris] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (tracks.length === 0) return;
    const songUris = tracks.map((item: any) => item.track.uri);
    const uniqueSongUris = [...new Set(songUris)];
    setSongUris(uniqueSongUris);
  }, [tracks]);

  React.useEffect(() => {
    setLoading(true);
    getRecentyPlayed(limit).then((res) => {
      setTracks(res.data.items);
      setLoading(false);
    });
  }, [limit]);

  return (
    <div>
      <h1 className="p-3 text-4xl font-bold text-white">Recently Played</h1>
      <div className="flex flex-row gap-5 p-5">
        <button
          className={`${
            limit === 20 ? 'bg-zinc-400' : 'bg-zinc-600'
          } rounded-md p-2`}
          onClick={() => setLimit(20)}
        >
          Last 20
        </button>
        <button
          className={`${
            limit === 30 ? 'bg-zinc-400' : 'bg-zinc-600'
          } rounded-md p-2`}
          onClick={() => setLimit(30)}
        >
          Last 30
        </button>
        <button
          className={`${
            limit === 40 ? 'bg-zinc-400' : 'bg-zinc-600'
          } rounded-md p-2`}
          onClick={() => setLimit(40)}
        >
          Last 40
        </button>
        <button
          className={`${
            limit === 50 ? 'bg-zinc-400' : 'bg-zinc-600'
          } rounded-md p-2`}
          onClick={() => setLimit(50)}
        >
          Last 50
        </button>
      </div>
      <BsPlayCircleFill
        className="m-5 text-6xl text-green-500 hover:scale-110 hover:cursor-pointer hover:text-green-400"
        onClick={() => {
          playSongs(songUris);
          dispatch(
            makeQueue(
              tracks
                .map((item: any) => {
                  return {
                    ...item.track,
                  };
                })
                .reduce((acc: any, current: any) => {
                  const x = acc.find((item: any) => item.uri === current.uri);
                  if (!x) {
                    return acc.concat([current]);
                  } else {
                    return acc;
                  }
                }, [])
            )
          );
        }}
      />
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-5">
          <TrackResults
            tracks={tracks.map((track: { track: TrackItem }) => track.track)}
            showInfo={true}
          />
        </div>
      )}
    </div>
  );
}

export default RecentlyPlayed;
