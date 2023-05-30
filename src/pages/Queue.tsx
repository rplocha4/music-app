import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TrackCard from '../components/Tracks/TrackCard';
import { Song, overrideQueue, setCurrentSong } from '../store/playerSlice';
import TrackResults from '../components/Tracks/TrackResults';
import { Reorder, AnimatePresence } from 'framer-motion';
import { makeQueue } from '../store/playerSlice';
import { TrackItem } from '../types/types';
import { useGetUserPlaylistsQuery } from '../store/features/ServerApi';
import { RootState } from '../store/store';
const Queue = () => {
  const { queue: q } = useSelector((state: RootState) => state.player);
  const [queue, setQueue] = useState(q.queue);

  const current_song = q.currentSong as Song;
  const [openTrackIndex, setOpenTrackIndex] = useState(-1);
  const { data: playlists, refetch } = useGetUserPlaylistsQuery();
  const userPlaylists = playlists?.userPlaylists;

  const dispatch = useDispatch();

  // useEffect(() => {
  //   setCurrentSong(q.currentSong || {});
  // }, [q.currentSong]);

  // useEffect(() => {
  //   setQueue(queue.queue);
  // }, [queue]);

  const handleTrackCardClick = (index: number) => {
    setOpenTrackIndex(index === openTrackIndex ? -1 : index);
  };
  const handleClosing = () => {
    setOpenTrackIndex(-1);
  };
  useEffect(() => {
    dispatch(overrideQueue(queue));
  }, [queue]);

  return (
    <div className="flex flex-col p-5 gap-2 text-white">
      <h1 className="bold text-3xl">Queue</h1>
      <>
        {q.currentSong?.uri && (
          <h2 className="text-gray-500 text-xl">Now Playing</h2>
        )}
        <div>
          {current_song?.name && (
            <TrackResults
              showInfo={false}
              // tracks={[...queue.toArray(queue.head).slice(0, 1)]}
              tracks={current_song.uri ? [q.currentSong as Song] : []}
            />
          )}
        </div>
        {!q.isEmpty() ? (
          <>
            <h2 className="text-gray-500 text-xl">Up Next</h2>
            <div>
              <Reorder.Group axis="y" values={queue} onReorder={setQueue}>
                {q.queue.map((song: Song, index: number) => {
                  return (
                    <Reorder.Item key={song.id} value={song}>
                      <TrackCard
                        track={song}
                        i={`${index}`}
                        isOpen={index === openTrackIndex}
                        handleClick={() => handleTrackCardClick(index)}
                        handleClosing={handleClosing}
                        userPlaylists={userPlaylists}
                      />
                    </Reorder.Item>
                  );
                })}
                {/* <TrackResults
                  showInfo={false}
                  tracks={
                    current_song.uri ? queue.toArray(queue.head.next) : []
                  }
                  start={current_song.uri ? 1 : 0}
                /> */}
              </Reorder.Group>
            </div>
          </>
        ) : (
          <h1 className="text-gray-500 text-xl">No songs in queue</h1>
        )}
      </>
    </div>
  );
};

export default Queue;

export async function loader({ params }: any) {
  //   const queue = await callApi(
  //     `https://api.spotify.com/v1/me/player/queue`,
  //     'GET',
  //     null,
  //     {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  //     }
  //   );
  //   return { queue };
  return null;
}
