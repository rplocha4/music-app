import React from 'react';
import ArtistCard from './ArtistCard';
import { Artist } from '../../types/types';

const ArtistsResults: React.FC<{ artists: Artist[] }> = ({ artists }) => {
  return (
    <>
      {artists.map((artist: Artist) => {
        return (
          <ArtistCard
            image={
              artist.images[0]?.url ||
              'http://przyjaznycoaching.pl/wp-content/themes/przyjaznycoaching/assets/img/default-image.jpg'
            }
            name={artist.name}
            uri={artist.uri}
            type={artist.type}
            key={artist.id}
            id={artist.id}
          />
        );
      })}
    </>
  );
};

export default ArtistsResults;
