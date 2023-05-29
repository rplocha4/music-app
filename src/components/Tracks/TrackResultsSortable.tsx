import React, { useEffect } from 'react';
import { TrackItem } from '../../types/types';
import TrackCardSortable from './TrackCardSortable';
import SortTracks from './SortTracks';
import { BsPlayCircleFill } from 'react-icons/bs';
import { makeQueue } from '../../store/playerSlice';
import { useDispatch } from 'react-redux';
import { usePlaySongsMutation } from '../../store/features/SpotifyApi';

const TrackResultsSortable: React.FC<{
  tracks: { track: TrackItem; added: string }[];
  onDelete: (id: string) => void;
}> = ({ tracks, onDelete }) => {
  const [sortedTracks, setSortedTracks] = React.useState(tracks);
  const [songUris, setSongUris] = React.useState<string[]>([]);

  const handleSort = (tracks: { track: TrackItem; added: string }[]) => {
    setSortedTracks(tracks);
  };
  const [playSongs] = usePlaySongsMutation();
  const dispatch = useDispatch();
  useEffect(() => {
    const songUris = sortedTracks.map((item: any) => item.track.uri);
    setSongUris(songUris);
  }, [sortedTracks]);

  return (
    <div className="flex flex-col text-white ">
      <BsPlayCircleFill
        className="text-6xl text-green-500 hover:text-green-400 hover:scale-110 hover:cursor-pointer mx-5 mt-5"
        onClick={() => {
          playSongs(songUris);
          dispatch(
            makeQueue(
              sortedTracks.map((item: any) => {
                return {
                  ...item.track,
                };
              })
            )
          );
        }}
      />
      <SortTracks tracks={tracks} onSort={handleSort} />
      {sortedTracks.map((track, i) => (
        <TrackCardSortable
          key={i}
          track={track.track}
          added={track.added}
          i={i.toString()}
          onDelete={(id) => onDelete(id)}
        />
      ))}
    </div>
  );
};

export default TrackResultsSortable;
