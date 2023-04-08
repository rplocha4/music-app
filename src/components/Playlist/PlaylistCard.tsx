import React from 'react';

const PlaylistCard: React.FC<{
  name: string;
  author: string;
  image: string;
  uri: string;
}> = ({ name, author, image, uri }) => {
  return (
    <div className="flex flex-col p-5 gap-2 bg-zinc-900 hover:bg-zinc-700 cursor-pointer rounded-md">
      <img src={image} alt="album image" className="rounded-md" />
      <div className="flex flex-col">
        <p className="whitespace-nowrap overflow-hidden">{name}</p>
        <div className="flex items-center gap-1 font-thin text-gray-300">
          <p>{author}</p>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;
