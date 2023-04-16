import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  PlayerState,
  addToQueue,
  removeFromQueue,
} from '../../store/playerSlice';
import { BsThreeDots } from 'react-icons/bs';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
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
import {
  useAddTrackToPlaylistMutation,
  useGetUserPlaylistsQuery,
  useIsLikingTrackQuery,
  useLikeTrackMutation,
  useUnlikeTrackMutation,
} from '../../store/features/ServerApi';
import { TrackItem } from '../../types/types';
const TrackCard: React.FC<{
  track: TrackItem;
  i: string;
  isOpen?: boolean;
  handleClick?: () => void;
  handleClosing?: () => void;
  userPlaylists?: any;
}> = ({ track, i, isOpen, handleClick, handleClosing, userPlaylists }) => {
  const { name, uri, duration_ms, album, artists, id } = track;
  const dispatch = useDispatch();
  const playerSelector = useSelector<RootState, PlayerState>(
    (state) => state.player
  );
  const ref = useRef<any>(null);
  const [inQueue, setInQueue] = useState(false);
  const [hover, setHover] = useState(false);
  const [hoverPlaylist, setHoverPlaylist] = useState(false);

  const [playSong, resultPlay] = usePlaySongsMutation();
  const [setPause, resultPause] = useSetPauseMutation();
  const [setResume, resultResume] = useSetResumeMutation();
  const [likeSong, resultLike] = useLikeTrackMutation();
  const [unlikeSong, resultUnlike] = useUnlikeTrackMutation();
  const [addSongToPlaylist, resultAddSongToPlaylist] =
    useAddTrackToPlaylistMutation();

  const { data, refetch } = useIsLikingTrackQuery(id);
  const [likedTrack, setLikedTrack] = useState(data?.isLiking || false);

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
  useEffect(() => {
    data && setLikedTrack(data.isLiking);
  }, [data]);

  const likeTrack = () => {
    likeSong(track).then((res: any) => {
      console.log(res.data.message);
      refetch();
    });
  };
  const unlikeTrack = () => {
    refetch();
    unlikeSong(id).then((res: any) => {
      console.log(res.data.message);
      refetch();
    });
  };
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
        {album.images?.length > 0 && i !== '#' && (
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
            {i === '#' ? 'Title' : name}
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
        {duration_ms >= 0 &&
          hover &&
          (!likedTrack ? (
            <AiOutlineHeart
              className="cursor-pointer text-xl "
              onClick={() => likeTrack()}
            />
          ) : (
            <AiFillHeart
              className="cursor-pointer text-xl text-green-500"
              onClick={() => unlikeTrack()}
            />
          ))}
        <p>{i !== '#' ? millisToMinutesAndSeconds(duration_ms) : <BiTime />}</p>
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
            <div className="relative w-full">
              <button
                className="cursor-pointer hover:bg-zinc-950 w-full rounded-md text-center p-2"
                onMouseEnter={() => {
                  setHoverPlaylist(true);
                }}
              >
                Add to playlist
              </button>
              {hoverPlaylist && (
                <div className="absolute top-0 -left-full bg-zinc-900 rounded-md z-10 flex flex-col justify-center items-center w-48 ">
                  {userPlaylists.map((playlist: any) => {
                    return (
                      <button
                        className="cursor-pointer hover:bg-zinc-950 w-full rounded-md text-center p-2"
                        key={playlist.id}
                        onClick={() => {
                          addSongToPlaylist({ playlistId: playlist.id, track });
                          handleClosing!();
                          setHoverPlaylist(false);
                        }}
                      >
                        {playlist.name}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
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
