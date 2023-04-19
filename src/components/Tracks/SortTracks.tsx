import React, { useEffect } from 'react';
import { TrackItem } from '../../types/types';
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from 'react-icons/md';
import { BiTime } from 'react-icons/bi';
const options = [
  {
    name: 'Title',
    label: 'Title',
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
  {
    name: 'Artist',
    label: 'Artist',
  },
];

const SortTracks: React.FC<{
  tracks: { track: TrackItem; added: string }[];
  onSort: (tracks: { track: TrackItem; added: string }[]) => void;
}> = ({ tracks, onSort }) => {
  const [sortAscending, setSortAscending] = React.useState(false);
  const [sortType, setSortType] = React.useState('Title');
  const [hover, setHover] = React.useState(false);

  //sort by name, artist, album, date added
  useEffect(() => {
    const sorted = [
      ...tracks.sort((a, b) => {
        if (sortType === 'Title') {
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
        if (sortType === 'Artist') {
          return sortAscending
            ? a.track.artists[0].name
                .toLowerCase()
                .localeCompare(b.track.artists[0].name.toLowerCase())
            : b.track.artists[0].name
                .toLowerCase()
                .localeCompare(a.track.artists[0].name.toLowerCase());
        }
        return 0;
      }),
    ];
    onSort(sorted);
  }, [sortType, sortAscending]);
  return (
    <>
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
      <div className="grid grid-cols-6 gap-10 py-2 w-full text-left font-bold border-b border-gray-400">
        <div className="col-span-2 flex gap-12 items-center  text-center">
          <span className="w-10">#</span>
          <div className="flex items-center gap-5 justify-center">
            <span
              className="flex justify-center items-center cursor-default"
              onMouseDown={() => {
                sortType === 'Title'
                  ? setSortAscending(!sortAscending)
                  : setSortAscending(true);
                setSortType('Title');
              }}
            >
              Title
              {sortType === 'Title' ? (
                sortAscending ? (
                  <MdOutlineKeyboardArrowUp className="font-bold text-2xl text-green-600" />
                ) : (
                  <MdOutlineKeyboardArrowDown className="font-bold text-2xl text-green-600" />
                )
              ) : (
                <p className="w-6"></p>
              )}
            </span>
            <span
              onMouseDown={() => {
                sortType === 'Artist'
                  ? setSortAscending(!sortAscending)
                  : setSortAscending(true);
                setSortType('Artist');
              }}
              className="flex justify-center items-center cursor-default"
            >
              Artist
              {sortType === 'Artist' ? (
                sortAscending ? (
                  <MdOutlineKeyboardArrowUp className="font-bold text-2xl text-green-600" />
                ) : (
                  <MdOutlineKeyboardArrowDown className="font-bold text-2xl text-green-600" />
                )
              ) : (
                <p className="w-6"></p>
              )}
            </span>
          </div>
        </div>
        <span
          className="col-span-2 flex justify-center items-center cursor-default"
          onMouseDown={() => {
            sortType === 'Album'
              ? setSortAscending(!sortAscending)
              : setSortAscending(true);
            setSortType('Album');
          }}
        >
          Album
          {sortType === 'Album' ? (
            sortAscending ? (
              <MdOutlineKeyboardArrowUp className="font-bold text-2xl text-green-600" />
            ) : (
              <MdOutlineKeyboardArrowDown className="font-bold text-2xl text-green-600" />
            )
          ) : (
            <p className="w-6"></p>
          )}
        </span>
        <span
          className="flex justify-center items-center cursor-default"
          onMouseDown={() => {
            sortType === 'Date'
              ? setSortAscending(!sortAscending)
              : setSortAscending(true);
            setSortType('Date');
          }}
        >
          Date Added{' '}
          {sortType === 'Date' ? (
            sortAscending ? (
              <MdOutlineKeyboardArrowUp className="font-bold text-2xl text-green-600" />
            ) : (
              <MdOutlineKeyboardArrowDown className="font-bold text-2xl text-green-600" />
            )
          ) : (
            <p className="w-6"></p>
          )}
        </span>
        <span
          className="flex items-center justify-center"
          onMouseDown={() => {
            sortType === 'Duration'
              ? setSortAscending(!sortAscending)
              : setSortAscending(true);
            setSortType('Duration');
          }}
        >
          <BiTime />
          {sortType === 'Duration' ? (
            sortAscending ? (
              <MdOutlineKeyboardArrowUp className="font-bold text-2xl text-green-600" />
            ) : (
              <MdOutlineKeyboardArrowDown className="font-bold text-2xl text-green-600" />
            )
          ) : (
            <p className="w-6"></p>
          )}
        </span>
      </div>
    </>
  );
};

export default SortTracks;
