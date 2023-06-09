import React, { useEffect, useRef, useState } from 'react';
import {
  PlayerState,
  addToQueue,
  overrideQueue,
  removeFromQueue,
} from '../../store/playerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useAddTrackToPlaylistMutation } from '../../store/features/ServerApi';
import { Playlist, TrackItem } from '../../types/types';
import { getIdFromUri } from '../../utils';
import { RootState } from '../../store/store';
import { showInfo } from '../../store/uiSlice';
import { useNavigate } from 'react-router-dom';

const TrackOptions: React.FC<{
  userPlaylists: Playlist[];
  handleClosing?: () => void;
  track: TrackItem;
}> = ({ track, userPlaylists, handleClosing }) => {
  const [hoverPlaylist, setHoverPlaylist] = useState(false);
  const ref = useRef<any>(null);
  const playerSelector = useSelector<RootState, PlayerState>(
    (state) => state.player
  );
  const { username } = useSelector((state: RootState) => state.user);
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
      className="absolute right-5 top-10  z-10 flex w-48 flex-col items-center justify-center rounded-md bg-zinc-900 "
    >
      <button
        className="w-full cursor-pointer rounded-md p-2 text-center hover:bg-zinc-950"
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

            const newQueue = playerSelector.queue.queue.filter(
              (song) => song.uri !== uri
            );
            dispatch(overrideQueue(newQueue));

            // dispatch(removeFromQueue(track));
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
        {username && (
          <button className="w-full cursor-pointer rounded-md p-2 text-center hover:bg-zinc-950">
            Add to playlist
          </button>
        )}

        {hoverPlaylist && (
          <div className="absolute -left-full top-0 z-10 flex w-48 flex-col items-center justify-center rounded-md bg-zinc-900 ">
            {userPlaylists?.map((playlist: Playlist) => {
              return (
                <button
                  className="w-full cursor-pointer rounded-md p-2 text-center hover:bg-zinc-950"
                  key={playlist._id}
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
        className="w-full cursor-pointer rounded-md p-2 text-center hover:bg-zinc-950"
        onClick={() => navigate(`/album/${album.id}`)}
      >
        Go to album
      </button>
      <button
        className="w-full cursor-pointer rounded-md p-2 text-center hover:bg-zinc-950"
        onClick={() => navigate(`/artist/${artists[0].id}`)}
      >
        Go to artist
      </button>
    </div>
  );
};

export default TrackOptions;
