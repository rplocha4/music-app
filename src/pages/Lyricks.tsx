import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import { PlayerState } from '../store/playerSlice';
import { geniusApi } from '../store/features/GeniusApi';
import Loading from '../components/Animate/Loading';
function Lyricks() {
  const [lyricks, setLyricks] = useState('');
  const playerSelector = useSelector<RootState, PlayerState>(
    (state) => state.player
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (playerSelector.current_song.name === '') return;
    let lyricksId = '';
    let options: {
      method: string;
      url: string;
      params: { q: string; per_page: string; page: string } | { id: string };
      headers: { 'X-RapidAPI-Key': string; 'X-RapidAPI-Host': string };
    } = {
      method: 'GET',
      url: 'https://genius-song-lyrics1.p.rapidapi.com/search/',
      params: {
        q: `{${playerSelector.current_song.artists[0].name} ${playerSelector.current_song.name}}`,
        per_page: '10',
        page: '1',
      },
      headers: {
        'X-RapidAPI-Key': '8f5e49604amsh7932ebb0aefea30p1b4c3bjsn7ac20affb784',
        'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com',
      },
    };
    setLoading(true);
    axios
      .request(options)
      .then(function (response) {
        lyricksId = response.data.hits[0].result.id as string;
        options = {
          method: 'GET',
          url: 'https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/',
          params: { id: lyricksId },
          headers: {
            'X-RapidAPI-Key':
              '8f5e49604amsh7932ebb0aefea30p1b4c3bjsn7ac20affb784',
            'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com',
          },
        };
        axios
          .request(options)
          .then(function (response) {
            setLyricks(response.data.lyrics.lyrics.body.html);
            setLoading(false);
          })
          .catch(function (error) {
            console.error(error);
          });
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [playerSelector.current_song.name]);

  if (playerSelector.current_song.name === '')
    return (
      <div className="flex h-full items-center justify-center ">
        <h1 className="text-center text-2xl text-white  ">No song playing</h1>
      </div>
    );

  return (
    <>
      {playerSelector.current_song.name !== '' &&
        (loading ? (
          <Loading />
        ) : (
          <div
            className="text-center text-2xl text-white"
            dangerouslySetInnerHTML={{ __html: lyricks }}
          ></div>
        ))}
    </>
  );
}

export default Lyricks;
