import React from 'react';
import TrackCard from '../Tracks/TrackCard';
import TrackResults from '../Tracks/TrackResults';

const TopTracks: React.FC<{ tracks: any }> = ({ tracks }) => {
  const [seeMore, setSeeMore] = React.useState(false);

  return (
    <div className="flex flex-col text-white">
      <TrackResults showInfo={false} tracks={tracks.slice(0, 5)} />
      {seeMore && (
        <TrackResults showInfo={false} tracks={tracks.slice(5)} start={5} />
      )}
      <button
        onClick={() => {
          setSeeMore((prev) => !prev);
        }}
        className="self-start bg-zinc-800 px-5 py-3"
      >
        {seeMore ? 'Show Less' : 'Show More'}
      </button>
    </div>
  );
};

export default TopTracks;
