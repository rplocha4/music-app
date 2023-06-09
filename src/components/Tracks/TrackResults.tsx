import React, { useEffect, useRef, useState } from 'react';
import { BiTime } from 'react-icons/bi';
import TrackCard from './TrackCard';
import { getSmallestImage } from '../../utils';
import { Song } from '../../store/playerSlice';
import {
  useGetLikedTracksQuery,
  useGetUserPlaylistsQuery,
} from '../../store/features/ServerApi';
import { TrackItem } from '../../types/types';

const TrackResults: React.FC<{
  tracks: TrackItem[] | Song[];
  showInfo: boolean;
  start?: number;
}> = ({ tracks, showInfo, start }) => {
  const [openTrackIndex, setOpenTrackIndex] = useState(-1);
  const { data: playlists, refetch } = useGetUserPlaylistsQuery('', {
    skip: localStorage.getItem('USERNAME') ? false : true,
  });
  const [userPlaylists, setUserPlaylists] = useState(playlists);
  const handleTrackCardClick = (index: number) => {
    setOpenTrackIndex(index === openTrackIndex ? -1 : index);
  };
  const handleClosing = () => {
    setOpenTrackIndex(-1);
  };
  useEffect(() => {
    setUserPlaylists(playlists);
  }, [playlists]);

  return (
    <div className="flex flex-col justify-start gap-3 bg-zinc-800 text-white">
      {tracks.length !== 0 &&
        tracks.map((track: any, i: number) => {
          // const smallest = getSmallestImage(track.album.images);
          return (
            <div key={i}>
              {i === 0 && showInfo && <TrackCard track={track} i={'#'} />}
              <TrackCard
                track={track}
                i={`${start ? start + i : i}`}
                isOpen={
                  start ? start + i === openTrackIndex : i === openTrackIndex
                }
                handleClick={() => handleTrackCardClick(start ? start + i : i)}
                handleClosing={handleClosing}
                userPlaylists={userPlaylists}
              />
            </div>
          );
        })}
    </div>
  );
};

export default TrackResults;
