import React, { useState } from 'react';
import CreatePlaylist from '../components/Playlist/CreatePlaylist';
import { Await, Link, defer, useLoaderData } from 'react-router-dom';
import Modal from '../components/Playlist/Modal';
import Loading from '../components/Animate/Loading';
import PlaylistResults from '../components/Playlist/PlaylistResults';
import { useGetUserPlaylistsQuery } from '../store/features/ServerApi';

const Playlists = () => {
  const [formIsShown, setFormIsShown] = useState<boolean>(false);
  const { data, refetch, isLoading } = useGetUserPlaylistsQuery();

  const handleFormClose = () => {
    setFormIsShown(false);
  };

  return (
    <div className="flex flex-col text-white p-3">
      <h1 className="text-4xl font-bold p-3 mb-5">Your Playlists</h1>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {data.userPlaylists.length === 0 ? (
            <div className="flex flex-col">
              <p>You have no playlists yet. Create first one.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
              <PlaylistResults playlists={data.userPlaylists} />
            </div>
          )}
        </>
      )}

      <div>
        <h2 className="text-2xl font-bold p-2">Create new playlist</h2>
        <button
          className="flex justify-center items-center text-8xl pb-4 h-40 w-40 bg-zinc-700 hover:bg-zinc-600 "
          onClick={() => setFormIsShown(true)}
        >
          +
        </button>
      </div>
      {formIsShown && (
        <Modal onClose={handleFormClose}>
          <CreatePlaylist
            onClose={handleFormClose}
            onCreated={() => refetch()}
          />
        </Modal>
      )}
    </div>
  );
};

export default Playlists;
