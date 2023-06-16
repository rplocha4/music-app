import React, { useEffect, useState } from 'react';
import CreatePlaylist from '../components/Playlist/CreatePlaylist';
import { Await, Link, Navigate, defer, useLoaderData } from 'react-router-dom';
import Modal from '../components/Playlist/Modal';
import Loading from '../components/Animate/Loading';
import PlaylistResults from '../components/Playlist/PlaylistResults';
import { useGetUserPlaylistsQuery } from '../store/features/ServerApi';
import { useSelector } from 'react-redux';

const Playlists = () => {
  const [formIsShown, setFormIsShown] = useState<boolean>(false);

  const { username } = useSelector((state: any) => state.user);
  if (!username) {
    return <Navigate to="/" replace />;
  }
  const { data, refetch, isLoading } = useGetUserPlaylistsQuery('', {
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });

  const handleFormClose = () => {
    setFormIsShown(false);
  };

  return (
    <div className="flex flex-col p-3 text-white">
      <h1 className="mb-5 p-3 text-4xl font-bold">Your Playlists</h1>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {data.length === 0 ? (
            <div className="flex flex-col">
              <p>You have no playlists yet. Create first one.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              <PlaylistResults playlists={data} />
            </div>
          )}
        </>
      )}

      <div>
        <h2 className="p-2 text-2xl font-bold">Create new playlist</h2>
        <button
          className="flex h-40 w-40 items-center justify-center bg-zinc-700 pb-4 text-8xl hover:bg-zinc-600 "
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
