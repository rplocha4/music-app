import React from 'react';
import ArtistCard from './ArtistCard';

const ArtistsResults: React.FC<{ artists: any }> = ({ artists }) => {
  return (
    <>
      {artists.map((artist: any) => {
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
