import React, { useEffect } from 'react';
import { BsPauseCircleFill } from 'react-icons/bs';
import {
  FaPlayCircle,
  FaRandom,
  FaStepBackward,
  FaStepForward,
  FaSyncAlt,
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { PlayerState, setShuffle } from '../../store/playerSlice';
import { RootState } from '../../store/store';
import {
  usePlaySongsMutation,
  useSetPauseMutation,
  useSetResumeMutation,
  useToggleShuffleMutation,
} from '../../store/features/SpotifyApi';

const Controlls: React.FC = () => {
  const dispatch = useDispatch();
  const playerSelector = useSelector<RootState, PlayerState>(
    (state) => state.player
  );

  const [setResume, resultResume] = useSetResumeMutation();
  const [setPause, resultPause] = useSetPauseMutation();
  const [toggleShuffle, resultToggle] = useToggleShuffleMutation();
  const [playSong, resultPlay] = usePlaySongsMutation();

  return (
    <>
      <FaRandom
        className={`cursor-pointer active:scale-90 ${
          playerSelector.shuffle ? 'text-green-500' : ''
        }`}
        onClick={() => {
          toggleShuffle(!playerSelector.shuffle);
          dispatch(setShuffle(!playerSelector.shuffle));
        }}
      />
      <FaStepBackward
        className="cursor-pointer active:scale-90"
        onClick={() => {
          playerSelector.queue.head?.prev?.data.uri
            ? playSong([playerSelector.queue.head?.prev.data.uri])
            : console.log('no prev song');
        }}
      />
      {playerSelector.playing ? (
        <BsPauseCircleFill
          onClick={() => {
            setPause('');
          }}
          className="cursor-pointer text-3xl active:scale-90"
        />
      ) : (
        <FaPlayCircle
          onClick={() => {
            setResume('');
          }}
          className="cursor-pointer text-3xl active:scale-90"
        />
      )}
      <FaStepForward
        className="cursor-pointer active:scale-90"
        onClick={() => {
          playerSelector.queue.head?.next?.data.uri
            ? playSong([playerSelector.queue.head?.next.data.uri])
            : console.log('no next song');
        }}
      />
      <FaSyncAlt className="cursor-pointer active:scale-90" />
    </>
  );
};

export default Controlls;
