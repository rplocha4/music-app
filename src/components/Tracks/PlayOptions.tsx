import React from 'react';
import { TrackItem } from '../../types/types';
import {
  usePlaySongsMutation,
  useSetPauseMutation,
  useSetResumeMutation,
} from '../../store/features/SpotifyApi';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { PlayerState } from '../../store/playerSlice';
import { BiPause } from 'react-icons/bi';
import SongAnimation from '../Animate/SongAnimation';
import { BsFillPlayFill } from 'react-icons/bs';

const PlayOptions: React.FC<{
  hover: boolean;
  track: TrackItem;
  i: string;
}> = ({ hover, track, i }) => {
  const { name, uri, duration_ms, album, artists, id } = track;

  const [playSong, resultPlay] = usePlaySongsMutation();
  const [setPause, resultPause] = useSetPauseMutation();
  const [setResume, resultResume] = useSetResumeMutation();
  const playerSelector = useSelector<RootState, PlayerState>(
    (state) => state.player
  );
  return (
    <div className={`flex w-10 items-center justify-center  `}>
      {hover ? (
        uri &&
        uri === playerSelector.current_song.uri &&
        playerSelector.playing ? (
          <BiPause
            className="cursor-pointer text-2xl "
            onClick={() => {
              setPause('');
              // dispatch(setDuration(duration_ms));
            }}
          />
        ) : (
          <BsFillPlayFill
            className="cursor-pointer text-2xl"
            onClick={() => {
              uri &&
                (uri !== playerSelector.current_song.uri
                  ? playSong([uri])
                  : setResume(''));
            }}
          />
        )
      ) : i !== '#' &&
        uri &&
        uri === playerSelector.current_song.uri &&
        playerSelector.playing ? (
        <SongAnimation />
      ) : (
        <p
          className={`text-center  ${
            i !== '#' &&
            uri &&
            uri === playerSelector.current_song.uri &&
            'text-green-400'
          }
              }`}
        >
          {i !== '#' ? parseInt(i) + 1 : i}
        </p>
      )}
    </div>
  );
};

export default PlayOptions;
