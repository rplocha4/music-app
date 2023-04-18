import React, { useEffect } from 'react';
import { TrackItem } from '../../types/types';
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from 'react-icons/md';
const options = [
  {
    name: 'Name',
    label: 'Name',
  },
  {
    name: 'Date',
    label: 'Date',
  },
  {
    name: 'Album',
    label: 'Album',
  },
  {
    name: 'Duration',
    label: 'Duration',
  },
];

const SortTracks: React.FC<{
  tracks: { track: TrackItem; added: string }[];
  onSort: (tracks: { track: TrackItem; added: string }[]) => void;
}> = ({ tracks, onSort }) => {
  const [sortAscending, setSortAscending] = React.useState(false);
  const [sortType, setSortType] = React.useState('Name');
  const [hover, setHover] = React.useState(false);

  //sort by name, artist, album, date added
  useEffect(() => {
    const sorted = [
      ...tracks.sort((a, b) => {
        if (sortType === 'Name') {
          return sortAscending
            ? a.track.name
                .toLowerCase()
                .localeCompare(b.track.name.toLowerCase())
            : b.track.name
                .toLowerCase()
                .localeCompare(a.track.name.toLowerCase());
        }
        if (sortType === 'Date') {
          return sortAscending
            ? a.added.localeCompare(b.added)
            : b.added.localeCompare(a.added);
        }
        if (sortType === 'Album') {
          return sortAscending
            ? a.track.album.name
                .toLowerCase()
                .localeCompare(b.track.album.name.toLowerCase())
            : b.track.album.name
                .toLowerCase()
                .localeCompare(a.track.album.name.toLowerCase());
        }
        if (sortType === 'Duration') {
          return sortAscending
            ? a.track.duration_ms - b.track.duration_ms
            : b.track.duration_ms - a.track.duration_ms;
        }
      }),
    ];
    onSort(sorted);
  }, [sortType, sortAscending]);
  return (
    <div className="self-end mr-10 w-20">
      <div className="relative ">
        <span
          onClick={() => setHover((prev) => !prev)}
          className="flex items-center justify-center cursor-pointer"
        >
          <>
            {sortType}{' '}
            {sortAscending ? (
              <MdOutlineKeyboardArrowUp className="font-bold text-2xl" />
            ) : (
              <MdOutlineKeyboardArrowDown className="font-bold text-2xl" />
            )}
          </>
        </span>
        {hover && (
          <div className="absolute bg-zinc-700 flex flex-col -left-full items-start text-sta justify-start w-40 rounded-lg z-20">
            <p className="text-gray-400 text-sm font-bold p-2">Sort by</p>
            {options.map((option) => (
              <button
                key={option.name}
                onMouseDown={() => {
                  sortType === option.name
                    ? setSortAscending(!sortAscending)
                    : setSortAscending(true);
                  setSortType(option.name);
                }}
                className={`rounded-lg hover:bg-zinc-600 flex items-center justify-start${
                  sortType === option.name && ' text-green-600'
                } w-full h-full p-2`}
              >
                Sort by {option.label}{' '}
                {sortType === option.name &&
                  (sortAscending ? (
                    <MdOutlineKeyboardArrowUp className="font-bold text-2xl text-green-600" />
                  ) : (
                    <MdOutlineKeyboardArrowDown className="font-bold text-2xl text-green-600" />
                  ))}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SortTracks;
