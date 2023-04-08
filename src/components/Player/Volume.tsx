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

const Volume: React.FC = () => {
  const playerSelector = useSelector<RootState, PlayerState>(
    (state) => state.player
  );
  const dispatch = useDispatch();
  const [setVolume, resultVolume] = useSetVolumeMutation();

  const [prevVolume, setPrevVolume] = useState(playerSelector.volume);

  return (
    <>
      <Link to="lyricks">
        <TbMicrophone2 className="cursor-pointer active:scale-90" />
      </Link>
      {playerSelector.volume < 1 ? (
        <BsFillVolumeMuteFill
          onClick={() => {
            setVolume(prevVolume);
            setPrevVolume(playerSelector.volume);
            dispatch(updateVolume(prevVolume));
          }}
          className="cursor-pointer active:scale-90"
        />
      ) : playerSelector.volume < 50 ? (
        <BsVolumeDownFill
          onClick={() => {
            setPrevVolume(playerSelector.volume);
            dispatch(updateVolume(0));

            setVolume(0);
          }}
          className="cursor-pointer active:scale-90"
        />
      ) : (
        <BsFillVolumeUpFill
          onClick={() => {
            setPrevVolume(playerSelector.volume);
            dispatch(updateVolume(0));

            setVolume(0);
          }}
          className="cursor-pointer active:scale-90"
        />
      )}

      <input
        title={`${playerSelector.volume}`}
        type="range"
        min={0}
        max={100}
        step={1}
        value={playerSelector.volume}
        onChange={(event) => {
          setVolume(event.target.value);
          dispatch(updateVolume(event.target.value));
        }}
        className="accent-white  h-1 range-sm outline-none"
      />
    </>
  );
};

export default Volume;
