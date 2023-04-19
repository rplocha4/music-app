import React, { useEffect } from 'react';
import { TrackItem } from '../../types/types';
import TrackCard from './TrackCard';
import TrackCardSortable from './TrackCardSortable';
import SortTracks from './SortTracks';
import { BiTime } from 'react-icons/bi';

const TrackResultsSortable: React.FC<{
  tracks: { track: TrackItem; added: string }[];
}> = ({ tracks }) => {
  const [sortedTracks, setSortedTracks] = React.useState(tracks);

  const handleSort = (tracks: { track: TrackItem; added: string }[]) => {
    setSortedTracks(tracks);
  };

  return (
    <div className="flex flex-col text-white py-5">
      <SortTracks tracks={tracks} onSort={handleSort} />

      {sortedTracks.map((track, i) => (
        <TrackCardSortable
          key={i}
          track={track.track}
          dateAdded={track.added}
          i={i.toString()}
        />
      ))}
    </div>
  );
};

export default TrackResultsSortable;
