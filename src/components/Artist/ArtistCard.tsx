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
      className="flex flex-col justify-center gap-2  bg-zinc-900 rounded-md hover:bg-zinc-700 cursor-pointer"
    >
      <img
        src={image}
        alt="artist image"
        className="rounded-full self-center w-52 h-52 object-cover p-3"
      />
      <div className="p-5">
        <p>{name}</p>
        <p className="font-thin text-gray-300">{type}</p>
      </div>
    </Link>
  );
};

export default ArtistCard;
