import React from 'react';
import {
  useLazyGetTopTracksQuery,
  usePlaySongsMutation,
} from '../store/features/SpotifyApi';
import TrackResults from '../components/Tracks/TrackResults';
import Loading from '../components/Animate/Loading';
import { BsPlayCircleFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { makeQueue } from '../store/playerSlice';

function TopTracks() {
  const [getTopTracks] = useLazyGetTopTracksQuery();
  const [time_range, setTimeRange] = React.useState('short_term');
  const [tracks, setTracks] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [limit, setLimit] = React.useState(20);
  const [playSongs] = usePlaySongsMutation();
  const dispatch = useDispatch();

  React.useEffect(() => {
    setLoading(true);
    getTopTracks({ time_range, limit }).then((res) => {

      setTracks(res.data.items);
      setLoading(false);
    });
  }, [time_range, limit]);

  return (
    <div>
      <div>
        <h1 className="text-4xl font-bold p-3 mb-5 text-white">
          Your Top Tracks
        </h1>

        <div className="flex flex-row gap-5 p-5">
          <button
            className={`${
              time_range === 'short_term' ? 'bg-zinc-400' : 'bg-zinc-600'
            } p-2 rounded-md`}
            onClick={() => setTimeRange('short_term')}
          >
            Last Month
          </button>
          <button
            className={`${
              time_range === 'medium_term' ? 'bg-zinc-400' : 'bg-zinc-600'
            } p-2 rounded-md`}
            onClick={() => setTimeRange('medium_term')}
          >
            Last 6 Months
          </button>
          <button
            className={`${
              time_range === 'long_term' ? 'bg-zinc-400' : 'bg-zinc-600'
            } p-2 rounded-md`}
            onClick={() => setTimeRange('long_term')}
          >
            All Time
          </button>
          <button
            className={`
          ${limit === 20 ? 'bg-zinc-400' : 'bg-zinc-600'} p-2 rounded-md`}
            onClick={() => setLimit(20)}
          >
            20
          </button>

          <button
            className={`
          ${limit === 30 ? 'bg-zinc-400' : 'bg-zinc-600'} p-2 rounded-md`}
            onClick={() => setLimit(30)}
          >
            30
          </button>
          <button
            className={`
          ${limit === 40 ? 'bg-zinc-400' : 'bg-zinc-600'} p-2 rounded-md`}
            onClick={() => setLimit(40)}
          >
            40
          </button>
          <button
            className={`
          ${limit === 50 ? 'bg-zinc-400' : 'bg-zinc-600'} p-2 rounded-md`}
            onClick={() => setLimit(50)}
          >
            50
          </button>
        </div>
      </div>
      <BsPlayCircleFill
        className="text-6xl text-green-500 hover:text-green-400 hover:scale-110 hover:cursor-pointer m-5"
        onClick={() => {
          const songUris = tracks.map((item: any) => item.uri);
          playSongs(songUris);
          dispatch(
            makeQueue(
              tracks.map((item: any) => {
                return {
                  ...item,
                };
              })
            )
          );
        }}
      />

      {loading ? <Loading /> : <TrackResults tracks={tracks} showInfo={true} />}
    </div>
  );
}

export default TopTracks;
