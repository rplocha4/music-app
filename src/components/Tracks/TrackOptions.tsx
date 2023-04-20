import React, { useEffect, useRef, useState } from 'react';
import {
  PlayerState,
  addToQueue,
  removeFromQueue,
} from '../../store/playerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useAddTrackToPlaylistMutation } from '../../store/features/ServerApi';
import { TrackItem } from '../../types/types';
import { getIdFromUri } from '../../utils';
import { RootState } from '../../store/store';
import { showInfo } from '../../store/uiSlice';

const TrackOptions: React.FC<{
  userPlaylists: any;
  handleClosing?: () => void;
  track: TrackItem;
}> = ({ track, userPlaylists, handleClosing }) => {
  const [hoverPlaylist, setHoverPlaylist] = useState(false);
  const ref = useRef<any>(null);
  const [inQueue, setInQueue] = useState(false);
  const playerSelector = useSelector<RootState, PlayerState>(
    (state) => state.player
  );
  const [addSongToPlaylist, resultAddSongToPlaylist] =
    useAddTrackToPlaylistMutation();
  const { name, uri, duration_ms, album, artists, id } = track;
  const dispatch = useDispatch();

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
      <div
        className="relative w-full"
        onMouseEnter={() => {
          setHoverPlaylist(true);
        }}
        onMouseLeave={() => {
          setHoverPlaylist(false);
        }}
      >
        <button className="cursor-pointer hover:bg-zinc-950 w-full rounded-md text-center p-2">
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
                    addSongToPlaylist({ playlistId: playlist.id, track })
                      .unwrap()
                      .then((res) => {
                        dispatch(showInfo(res.message));
                      });

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
  );
};

export default TrackOptions;
