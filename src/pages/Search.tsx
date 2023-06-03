import React, { useEffect, useRef, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import AlbumResults from '../components/Album/AlbumResults';
import ArtistsResults from '../components/Artist/ArtistsResults';
import PlaylistResults from '../components/Playlist/PlaylistResults';
import TrackResults from '../components/Tracks/TrackResults';

import { Album, Artist, Playlist, TrackItem } from '../types/types';
import {
  useLazySearchPlaylistQuery,
  useLazySearchUserQuery,
  useSearchPlaylistQuery,
  useSearchUserQuery,
} from '../store/features/ServerApi';
import UserResults from '../components/User/UserResults';

const filters = [
  { name: 'songs' },
  { name: 'albums' },
  { name: 'artists' },
  { name: 'playlists' },
  { name: 'users' },
];

const Search: React.FC = ({}) => {
  const [search, setSearch] = useState('');
  const [tracks, setTracks] = useState<TrackItem[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [artists, setArtist] = useState<Artist[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [currentFilter, setCurrentFilter] = useState<string>('songs');
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.focus();
  }, []);

  const [refetchPlaylist] = useLazySearchPlaylistQuery();
  const [refetchUsers] = useLazySearchUserQuery();

  useEffect(() => {
    if (!search) {
      setTracks([]);
      return;
    }

    if (currentFilter === 'playlists') {
      refetchPlaylist(search)
        .then((res: any) => {
          if (!res.data || res.data.length === 0) setPlaylists([]);
          else setPlaylists(res.data);
        })
        .catch((err: any) => {
          setPlaylists([]);
          // console.log(err);
        });
    } else if (currentFilter === 'users') {
      refetchUsers(search)
        .then((res: any) => {
          if (!res.data || res.data.length === 0) setUsers([]);
          else {
            setUsers(res.data);
            // console.log(res.data);
          }
        })
        .catch((err: any) => {
          setUsers([]);
        });
    } else
      fetch(
        `https://api.spotify.com/v1/search?q=${search}&type=track,album,artist`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setTracks(data.tracks.items);
          setArtist(data.artists.items);
          setAlbums(data.albums.items);
        });
  }, [search, currentFilter]);

  return (
    <div className="h-full">
      <div className="flex justify-center md:justify-start">
        <span className="m-2 flex w-5/6 items-center rounded-xl bg-white p-3 md:w-3/6">
          <BsSearch className="mr-2 text-2xl" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className=" ml-1 w-full rounded-sm border-gray-600 outline-none"
            placeholder="What do you want to listen to?"
            ref={ref}
          />
        </span>
      </div>
      <div className="flex w-full flex-col items-start justify-center gap-5 ">
        <div className="flex w-full flex-col text-white">
          <div className="grid grid-cols-2 gap-5 p-2 md:flex md:items-center">
            {search &&
              filters.map((filter) => (
                <button
                  onClick={() => setCurrentFilter(filter.name)}
                  className={`${
                    filter.name === currentFilter
                      ? 'bg-white text-zinc-900'
                      : 'bg-zinc-900 text-white'
                  } rounded-3xl px-5 py-2 font-semibold`}
                  key={filter.name}
                >
                  {filter.name.toUpperCase()}
                </button>
              ))}
          </div>
          <div className="">
            {currentFilter === 'songs' && search && (
              <TrackResults showInfo={true} tracks={tracks} />
            )}
          </div>

          <div className="grid grid-cols-1 gap-5 px-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {search && currentFilter === 'artists' && (
              <ArtistsResults artists={artists} />
            )}
            {search && currentFilter === 'albums' && (
              <AlbumResults albums={albums} />
            )}
            {search && currentFilter === 'playlists' && (
              <PlaylistResults playlists={playlists} />
            )}
            {search && currentFilter === 'users' && (
              <UserResults users={users} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
