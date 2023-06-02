import React from 'react';
import { Link } from 'react-router-dom';

const ArtistCard: React.FC<{
  image: string;
  name: string;
  uri: string;
  type: string;
  id: string;
}> = ({ image, name, uri, type, id }) => {
  return (
    <Link
      to={`/artist/${id}`}
      className="flex cursor-pointer flex-col justify-center  gap-2 rounded-md bg-zinc-900 hover:bg-zinc-700"
    >
      <img
        src={image}
        alt="artist image"
        className="h-52 w-52 self-center rounded-full object-cover p-3"
      />
      <div className="p-5">
        <p>{name}</p>
        <p className="font-thin text-gray-300">{type}</p>
      </div>
    </Link>
  );
};

export default ArtistCard;
