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
import { Song } from '../../store/playerSlice';
const TrackCard: React.FC<{
  track: TrackItem | Song;
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
      ${hover && 'bg-zinc-700'} w-full p-2 ${
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
        <div className={`col-span-3 flex items-center gap-3 `}>
          <PlayOptions track={track as TrackItem} i={i} hover={hover} />
          <TrackInfo track={track as TrackItem} i={i} />
        </div>
        <AlbumInfo
          id={album.id || getIdFromUri(album.uri)!}
          name={album.name}
          i={i}
        />
        <div className=" relative flex items-center justify-center gap-2">
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
              track={track as TrackItem}
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
