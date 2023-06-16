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
import { Album as AlbumT, TrackItem } from '../types/types';
import {
  useLikeAlbumMutation,
  useUnlikeAlbumMutation,
} from '../store/features/ServerApi';
import Cookies from 'universal-cookie';
import { showInfo } from '../store/uiSlice';
import { formatDuration } from '../utils';
const Album = () => {
  const data: any = useLoaderData();

  const { album, isAlbumLiked }: { album: AlbumT; isAlbumLiked: boolean } =
    data;

  const { username } = useSelector((state: RootState) => state.user);

  const [likeAlbum, likeAlbumResult] = useLikeAlbumMutation();
  const [unlikeAlbum, unlikeAlbumResult] = useUnlikeAlbumMutation();

  const artistAlbums = data.artistAlbums?.items // get only type album and remove duplicates
    .filter((item: AlbumT) => item.id !== album.id)
    .reduce((acc: AlbumT[], item: AlbumT) => {
      if (!acc.find((i: AlbumT) => i.name === item.name)) {
        acc.push(item);
      }
      return acc;
    }, []);

  const [likedAlbum, setLikedAlbum] = useState(isAlbumLiked);

  const totalDuration = album.tracks.items.reduce(
    (acc: number, item: TrackItem) => acc + item.duration_ms,
    0
  );

  const totalDurationFormatted = formatDuration(totalDuration);

  const [playContext, resultPlay] = usePlayContextMutation();
  const dispatch = useDispatch();

  const likeAlbumHandler = () => {
    setLikedAlbum(true);
    likeAlbum(album).then((res: any) => {
      dispatch(showInfo(res.data.message));
    });
  };
  const unlikeAlbumHandler = () => {
    setLikedAlbum(false);
    unlikeAlbum(album).then((res: any) => {
      dispatch(showInfo(res.data.message));
    });
  };

  return (
    <div className="flex flex-col text-white">
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
      <div className="flex items-center justify-start gap-2">
        <BsPlayCircleFill
          className="m-5 text-6xl text-green-500 hover:scale-110 hover:cursor-pointer hover:text-green-400"
          onClick={() => {
            playContext(album.uri);

            dispatch(
              makeQueue(
                album.tracks.items.map((item: TrackItem) => {
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
        {username &&
          (likedAlbum ? (
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
          ))}
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
          <h2 className="p-5 text-3xl font-bold">
            More by: {album.artists[0].name}
          </h2>
          <div className="grid grid-cols-2 gap-5 px-5 sm:grid-cols-3 lg:grid-cols-5">
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

  const responseLikedAlbum = await fetch(
    `https://music-backend-2hi1.onrender.com/api/isAlbumLiked/${localStorage.getItem(
      'USERNAME'
    )}/${id}`
  );
  try {
    const data = await responseLikedAlbum.json();

    isAlbumLiked = data.isLiked;
  } catch (error) {
    // console.log(error);
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
