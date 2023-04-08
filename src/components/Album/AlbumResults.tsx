import React from 'react';
import AlbumCard from './AlbumCard';

const AlbumResults: React.FC<{ albums: any }> = ({ albums }) => {
  return (
    <>
      {albums.map((album: any, i: number) => {
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
