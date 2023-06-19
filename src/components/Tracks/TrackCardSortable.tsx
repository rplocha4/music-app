import React, { useEffect } from 'react';
import { TrackItem } from '../../types/types';
import PlayOptions from './PlayOptions';
import TrackInfo from './TrackInfo';
import AlbumInfo from './AlbumInfo';
import { getIdFromUri, millisToMinutesAndSeconds } from '../../utils';
import LikeTrack from './LikeTrack';
import { BsThreeDots } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const TrackCardSortable: React.FC<{
  track: TrackItem;
  i: string;
  added: string;
  onDelete: (id: string) => void;
  handleClosing?: () => void;
  handleClick?: () => void;
  owner?: string;
  isOpen?: boolean;
}> = ({
  track,
  i,
  added,
  onDelete,
  owner,
  isOpen,
  handleClick,
  handleClosing,
}) => {
  const [hover, setHover] = React.useState(false);
  const { username } = useSelector((state: RootState) => state.user);
  const ref = React.useRef<any>(null);
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
      className={`grid grid-cols-6 gap-10 ${
        hover && 'bg-zinc-700'
      } w-full p-2 ${i === '#' && 'border-b border-gray-600'}`}
      onMouseEnter={() => {
        i !== '#' && setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <div className="col-span-2 flex items-center gap-2">
        <PlayOptions track={track} i={i} hover={hover} />
        <TrackInfo track={track} i={i} />
      </div>
      <AlbumInfo
        id={track.album.id || getIdFromUri(track.album?.uri)!}
        name={track.album.name}
        i={i}
      />
      <p className="flex items-center justify-center text-center">
        {added.split('T')[0]}
      </p>
      <div className=" relative flex items-center justify-center gap-2">
        {hover && <LikeTrack track={track} />}
        <p>{millisToMinutesAndSeconds(track.duration_ms)}</p>
        {hover && (
          <BsThreeDots
            onClick={isOpen ? handleClosing : handleClick}
            className="cursor-pointer text-xl "
          />
        )}
        <div
          ref={ref}
          className="absolute right-5 top-10  z-10 flex w-48 flex-col items-center justify-center rounded-md bg-zinc-900 "
        >
          {isOpen && username === owner && (
            <button
              className="w-full cursor-pointer rounded-md p-2 text-center hover:bg-zinc-950"
              onMouseDown={() => {
                onDelete(track.id);
              }}
            >
              delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackCardSortable;
