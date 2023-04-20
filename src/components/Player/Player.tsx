import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store/store';
import {
  PlayerState,
  setCurrentSong,
  setPlaying,
} from '../../store/playerSlice';
import { Link, NavLink } from 'react-router-dom';
import Volume from './Volume';
import Controlls from './Controlls';
import SongProgress from './SongProgress';
import { getSmallestImage, getIdFromUri } from '../../utils';
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from 'react-icons/md';
import { TbMicrophone2 } from 'react-icons/tb';
import LikeTrack from '../Tracks/LikeTrack';

const Player: React.FC = () => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('accessToken')
  );
  const playerSelector = useSelector<RootState, PlayerState>(
    (state) => state.player
  );

  const [device_id, setDeviceId] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [hovering, setHovering] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setAccessToken(token);
  }, [localStorage.getItem('accessToken')]);

  useEffect(() => {
    if (!accessToken) return;

    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: (cb) => {
          cb(accessToken);
        },
        volume: 0.3,
      });

      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        localStorage.setItem('device_id', device_id);
        setDeviceId(device_id);
      });

      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      player.addListener('player_state_changed', (state) => {
        if (!state) {
          return;
        }
        const current_track = state.track_window.current_track;
        current_track?.name !== undefined &&
          dispatch(
            setCurrentSong({
              name: current_track.name,
              artists: current_track.artists,
              album: current_track.album,
              uri: current_track.uri,
              id: current_track.id,
              duration_ms: current_track.duration_ms,
              position: 0,
            })
          );

        // setPaused(state.paused);
        dispatch(setPlaying(!state.paused));

        // player?.getCurrentState().then((state) => {
        //   state && setPlayerState(state);
        //   // !state ? setActive(false) : setActive(true);
        // });
      });
      player.connect();
    };
  }, [accessToken]);

  useEffect(() => {
    device_id && localStorage.setItem('device_id', device_id);
  }, [device_id]);

  return (
    <div className="flex justify-between items-center p-4 bg-zinc-900 text-white opacity-95 h-24">
      <div className="flex justify-start items-center gap-2 w-80 text-left ">
        <div
          className={`w-1/6 h-auto ${
            isExpanded && 'absolute bottom-24 left-0'
          } `}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          <div className="relative">
            {hovering &&
              (!isExpanded ? (
                <MdOutlineKeyboardArrowUp
                  className="absolute top-1 right-1 text-2xl bg-black rounded-full opacity-70 hover:opacity-100
               text-gray-300 hover:scale-110 hover:text-white"
                  onClick={() => {
                    setIsExpanded(true);
                    setHovering(false);
                  }}
                />
              ) : (
                <MdOutlineKeyboardArrowDown
                  className="absolute top-1 right-1 text-2xl bg-black rounded-full opacity-70 hover:opacity-100
                text-gray-300 hover:scale-110 hover:text-white"
                  onClick={() => {
                    setIsExpanded(false);
                    setHovering(false);
                  }}
                />
              ))}
            <img
              className="object-cover w-full"
              src={
                playerSelector.current_song.uri &&
                playerSelector.current_song.album.images[0].url
              }
              alt=""
            />
          </div>
        </div>
        <div className="flex flex-col justify-center  overflow-hidden whitespace-nowrap">
          <Link
            to={`/album/${
              playerSelector.current_song.album.id ||
              getIdFromUri(playerSelector.current_song.album.uri)
            }`}
            className="font-semibold hover:underline"
          >
            {playerSelector?.current_song.name}
          </Link>
          <div className="flex gap-1">
            {playerSelector.current_song.artists.map((artist, i) => (
              <Link
                key={artist.id || getIdFromUri(artist.uri)}
                to={`/artist/${artist.id || getIdFromUri(artist.uri)}`}
                className="font-extralight hover:underline"
              >
                {`${
                  i === playerSelector.current_song.artists.length - 1
                    ? artist.name
                    : artist.name + ', '
                }`}
              </Link>
            ))}
          </div>
        </div>
        {playerSelector.current_song?.id && (
          <LikeTrack track={playerSelector.current_song} />
        )}
      </div>
      <div className="flex flex-col justify-center gap-3">
        <div className="flex justify-center items-center gap-3">
          <Controlls />
        </div>
        <div className="flex justify-center items-center">
          <SongProgress />
        </div>
      </div>
      <div className="flex items-center gap-1">
        <NavLink
          to={`/lyricks`}
          className={({ isActive, isPending }) =>
            isPending
              ? 'text-gray-400'
              : isActive
              ? 'text-green-500 font-bold scale-110'
              : ''
          }
        >
          <TbMicrophone2 className="cursor-pointer active:scale-90" />
        </NavLink>
        <Volume />
      </div>
    </div>
  );
};

export default Player;
