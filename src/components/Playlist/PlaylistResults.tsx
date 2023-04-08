import React, { useState } from 'react';
import PlaylistCard from './PlaylistCard';

const PlaylistResults: React.FC<{ playlists: any }> = ({ playlists }) => {

  return (
    <>
      {playlists.map((playlist: any) => {
        return (
          <PlaylistCard
            name={playlist.name}
            author={playlist.owner.display_name}
            image={
              playlist.images[0]?.url ||
              'http://przyjaznycoaching.pl/wp-content/themes/przyjaznycoaching/assets/img/default-image.jpg'
            }
            uri={playlist.uri}
            key={playlist.id}
          />
        );
      })}
    </>
  );
};

export default PlaylistResults;
