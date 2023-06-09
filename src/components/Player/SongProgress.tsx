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
  usePlaySongsMutation,
useSeekToPositionMutation,
} from '../../store/features/SpotifyApi';

const SongProgress: React.FC = () => {
  const dispatch = useDispatch();
  const playerSelector = useSelector<RootState, PlayerState>(
    (state) => state.player
  );
  const { data, error, refetch } = useGetSongStateQuery('', {
    pollingInterval: playerSelector.playing ? 1000 : 0,
  });
  const [progress, setProgress] = useState(data?.progress_ms | 0);
  const [playSong] = usePlaySongsMutation();

  const [seekToPosition] = useSeekToPositionMutation();

  useEffect(() => {
    if (!data) return;
    setProgress(data.progress_ms);
    dispatch(setSongPosition(data.progress_ms));

    if (data.progress_ms + 1000 >= data.item.duration_ms) {
      playSong([
        playerSelector.shuffle
          ? playerSelector.queue.playRandom()?.uri
          : playerSelector.queue.playNext()?.uri,
      ]);
    }
  }, [data?.progress_ms]);

  // useEffect(() => {
  //   dispatch(setPosition(progress));
  // }, [progress]);

  return (
    <>
      <p className="mr-1 text-xs text-gray-400">
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
        className="color-white range-sm h-1 w-64 bg-zinc-700 accent-white md:w-96 "
      />
      <p className=" ml-1 text-xs text-gray-400">
        {millisToMinutesAndSeconds(playerSelector.current_song.duration_ms)}
      </p>
    </>
  );
};

export default SongProgress;
