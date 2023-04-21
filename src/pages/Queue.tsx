import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TrackCard from '../components/Tracks/TrackCard';
import { Song, overrideQueue, setCurrentSong } from '../store/playerSlice';
import TrackResults from '../components/Tracks/TrackResults';
import { Reorder, AnimatePresence } from 'framer-motion';
import { makeQueue } from '../store/playerSlice';
import { TrackItem } from '../types/types';
const Queue = () => {
  const playerSelector = useSelector((state: any) => state.player);
  const [queue, setQueue] = useState<TrackItem[]>(playerSelector.queue.queue);
  const [current_song, setCurrentSong] = useState<Song>(
    playerSelector.queue.currentSong || {}
  );
  const [openTrackIndex, setOpenTrackIndex] = useState(-1);
  const dispatch = useDispatch();
  useEffect(() => {
    setCurrentSong(playerSelector.queue.currentSong || {});
  }, [playerSelector.queue.currentSong]);

  // useEffect(() => {
  //   setQueue(playerSelector.queue.queue);
  // }, [playerSelector.queue.queue]);
  console.log(queue);

  const handleTrackCardClick = (index: number) => {
    console.log(index);

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
        {playerSelector.queue.currentSong?.uri && (
          <h2 className="text-gray-500 text-xl">Now Playing</h2>
        )}
        <div>
          {current_song?.name && (
            <TrackResults
              showInfo={false}
              // tracks={[...queue.toArray(queue.head).slice(0, 1)]}
              tracks={
                current_song.uri ? [playerSelector.queue.currentSong] : []
              }
            />
          )}
        </div>
        {!playerSelector.queue.isEmpty() ? (
          <>
            <h2 className="text-gray-500 text-xl">Up Next</h2>
            <div>
              <Reorder.Group axis="y" values={queue} onReorder={setQueue}>
                {queue.map((song: TrackItem, index: number) => {
                  return (
                    <Reorder.Item key={song.id} value={song}>
                      <TrackCard
                        track={song}
                        i={`${index}`}
                        isOpen={index === openTrackIndex}
                        handleClick={() => handleTrackCardClick(index)}
                        handleClosing={handleClosing}
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
