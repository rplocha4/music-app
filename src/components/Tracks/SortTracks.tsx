import React, { useEffect, useMemo } from 'react';
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
const optionClasess =
  'flex justify-center items-center cursor-default text-gray-300 hover:text-white ';

const arrowClasses = 'font-bold text-2xl text-green-600';

const sortTracks = (
  sortType: string,
  sortAscending: boolean,
  tracks: { track: TrackItem; added: string }[]
) => {
  const sorted = [...tracks].sort((a, b) => {
    if (sortType === 'Title') {
      return sortAscending
        ? a.track.name.toLowerCase().localeCompare(b.track.name.toLowerCase())
        : b.track.name.toLowerCase().localeCompare(a.track.name.toLowerCase());
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
  });
  return sorted;
};

const SortTracks: React.FC<{
  tracks: { track: TrackItem; added: string }[];
  onSort: (tracks: { track: TrackItem; added: string }[]) => void;
}> = ({ tracks, onSort }) => {
  const [sortAscending, setSortAscending] = React.useState(true);
  const [sortType, setSortType] = React.useState('Date');
  const [hover, setHover] = React.useState(false);
  const ref = React.useRef<any>(null);
  const sortedTracks = useMemo(() => {
    const sorted = sortTracks(sortType, sortAscending, tracks);
    return sorted;
  }, [sortType, sortAscending, tracks]);

  useEffect(() => {
    onSort(sortedTracks);
  }, [sortedTracks]);

  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setHover(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <>
      <div className="mr-10 w-20 self-end">
        <div className="relative ">
          <span
            onClick={() => setHover((prev) => !prev)}
            className="flex cursor-pointer items-center justify-center"
          >
            <>
              {sortType}{' '}
              {sortAscending ? (
                <MdOutlineKeyboardArrowUp className="text-2xl font-bold" />
              ) : (
                <MdOutlineKeyboardArrowDown className="text-2xl font-bold" />
              )}
            </>
          </span>
          {hover && (
            <div
              className="text-sta absolute -left-full z-20 flex w-40 flex-col items-start justify-start rounded-lg bg-zinc-700"
              ref={ref}
            >
              <p className="p-2 text-sm font-bold text-gray-400">Sort by</p>
              {options.map((option) => (
                <button
                  key={option.name}
                  onMouseDown={() => {
                    sortType === option.name
                      ? setSortAscending(!sortAscending)
                      : setSortAscending(true);
                    setSortType(option.name);
                    setHover(false);
                  }}
                  className={`flex items-center rounded-lg hover:bg-zinc-600 justify-start${
                    sortType === option.name && ' text-green-600'
                  } h-full w-full p-2`}
                >
                  Sort by {option.label}{' '}
                  {sortType === option.name &&
                    (sortAscending ? (
                      <MdOutlineKeyboardArrowUp className={`${arrowClasses}`} />
                    ) : (
                      <MdOutlineKeyboardArrowDown
                        className={`${arrowClasses}`}
                      />
                    ))}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="grid w-full grid-cols-6 gap-10 border-b border-gray-400 py-2 text-left font-bold">
        <div className="col-span-2 flex items-center gap-12  text-center">
          <span className="w-10 text-gray-300">#</span>
          <div className="flex items-center justify-center gap-5">
            <span
              className={`${optionClasess}`}
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
                  <MdOutlineKeyboardArrowUp className={`${arrowClasses}`} />
                ) : (
                  <MdOutlineKeyboardArrowDown className={`${arrowClasses}`} />
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
              className={`${optionClasess}`}
            >
              Artist
              {sortType === 'Artist' ? (
                sortAscending ? (
                  <MdOutlineKeyboardArrowUp className={`${arrowClasses}`} />
                ) : (
                  <MdOutlineKeyboardArrowDown className={`${arrowClasses}`} />
                )
              ) : (
                <p className="w-6"></p>
              )}
            </span>
          </div>
        </div>
        <span
          className={`col-span-2 ${optionClasess}`}
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
              <MdOutlineKeyboardArrowUp className={`${arrowClasses}`} />
            ) : (
              <MdOutlineKeyboardArrowDown className={`${arrowClasses}`} />
            )
          ) : (
            <p className="w-6"></p>
          )}
        </span>
        <span
          className={`${optionClasess}`}
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
              <MdOutlineKeyboardArrowUp className={`${arrowClasses}`} />
            ) : (
              <MdOutlineKeyboardArrowDown className={`${arrowClasses}`} />
            )
          ) : (
            <p className="w-6"></p>
          )}
        </span>
        <span
          className={`${optionClasess}`}
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
              <MdOutlineKeyboardArrowUp className={`${arrowClasses}`} />
            ) : (
              <MdOutlineKeyboardArrowDown className={`${arrowClasses}`} />
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
