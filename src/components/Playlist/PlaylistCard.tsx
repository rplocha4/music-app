import React from 'react';
import { Link } from 'react-router-dom';

const PlaylistCard: React.FC<{
  name: string;
  author: string;
  image: string;
  id: string;
}> = ({ name, author, image, id }) => {
  return (
    <Link
      to={`/playlist/${id}`}
      className="flex cursor-pointer flex-col gap-2 rounded-md bg-zinc-900 p-5 hover:bg-zinc-700"
    >
      <img
        src={image}
        alt="album image"
        className="h-full w-full rounded-md "
      />
      <div className="flex flex-col">
        <p className="overflow-hidden whitespace-nowrap">{name}</p>
        <div className="flex items-center gap-1 font-thin text-gray-300">
          Created by <p>{author}</p>
        </div>
      </div>
    </Link>
  );
};

export default PlaylistCard;
