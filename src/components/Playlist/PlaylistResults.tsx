import React, { useState } from 'react';
import PlaylistCard from './PlaylistCard';
import { Playlist } from '../../types/types';

const PlaylistResults: React.FC<{ playlists: Playlist[] }> = ({
  playlists,
}) => {
  return (
    <>
      {playlists.map((playlist: Playlist) => {
        return (
          <PlaylistCard
            name={playlist.name}
            author={playlist.owner.display_name}
            image={
              (playlist.images && playlist.images[0]?.url) ||
              'http://przyjaznycoaching.pl/wp-content/themes/przyjaznycoaching/assets/img/default-image.jpg'
            }
            id={playlist._id as string}
            key={playlist._id}
          />
        );
      })}
    </>
  );
};

export default PlaylistResults;
