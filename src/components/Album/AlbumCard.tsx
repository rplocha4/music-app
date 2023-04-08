import React from 'react';
import { Link } from 'react-router-dom';
import { GoPlay } from 'react-icons/go';
import { useDispatch } from 'react-redux';
import {
  Song,
  setQueue,
} from '../../../../../spotify/frontend/src/store/playerSlice';
import classes from '../Playlist/Modal.module.css';
import { usePlayContextMutation } from '../../../../../spotify/frontend/src/store/features/SpotifyApi';
const AlbumCard: React.FC<{
  name: string;
  image: string;
  year: string;
  id: string;
  artist: string;
  albumUri: string;
}> = ({ name, image, year, id, artist, albumUri }) => {
  const [hover, setHover] = React.useState(false);
  const [hoverClass, setHoverClass] = React.useState('text-green-600');
  const [hoverButton, setHoverButton] = React.useState(false);
  const dispatch = useDispatch();
  const [playContext, result] = usePlayContextMutation();

  const setAlbumQueue = async () => {
    const res = await fetch(`https://api.spotify.com/v1/albums/${id}/tracks`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    const resJson = await res.json();
    const songs = resJson.items.map((song: Song) => {
      return {
        name: song.name,
        artists: song.artists,
        album: { name: name, id: id, images: [{ url: image }] },
        uri: song.uri,
        id: song.id,
        duration_ms: song.duration_ms,
      };
    });
    playContext(albumUri);
    dispatch(setQueue(songs));
  };

  return (
    <Link
      className="flex flex-col p-5 gap-2 bg-zinc-900 hover:bg-zinc-700 cursor-pointer rounded-md "
      title={name}
      to={`${!hoverButton ? '/album/' + id : '#'}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative">
        <img src={image} alt="album image" className="rounded-md" />
        {hover && (
          <GoPlay
            className={`${classes.animate2} absolute bottom-1 right-1 text-5xl rounded-full  border-0 ${hoverClass}`}
            onMouseEnter={() => {
              setHoverClass('scale-95 text-green-500');
              setHoverButton(true);
            }}
            onMouseLeave={() => {
              setHoverClass('text-green-600');
              setHoverButton(false);
            }}
            onMouseDown={() => setHoverClass('text-green-700')}
            onMouseUp={() => setHoverClass('text-green-600')}
            onClick={setAlbumQueue}
          />
        )}
      </div>
      <div className="flex flex-col">
        <p className="whitespace-nowrap overflow-hidden">{name}</p>
        <div className="flex items-center gap-1 font-thin text-gray-300">
          <p>{year}</p>
          <p className="font-extrabold">·</p>
          <p className="whitespace-nowrap overflow-hidden">{artist}</p>
        </div>
      </div>
    </Link>
  );
};

export default AlbumCard;
