import React from 'react';
import { TrackItem } from '../../types/types';
import PlayOptions from './PlayOptions';
import TrackInfo from './TrackInfo';
import AlbumInfo from './AlbumInfo';
import { getIdFromUri, millisToMinutesAndSeconds } from '../../utils';
import { BiTime } from 'react-icons/bi';
import LikeTrack from './LikeTrack';
import { BsThreeDots } from 'react-icons/bs';
import { useSelector } from 'react-redux';

const TrackCardSortable: React.FC<{
  track: TrackItem;
  i: string;
  added: string;
  onDelete: (id: string) => void;
  owner?: string;
}> = ({ track, i, added, onDelete, owner }) => {
  const [hover, setHover] = React.useState(false);
  const { username } = useSelector((state: any) => state.user);

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
        id={track.album.id || getIdFromUri(track.album?.uri)!}
        name={track.album.name}
        i={i}
      />
      <p className="text-center flex justify-center items-center">
        {added.split('T')[0]}
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
        {hover && username === owner && (
          <button
            onClick={() => {
              onDelete(track.id);
            }}
          >
            delete
          </button>
        )}
      </div>
    </div>
  );
};

export default TrackCardSortable;
