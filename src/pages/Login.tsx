import React from 'react';

const redirectUri = 'http://localhost:5173';

const client_id = '36308efa2dd24d35a35792a4c4698fda';

const scopses = [
  'user-top-read',
  'playlist-modify-private',
  'playlist-modify-public',
  'user-read-playback-position',
  'user-read-recently-played',
  'user-top-read',
  'streaming',
  'app-remote-control',
  'user-read-email',
  'user-read-private',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
];

export const loginUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirectUri}&scope=${scopses.join(
  '%20'
)}&response_type=code&show_dialog=true`;
function Login() {
  return (
    <div className="flex justify-center items-center h-screen ">
      <a className="bg-green-400 rounded-xl p-5 text-2xl " href={loginUrl}>
        Login with Spotify
      </a>
    </div>
  );
}

export default Login;
