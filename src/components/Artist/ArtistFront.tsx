import React, { useEffect, useState } from 'react';

const ArtistFront: React.FC<{
  followers: number;
  name: string;
  img: string;
}> = ({ followers, name, img }) => {
  //   convert followers to string in format 12,345,678
  const followersString = followers
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <div
      className="flex flex-col p-5 gap-6 justify-end"
      style={{
        backgroundImage: `url(${img})`,
        height: '450px',
        width: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1 className="text-9xl font-bold text-white">{name}</h1>
      <h2 className="text-white font-semibold p-2">
        {followersString} followers
      </h2>
    </div>
  );
};

export default ArtistFront;
