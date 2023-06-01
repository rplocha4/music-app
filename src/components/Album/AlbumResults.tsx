import React from 'react';
import AlbumCard from './AlbumCard';
import { Album } from '../../types/types';

const AlbumResults: React.FC<{ albums: Album[] }> = ({ albums }) => {
  return (
    <>
      {albums.map((album: Album, i: number) => {
        return (
          <AlbumCard
            name={album.name}
            image={album.images[0].url}
            year={album.release_date.slice(0, 4)}
            id={album.id}
            artist={album.artists[0].name}
            key={i}
            albumUri={album.uri}
          />
        );
      })}
    </>
  );
};

export default AlbumResults;
