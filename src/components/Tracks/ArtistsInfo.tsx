import React from 'react';
import { Artist } from '../../types/types';
import { Link } from 'react-router-dom';
import { getIdFromUri } from '../../utils';

const ArtistsInfo: React.FC<{ artists: Artist[] }> = ({ artists }) => {
  return (
    <>
      {artists.map(({ name, id, uri }, i) => {
        return (
          <Link
            to={`/artist/${id || getIdFromUri(uri)}`}
            className="font-extralight hover:underline"
            key={i}
          >
            {`${i === artists.length - 1 ? name : name + ', '}`}
          </Link>
        );
      })}
    </>
  );
};

export default ArtistsInfo;
