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
import { useNavigate } from 'react-router-dom';

const TrackOptions: React.FC<{
  userPlaylists: any;
  handleClosing?: () => void;
  track: TrackItem;
}> = ({ track, userPlaylists, handleClosing }) => {
  const [hoverPlaylist, setHoverPlaylist] = useState(false);
  const ref = useRef<any>(null);
  const playerSelector = useSelector<RootState, PlayerState>(
    (state) => state.player
  );
  const { name, uri, duration_ms, album, artists, id } = track;

  const inQueue = playerSelector.queue.containsSong(uri);

  const [addSongToPlaylist, resultAddSongToPlaylist] =
    useAddTrackToPlaylistMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          if (!inQueue) {
            dispatch(showInfo(`${name} added to queue`));
            dispatch(
              addToQueue({
                name,
                uri,
                artists,
                album,
                duration_ms,
                id: getIdFromUri(uri),
              })
            );
          } else {
            dispatch(showInfo(`${name} removed to queue`));

            dispatch(removeFromQueue(track));
          }
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
            {userPlaylists?.map((playlist: any) => {
              return (
                <button
                  className="cursor-pointer hover:bg-zinc-950 w-full rounded-md text-center p-2"
                  key={playlist.id}
                  onClick={() => {
                    addSongToPlaylist({ playlistId: playlist._id, track })
                      .unwrap()
                      .then((res: any) => {
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
      <button
        className="cursor-pointer hover:bg-zinc-950 w-full rounded-md text-center p-2"
        onClick={() => navigate(`/album/${album.id}`)}
      >
        Go to album
      </button>
      <button
        className="cursor-pointer hover:bg-zinc-950 w-full rounded-md text-center p-2"
        onClick={() => navigate(`/artist/${artists[0].id}`)}
      >
        Go to artist
      </button>
    </div>
  );
};

export default TrackOptions;
