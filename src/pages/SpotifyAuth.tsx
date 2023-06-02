import { BsSpotify } from 'react-icons/bs';

const redirectUri = 'http://localhost:5173';
const client_id = 'fed249ef83ac4c5e8259bf7f8ffff291';

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
function SpotifyAuth() {
  return (
    <div className="flex flex-col gap-10 justify-center items-center h-screen ">
      <a
        className=" text-green-600 font-extrabold rounded-xl p-5 text-2xl flex flex-col gap-10 justify-center items-center"
        href={loginUrl}
      >
        <BsSpotify className="text-9xl " />
        Login with Spotify
      </a>
    </div>
  );
}

export default SpotifyAuth;
