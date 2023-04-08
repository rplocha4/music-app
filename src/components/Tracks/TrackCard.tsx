import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  PlayerState,
  addToQueue,
  removeFromQueue,
} from '../../store/playerSlice';
import { BsThreeDots } from 'react-icons/bs';
import { AiOutlineHeart } from 'react-icons/ai';
import { getIdFromUri, millisToMinutesAndSeconds } from '../../utils';
import { BsFillPlayFill } from 'react-icons/bs';
import { RootState } from '../../store/store';
import { BiPause } from 'react-icons/bi';
import { BiTime } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import SongAnimation from '../Animate/SongAnimation';
import {
  usePlaySongsMutation,
  useSetPauseMutation,
  useSetResumeMutation,
} from '../../store/features/SpotifyApi';
const TrackCard: React.FC<{
  name: string;
  uri: string;
  duration_ms: number;
  i: string;
  album: {
    name: string;
    id: string;
    uri: string;
    images: { url: string; uri: string }[];
  };
  artists: { name: string; id: string; uri: string }[];
  isOpen?: boolean;
  handleClick?: () => void;
  handleClosing?: () => void;
}> = ({
  name,
  uri,
  duration_ms,
  i,
  album,
  artists,
  isOpen,
  handleClick,
  handleClosing,
}) => {
  const dispatch = useDispatch();
  const playerSelector = useSelector<RootState, PlayerState>(
    (state) => state.player
  );
  const ref = useRef<any>(null);
  const [inQueue, setInQueue] = useState(false);
  const [hover, setHover] = useState(false);

  const [playSong, resultPlay] = usePlaySongsMutation();
  const [setPause, resultPause] = useSetPauseMutation();
  const [setResume, resultResume] = useSetResumeMutation();

  useEffect(() => {
    setInQueue(playerSelector.queue.containsSong(uri));
  }, [playerSelector.queue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handleClosing!();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
  return (
    <div
      className={`grid grid-cols-6 gap-10  
      ${hover && 'bg-zinc-700'} p-2 w-full ${
        i === '#' && 'border-b border-gray-600'
      }`}
      onMouseEnter={() => {
        i !== '#' && setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      title={name}
    >
      <div className={`flex gap-3 items-center col-span-3 `}>
        <div className={`flex justify-center items-center w-10  `}>
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
          ) : uri &&
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
        {album.images?.length > 0 && (
          <img
            src={album.images ? album.images[0].url : ''}
            style={{ height: '50px', width: '50px' }}
            alt="song image"
          />
        )}

        <div className="flex flex-col justify-between whitespace-nowrap overflow-hidden  max-w-xs">
          <p
            className={`font-bold ${
              uri && uri === playerSelector.current_song.uri && 'text-green-400'
            }`}
          >
            {name}
          </p>
          {artists &&
            (i === '#' ? (
              <p className="font-extralight "></p>
            ) : (
              <div className="flex gap-1">
                {artists.map(({ name, id, uri }, i) => {
                  return (
                    <Link
                      to={`/artist/${id || getIdFromUri(uri)}`}
                      className="font-extralight hover:underline"
                      key={i}
                    >
                      {`${i === artists.length - 1 ? name : name + ', '}`}
                    </Link>
                  );
                })}
              </div>
            ))}
        </div>
      </div>
      {i === '#' ? (
        <div className="flex items-center justify-center col-span-2 text-center">
          Album
        </div>
      ) : (
        <Link
          to={`/album/${album.id || getIdFromUri(album.uri)}`}
          className="flex items-center justify-center col-span-2 hover:underline text-center"
        >
          {album.name}
        </Link>
      )}
      <div className=" flex items-center justify-center gap-2 relative">
        {duration_ms >= 0 && hover && (
          <AiOutlineHeart className="cursor-pointer text-xl " />
        )}
        <p>
          {duration_ms >= 0 ? (
            millisToMinutesAndSeconds(duration_ms)
          ) : (
            <BiTime />
          )}
        </p>
        {duration_ms >= 0 && hover && (
          <BsThreeDots
            onClick={isOpen ? handleClosing : handleClick}
            className="cursor-pointer text-xl "
          />
        )}
        {isOpen && (
          <div
            ref={ref}
            className="absolute right-5 top-10  bg-zinc-900 rounded-md z-10 flex flex-col justify-center items-center w-48 "
          >
            <button
              className="cursor-pointer hover:bg-zinc-950 w-full rounded-md text-center p-2"
              onClick={() => {
                !inQueue
                  ? dispatch(
                      addToQueue({
                        name,
                        uri,
                        artists,
                        album,
                        duration_ms,
                        id: getIdFromUri(uri),
                      })
                    )
                  : dispatch(removeFromQueue(uri));
                handleClosing!();
              }}
            >
              {`${!inQueue ? 'Add to queue' : 'Remove from queue'} `}
            </button>
            <button className="cursor-pointer hover:bg-zinc-950 w-full rounded-md text-center p-2">
              Add to playlist
            </button>
            <button className="cursor-pointer hover:bg-zinc-950 w-full rounded-md text-center p-2">
              Go to album
            </button>
            <button className="cursor-pointer hover:bg-zinc-950 w-full rounded-md text-center p-2">
              Go to artist
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackCard;
