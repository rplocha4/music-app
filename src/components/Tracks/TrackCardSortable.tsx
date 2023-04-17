import React from 'react';
import { TrackItem } from '../../types/types';
import PlayOptions from './PlayOptions';
import TrackInfo from './TrackInfo';
import AlbumInfo from './AlbumInfo';
import { getIdFromUri, millisToMinutesAndSeconds } from '../../utils';
import { BiTime } from 'react-icons/bi';
import LikeTrack from './LikeTrack';
import { BsThreeDots } from 'react-icons/bs';

const TrackCardSortable: React.FC<{
  track: TrackItem;
  i: string;
  dateAdded: string;
}> = ({ track, i, dateAdded }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      className={`grid grid-cols-6 gap-10 ${
        hover && 'bg-zinc-700'
      } p-2 w-full ${i === '#' && 'border-b border-gray-600'}`}
      onMouseEnter={() => {
        i !== '#' && setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <div className="flex gap-2 items-center col-span-2">
        <PlayOptions track={track} i={i} hover={hover} />
        <TrackInfo track={track} i={i} />
      </div>
      <AlbumInfo
        id={track.album.id || getIdFromUri(track.album.uri)!}
        name={track.album.name}
        i={i}
      />
      <p className="text-center flex justify-center items-center">
        {dateAdded.split('T')[0]}
      </p>
      <div className=" flex items-center justify-center gap-2 relative">
        {hover && <LikeTrack track={track} />}
        <p>{millisToMinutesAndSeconds(track.duration_ms)}</p>
        {hover && (
          <BsThreeDots
            // onClick={isOpen ? handleClosing : handleClick}
            className="cursor-pointer text-xl "
          />
        )}
      </div>
    </div>
  );
};

export default TrackCardSortable;
