import React, { useEffect, useState } from 'react';
import {
  BsFillVolumeMuteFill,
  BsFillVolumeUpFill,
  BsVolumeDownFill,
} from 'react-icons/bs';
import { TbMicrophone2 } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { PlayerState, updateVolume } from '../../store/playerSlice';
import { RootState } from '../../store/store';
import { useSetVolumeMutation } from '../../store/features/SpotifyApi';
import { Link } from 'react-router-dom';

const Volume: React.FC<{
  onSetVolume: (volume: number) => void;
}> = ({ onSetVolume }) => {
  const playerSelector = useSelector<RootState, PlayerState>(
    (state) => state.player
  );
  const dispatch = useDispatch();
  const [setVolume, resultVolume] = useSetVolumeMutation();

  const [prevVolume, setPrevVolume] = useState(playerSelector.volume);

  return (
    <>
      {playerSelector.volume == 0.0 ? (
        <BsFillVolumeMuteFill
          onClick={() => {
            // setVolume(prevVolume).catch((err) => console.log(err));

            setPrevVolume(playerSelector.volume);
            onSetVolume(prevVolume);
            dispatch(updateVolume(prevVolume));
          }}
          className="cursor-pointer active:scale-90"
        />
      ) : playerSelector.volume < 0.5 ? (
        <BsVolumeDownFill
          onClick={() => {
            setPrevVolume(playerSelector.volume);
            dispatch(updateVolume(0));
            onSetVolume(0);

            // setVolume(0).catch((err) => console.log(err));
          }}
          className="cursor-pointer active:scale-90"
        />
      ) : (
        <BsFillVolumeUpFill
          onClick={() => {
            setPrevVolume(playerSelector.volume);
            onSetVolume(0);
            dispatch(updateVolume(0));
            // setVolume(0).catch((err) => console.log(err));
          }}
          className="cursor-pointer active:scale-90"
        />
      )}

      <input
        title={`${playerSelector.volume * 100}`}
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={playerSelector.volume}
        onChange={(event) => {
          // setVolume(event.target.value);
          onSetVolume(+event.target.value);
          dispatch(updateVolume(event.target.value));
        }}
        className="range-sm  h-1 accent-white outline-none"
      />
    </>
  );
};

export default Volume;
