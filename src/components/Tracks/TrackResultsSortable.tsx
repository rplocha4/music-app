import React, { useEffect } from 'react';
import { TrackItem } from '../../types/types';
import TrackCard from './TrackCard';
import TrackCardSortable from './TrackCardSortable';
import SortTracks from './SortTracks';

const TrackResultsSortable: React.FC<{
  tracks: { track: TrackItem; added: string }[];
}> = ({ tracks }) => {
  const [sortedTracks, setSortedTracks] = React.useState(tracks);

  const handleSort = (tracks: { track: TrackItem; added: string }[]) => {
    setSortedTracks(tracks);
  };

  return (
    <div className="flex flex-col">
      <SortTracks tracks={tracks} onSort={handleSort}/>
      {/* <button
        onClick={() => {
          sortType === 'name'
            ? setSortAscending(!sortAscending)
            : setSortAscending(true);
          setSortType('name');
        }}
      >
        Sort by name
      </button>
      <button onClick={() => setSortType('date')}>Sort by date</button>
      <button onClick={() => setSortType('album')}>Sort by album</button>
      <button onClick={() => setSortType('duration')}>Sort by duration</button> */}

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
