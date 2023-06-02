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
        <div className="col-span-2 flex items-center justify-center text-center">
          Album
        </div>
      ) : (
        <Link
          to={`/album/${id}`}
          className="col-span-2 flex items-center justify-center text-center hover:underline"
        >
          {name}
        </Link>
      )}
    </>
  );
};

export default AlbumInfo;
