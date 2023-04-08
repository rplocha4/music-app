import React, { useState } from 'react';
import CreatePlaylist from '../components/Playlist/CreatePlaylist';
import { Link } from 'react-router-dom';
import Modal from '../components/Playlist/Modal';

const Playlists = () => {
  const [playlists, setPlaylists] = useState<any>([]);
  const [formIsShown, setFormIsShown] = useState<boolean>(false);

  const handleFormClose = () => {
    setFormIsShown(false);
  };

  return (
    <div className="flex flex-col text-white p-3">
      <h1 className="text-4xl font-bold p-3 mb-5">Your Playlists</h1>
      {playlists.length === 0 && (
        <div className="flex flex-col">
          <p>You have no playlists yet. Create first one.</p>
          <button
            className="flex justify-center items-center text-8xl pb-4 h-40 w-40 bg-zinc-700 hover:bg-zinc-600 "
            onClick={() => setFormIsShown(true)}
          >
            +
          </button>
          {formIsShown && (
            <Modal onClose={handleFormClose}>
              <CreatePlaylist onClose={handleFormClose} />
            </Modal>
          )}
        </div>
      )}
    </div>
  );
};

export default Playlists;
