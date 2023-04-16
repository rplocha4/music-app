import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import AlbumFront from '../components/Album/AlbumFront';
import TrackResults from '../components/Tracks/TrackResults';
import { BsPlayCircleFill } from 'react-icons/bs';
import { usePlayContextMutation } from '../store/features/SpotifyApi';
import { useDispatch, useSelector } from 'react-redux';
import { PlayerState, makeQueue } from '../store/playerSlice';
import { RootState } from '../store/store';
import AlbumResults from '../components/Album/AlbumResults';
import { BsSuitHeartFill, BsSuitHeart } from 'react-icons/bs';
import { Album as AlbumT } from '../types/types';
import {
  useLikeAlbumMutation,
  useUnlikeAlbumMutation,
} from '../store/features/ServerApi';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const Album = () => {
  const data: any = useLoaderData();

  const { album, isAlbumLiked }: { album: AlbumT; isAlbumLiked: boolean } =
    data;
  const [likeAlbum, likeAlbumResult] = useLikeAlbumMutation();
  const [unlikeAlbum, unlikeAlbumResult] = useUnlikeAlbumMutation();

  const artistAlbums = data.artistAlbums?.items // get only type album and remove duplicates
    .filter((item: any) => item.id !== album.id && item.album_type === 'album')
    .reduce((acc: any, item: any) => {
      if (!acc.find((i: any) => i.name === item.name)) {
        acc.push(item);
      }
      return acc;
    }, []);

  const [likedAlbum, setLikedAlbum] = useState(isAlbumLiked);

  const totalDuration = album.tracks.items.reduce(
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

  const likeAlbumHandler = () => {
    setLikedAlbum(true);
    likeAlbum(album).then((res) => {
      console.log(res.data.message);
    });
  };
  const unlikeAlbumHandler = () => {
    setLikedAlbum(false);
    unlikeAlbum(album.id).then((res) => {
      console.log(res.data.message);
    });
  };

  return (
    <div className="text-white flex flex-col">
      <AlbumFront
        key={album.id}
        name={album.name}
        totalSongs={album.total_tracks}
        artist={album.artists[0].name}
        artistId={album.artists[0].id}
        img={album.images[0].url}
        album_type={
          album.album_type.charAt(0).toUpperCase() + album.album_type.slice(1)
        }
        release_date={album.release_date}
        totalDuration={totalDurationFormatted}
      />
      <div className="flex gap-2 justify-start items-center">
        <BsPlayCircleFill
          className="text-6xl text-green-500 hover:text-green-400 hover:scale-110 hover:cursor-pointer m-5"
          onClick={() => {
            playContext(album.uri);

            dispatch(
              makeQueue(
                album.tracks.items.map((item: any) => {
                  return {
                    ...item,
                    album: {
                      name: album.name,
                      id: album.id,
                      images: album.images,
                    },
                  };
                })
              )
            );
          }}
        />
        {likedAlbum ? (
          <BsSuitHeartFill
            className="text-5xl text-green-600"
            onClick={() => {
              unlikeAlbumHandler();
            }}
          />
        ) : (
          <BsSuitHeart
            className="text-5xl text-gray-400 hover:text-white "
            onClick={() => {
              likeAlbumHandler();
            }}
          />
        )}
      </div>
      <TrackResults
        showInfo={true}
        tracks={album.tracks.items.map((item: any) => {
          return {
            ...item,
            album: {
              name: album.name,
              id: album.id,
              images: album.images,
            },
            artists: item.artists,
          };
        })}
      />
      {artistAlbums?.length > 0 && (
        <>
          <h2 className="text-3xl font-bold p-5">
            More by: {album.artists[0].name}
          </h2>
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
  let isAlbumLiked = false;
  const username = cookies.get('USERNAME');

  const responseLikedAlbum = await fetch(
    `http://localhost:5000/api/isAlbumLiked/${username}/${id}`
  );
  try {
    const data = await responseLikedAlbum.json();

    isAlbumLiked = data.isLiked;
  } catch (error) {
    console.log(error);
  }

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

  return { album, artistAlbums, isAlbumLiked };
}
