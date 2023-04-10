import React, { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import AlbumFront from '../components/Album/AlbumFront';
import TrackResults from '../components/Tracks/TrackResults';
import { BsPlayCircleFill } from 'react-icons/bs';
import { usePlayContextMutation } from '../store/features/SpotifyApi';
import { useDispatch, useSelector } from 'react-redux';
import { PlayerState, makeQueue } from '../store/playerSlice';
import { RootState } from '../store/store';
import AlbumResults from '../components/Album/AlbumResults';
const Album = () => {
  const data: any = useLoaderData();
  const {
    name,
    images,
    release_date,
    artists,
    tracks,
    album_type,
    total_tracks,
    id,
    uri,
  } = data.album;

  const artistAlbums = data.artistAlbums?.items // get only type album and remove duplicates
    .filter((item: any) => item.id !== id && item.album_type === 'album')
    .reduce((acc: any, item: any) => {
      if (!acc.find((i: any) => i.name === item.name)) {
        acc.push(item);
      }
      return acc;
    }, []);

  const totalDuration = tracks.items.reduce(
    (acc: number, item: any) => acc + item.duration_ms,
    0
  );
  const minutes = Math.floor(totalDuration / 60000);
  const seconds = ((totalDuration % 60000) / 1000).toFixed(0);
  const totalDurationFormatted = `${minutes} min ${
    seconds === '60' ? '00' : seconds
  } sec`;

  const [playContext, resultPlay] = usePlayContextMutation();
  const dispatch = useDispatch();
  const playerSelector = useSelector<RootState, PlayerState>(
    (state) => state.player
  );

  return (
    <div className="text-white flex flex-col">
      <AlbumFront
        key={id}
        name={name}
        totalSongs={total_tracks}
        artist={artists[0].name}
        artistId={artists[0].id}
        img={images[0].url}
        album_type={album_type.charAt(0).toUpperCase() + album_type.slice(1)}
        release_date={release_date}
        totalDuration={totalDurationFormatted}
      />
      <BsPlayCircleFill
        className="text-6xl text-green-500 hover:text-green-400 hover:scale-110 hover:cursor-pointer m-5"
        onClick={() => {
          playContext(uri);

          dispatch(
            makeQueue(
              tracks.items.map((item: any) => {
                return {
                  ...item,
                  album: { name, id, images },
                };
              })
            )
          );
        }}
      />
      <TrackResults
        showInfo={true}
        tracks={tracks.items.map((item: any) => {
          return {
            ...item,
            album: { name, id, images },
            artists: item.artists,
          };
        })}
      />
      {artistAlbums?.length > 0 && (
        <>
          <h2 className="text-3xl font-bold p-5">More by: {artists[0].name}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 px-5">
            <AlbumResults albums={artistAlbums} />
          </div>
        </>
      )}
    </div>
  );
};

export default Album;

export async function loader({ params }: any) {
  const id = params.id;
  let response = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  const album = await response.json();

  response = await fetch(
    `https://api.spotify.com/v1/artists/${album.artists[0].id}/albums`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }
  );
  const artistAlbums = await response.json();

  return { album, artistAlbums };
}
