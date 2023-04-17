import React from 'react';
import { Link } from 'react-router-dom';

const AlbumInfo: React.FC<{ id: string; name: string; i: string }> = ({
  id,
  name,
  i,
}) => {
  return (
    <>
      {i === '#' ? (
        <div className="flex items-center justify-center col-span-2 text-center">
          Album
        </div>
      ) : (
        <Link
          to={`/album/${id}`}
          className="flex items-center justify-center col-span-2 hover:underline text-center"
        >
          {name}
        </Link>
      )}
    </>
  );
};

export default AlbumInfo;
