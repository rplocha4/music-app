import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  PlayerState,
  playNext,
  setPosition,
  setSongPosition,
} from '../../store/playerSlice';
import { RootState } from '../../store/store';
import { millisToMinutesAndSeconds } from '../../utils';
import {
  useGetSongStateQuery,
  useSeekToPositionMutation,
} from '../../store/features/SpotifyApi';

const SongProgress: React.FC = () => {
  const { data, status, error, refetch } = useGetSongStateQuery('', {
    pollingInterval: 1000,
  });
  const [progress, setProgress] = useState(data?.progress_ms | 0);

  const dispatch = useDispatch();
  const playerSelector = useSelector<RootState, PlayerState>(
    (state) => state.player
  );
  const [seekToPosition, result] = useSeekToPositionMutation();

  useEffect(() => {
    if (!data) return;
    setProgress(data.progress_ms);
    dispatch(setSongPosition(data.progress_ms));

    // if (progress + 1000 >= data.item.duration_ms) dispatch(playNext());
  }, [data?.progress_ms]);

  // useEffect(() => {
  //   dispatch(setPosition(progress));
  // }, [progress]);

  return (
    <>
      <p className="text-gray-400 text-xs mr-1">
        {millisToMinutesAndSeconds(progress)}
      </p>
      <input
        type="range"
        min={0}
        max={playerSelector.current_song.duration_ms}
        step={1000}
        value={progress}
        onChange={(event) => {
          seekToPosition(event.target.valueAsNumber);
          setProgress(event.target.valueAsNumber);
        }}
        className="md:w-96 w-64 accent-white bg-zinc-700 color-white h-1 range-sm "
      />
      <p className=" text-gray-400 text-xs ml-1">
        {millisToMinutesAndSeconds(playerSelector.current_song.duration_ms)}
      </p>
    </>
  );
};

export default SongProgress;