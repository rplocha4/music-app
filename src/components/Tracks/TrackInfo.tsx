import React from 'react';
import { TrackItem } from '../../types/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { PlayerState } from '../../store/playerSlice';
import ArtistsInfo from './ArtistsInfo';

const TrackInfo: React.FC<{ track: TrackItem; i: string }> = ({ track, i }) => {
  const { name, uri, duration_ms, album, artists, id } = track;
  const playerSelector = useSelector<RootState, PlayerState>(
    (state) => state.player
  );
  return (
    <>
      {album.images?.length > 0 && i !== '#' && (
        <img
          src={album.images ? album.images[0].url : ''}
          style={{ height: '50px', width: '50px' }}
          alt="song image"
        />
      )}

      <div className="flex flex-col justify-between whitespace-nowrap overflow-hidden  max-w-xs">
        <p
          className={`font-bold ${
            i !== '#' &&
            uri &&
            uri === playerSelector.current_song.uri &&
            'text-green-400'
          }`}
        >
          {i === '#' ? 'Title' : name}
        </p>
        {artists &&
          (i === '#' ? (
            <p className="font-extralight "></p>
          ) : (
            <div className="flex gap-1">
              <ArtistsInfo artists={artists} />
            </div>
          ))}
      </div>
    </>
  );
};

export default TrackInfo;
