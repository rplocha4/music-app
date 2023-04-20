import React, { useEffect, useRef, useState } from 'react';

import { BsThreeDots } from 'react-icons/bs';
import { getIdFromUri, millisToMinutesAndSeconds } from '../../utils';
import { BiTime } from 'react-icons/bi';

import { TrackItem } from '../../types/types';
import AlbumInfo from './AlbumInfo';
import TrackOptions from './TrackOptions';
import LikeTrack from './LikeTrack';
import TrackInfo from './TrackInfo';
import PlayOptions from './PlayOptions';
const TrackCard: React.FC<{
  track: TrackItem;
  i: string;
  isOpen?: boolean;
  handleClick?: () => void;
  handleClosing?: () => void;
  userPlaylists?: any;
}> = ({ track, i, isOpen, handleClick, handleClosing, userPlaylists }) => {
  const { name, uri, duration_ms, album, artists, id } = track;

  const [hover, setHover] = useState(false);

  return (
    <>
      <div
        className={`grid grid-cols-6 gap-10  
      ${hover && 'bg-zinc-700'} p-2 w-full ${
          i === '#' && 'border-b border-gray-600'
        }`}
        onMouseEnter={() => {
          i !== '#' && setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
        // title={name}
      >
        <div className={`flex gap-3 items-center col-span-3 `}>
          <PlayOptions track={track} i={i} hover={hover} />
          <TrackInfo track={track} i={i} />
        </div>
        <AlbumInfo
          id={album.id || getIdFromUri(album.uri)!}
          name={album.name}
          i={i}
        />
        <div className=" flex items-center justify-center gap-2 relative">
          {duration_ms >= 0 && hover && <LikeTrack track={track} />}
          <p>
            {i !== '#' ? millisToMinutesAndSeconds(duration_ms) : <BiTime />}
          </p>
          {duration_ms >= 0 && hover && (
            <BsThreeDots
              onClick={isOpen ? handleClosing : handleClick}
              className="cursor-pointer text-xl "
            />
          )}
          {isOpen && (
            <TrackOptions
              track={track}
              userPlaylists={userPlaylists}
              handleClosing={handleClosing}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default TrackCard;
