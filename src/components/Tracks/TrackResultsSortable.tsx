import React, { useEffect, useState } from 'react';
import { TrackItem } from '../../types/types';
import TrackCardSortable from './TrackCardSortable';
import SortTracks from './SortTracks';
import { BsPlayCircleFill } from 'react-icons/bs';
import { makeQueue } from '../../store/playerSlice';
import { useDispatch } from 'react-redux';
import { usePlaySongsMutation } from '../../store/features/SpotifyApi';

const TrackResultsSortable: React.FC<{
  tracks: { track: TrackItem; added: string }[];
  onDelete: (id: string) => void;
  owner?: string;
}> = ({ tracks, onDelete, owner }) => {
  const [sortedTracks, setSortedTracks] = useState(tracks);
  const [openTrackIndex, setOpenTrackIndex] = useState(-1);

  const handleSort = (tracks: { track: TrackItem; added: string }[]) => {
    setSortedTracks(tracks);
  };
  const [playSongs] = usePlaySongsMutation();
  const dispatch = useDispatch();

  const handleTrackCardClick = (index: number) => {
    setOpenTrackIndex(index === openTrackIndex ? -1 : index);
  };
  const handleClosing = () => {
    setOpenTrackIndex(-1);
  };

  return (
    <div className="flex flex-col text-white ">
      <BsPlayCircleFill
        className="mx-5 mt-5 text-6xl text-green-500 hover:scale-110 hover:cursor-pointer hover:text-green-400"
        onClick={() => {
          playSongs(
            sortedTracks.map((item: { track: TrackItem }) => item.track.uri)
          );
          dispatch(
            makeQueue(
              sortedTracks.map((item: any) => {
                return {
                  ...item.track,
                };
              })
            )
          );
        }}
      />
      <SortTracks tracks={tracks} onSort={handleSort} />
      {sortedTracks.map((track, i) => (
        <TrackCardSortable
          key={i}
          track={track.track}
          added={track.added}
          i={i.toString()}
          onDelete={(id) => onDelete(id)}
          owner={owner}
          isOpen={i === openTrackIndex}
          handleClick={() => handleTrackCardClick(i)}
          handleClosing={handleClosing}
        />
      ))}
    </div>
  );
};

export default TrackResultsSortable;
