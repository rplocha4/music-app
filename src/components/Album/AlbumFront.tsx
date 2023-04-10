import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useGetArtistInfoQuery } from '../../store/features/SpotifyApi';
import Loading from '../Animate/Loading';
const AlbumFront: React.FC<{
  name: string;
  totalSongs: string;
  artist: string;
  img: string;
  album_type: string;
  totalDuration: string;
  release_date: string;
  artistId: string;
}> = ({
  name,
  totalSongs,
  artist,
  img,
  album_type,
  release_date,
  totalDuration,
  artistId,
}) => {
  const { data: artistImg } = useGetArtistInfoQuery(artistId);
  const [dominantColor, setDominantColor] = useState<string>('bg-zinc-500');
  const [accent, setAccent] = useState<string>('bg-zinc-500');
  const [other, setOther] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get('https://api.sightengine.com/1.0/check.json', {
        params: {
          url: img,
          models: 'properties',
          api_user: '1057867342',
          api_secret: 'Y8Gq7nE7kesuK3Yhqmc6',
        },
      })
      .then((res) => {
        setDominantColor(res.data.colors.dominant.hex);
        setAccent(
          res.data.colors.accent
            ? res.data.colors.accent[0].hex
            : res.data.colors.other[0].hex
        );
        setOther(res.data.colors.other[0].hex);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [img]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div
          className="flex p-5 "
          style={{
            background: `linear-gradient(${dominantColor}, ${accent})`,
            boxShadow: `0px 0px 50px 30px ${accent}`,
          }}
        >
          <img
            src={img}
            alt=""
            style={{
              height: '200px',
              width: '200px',
              boxShadow: `0px 0px 60px 5px ${other}`,
            }}
            className="self-end"
          />
          <div className="flex flex-col px-5 justify-end gap-3">
            <p>{album_type}</p>
            <p
              className="font-bold"
              style={{
                fontSize: name.split(' ')?.length > 5 ? '40px' : '60px',
              }}
            >
              {name}
            </p>
            <div className="flex gap-1 items-center font-semibold">
              <img
                src={artistImg?.images[0].url}
                alt=""
                style={{ height: '30px', width: '30px' }}
                className="rounded-full object-fill"
              />
              <Link to={`/artist/${artistId}`} className="hover:underline">
                {artist}
              </Link>
              <p className="font-extrabold">·</p>
              <p>{release_date}</p>
              <p className="font-extrabold">·</p>
              <p>{totalSongs} songs,</p>
              <p className="font-semibold text-gray-300 ">{totalDuration}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AlbumFront;
