import React from 'react';
import { TrackItem } from '../../types/types';
import TrackCard from './TrackCard';

const TrackResultsSortable: React.FC<{
  tracks: { track: TrackItem; added: string }[];
}> = ({ tracks }) => {
  console.log(tracks);

  const [sortedTracks, setSortedTracks] = React.useState(tracks);
  //sort by name, artist, album, date added
  const sortByName = () => {
    const sorted = sortedTracks.sort((a, b) => {
      if (a.track.name < b.track.name) {
        return -1;
      }
      if (a.track.name > b.track.name) {
        return 1;
      }
      return 0;
    });

    setSortedTracks(sorted);
  };

  return (
    <div>
      <button onClick={() => sortByName()}>SORT</button>
    </div>
  );
};

export default TrackResultsSortable;
