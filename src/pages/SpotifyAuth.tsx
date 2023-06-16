import { BsSpotify } from 'react-icons/bs';

const redirectUri = 'https://music-app-rplocha4.vercel.app/';
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
    <div className="flex h-screen flex-col items-center justify-center gap-10 ">
      <a
        className=" flex flex-col items-center justify-center gap-10 rounded-xl p-5 text-2xl font-extrabold text-green-600"
        href={loginUrl}
      >
        <BsSpotify className="text-9xl " />
        Login with Spotify
      </a>
    </div>
  );
}

export default SpotifyAuth;
