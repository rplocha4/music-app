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
const optionClasess =
  'flex justify-center items-center cursor-default text-gray-300 hover:text-white ';

const arrowClasses = 'font-bold text-2xl text-green-600';

const SortTracks: React.FC<{
  tracks: { track: TrackItem; added: string }[];
  onSort: (tracks: { track: TrackItem; added: string }[]) => void;
}> = ({ tracks, onSort }) => {
  const [sortAscending, setSortAscending] = React.useState(true);
  const [sortType, setSortType] = React.useState('Date');
  const [hover, setHover] = React.useState(false);
  const [sortedTracks, setSortedTracks] = React.useState(tracks);

  const ref = React.useRef<any>(null);
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

  //sort by name, artist, album, date added
  useEffect(() => {
    setSortedTracks((prevTracks) => {
      return [...prevTracks].sort((a, b) => {
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
      });
    }),
      // ...tracks.sort((a, b) => {
      //   if (sortType === 'Title') {
      //     return sortAscending
      //       ? a.track.name
      //           .toLowerCase()
      //           .localeCompare(b.track.name.toLowerCase())
      //       : b.track.name
      //           .toLowerCase()
      //           .localeCompare(a.track.name.toLowerCase());
      //   }
      //   if (sortType === 'Date') {
      //     return sortAscending
      //       ? a.added.localeCompare(b.added)
      //       : b.added.localeCompare(a.added);
      //   }
      //   if (sortType === 'Album') {
      //     return sortAscending
      //       ? a.track.album.name
      //           .toLowerCase()
      //           .localeCompare(b.track.album.name.toLowerCase())
      //       : b.track.album.name
      //           .toLowerCase()
      //           .localeCompare(a.track.album.name.toLowerCase());
      //   }
      //   if (sortType === 'Duration') {
      //     return sortAscending
      //       ? a.track.duration_ms - b.track.duration_ms
      //       : b.track.duration_ms - a.track.duration_ms;
      //   }
      //   if (sortType === 'Artist') {
      //     return sortAscending
      //       ? a.track.artists[0].name
      //           .toLowerCase()
      //           .localeCompare(b.track.artists[0].name.toLowerCase())
      //       : b.track.artists[0].name
      //           .toLowerCase()
      //           .localeCompare(a.track.artists[0].name.toLowerCase());
      //   }
      //   return 0;
      // }),
      onSort(sortedTracks);
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
            <div
              className="absolute bg-zinc-700 flex flex-col -left-full items-start text-sta justify-start w-40 rounded-lg z-20"
              ref={ref}
            >
              <p className="text-gray-400 text-sm font-bold p-2">Sort by</p>
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
                  className={`rounded-lg hover:bg-zinc-600 flex items-center justify-start${
                    sortType === option.name && ' text-green-600'
                  } w-full h-full p-2`}
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
      <div className="grid grid-cols-6 gap-10 py-2 w-full text-left font-bold border-b border-gray-400">
        <div className="col-span-2 flex gap-12 items-center  text-center">
          <span className="w-10 text-gray-300">#</span>
          <div className="flex items-center gap-5 justify-center">
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
