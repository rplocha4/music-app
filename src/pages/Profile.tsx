import React, { useEffect } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';
import Loading from '../components/Animate/Loading';
import { FaUserAlt } from 'react-icons/fa';
import ArtistsResults from '../components/Artist/ArtistsResults';
import AlbumResults from '../components/Album/AlbumResults';
import PlaylistResults from '../components/Playlist/PlaylistResults';
import { Playlist } from '../types/types';
import {
  useFollowArtistMutation,
  useFollowingPlaylistQuery,
  useSetProfilePicMutation,
} from '../store/features/ServerApi';
import { useSelector } from 'react-redux';
import { AiOutlineEdit } from 'react-icons/ai';
function Profile() {
  const data = useLoaderData();
  const { user }: any = data;
  const [profileHover, setProfileHover] = React.useState(false);
  const avatarRef = React.useRef<HTMLInputElement>(null);

  const { username } = useSelector((state: any) => state.user);
  const isUserPage = true;
  const [setProfilePic] = useSetProfilePicMutation();

  const {
    data: followedPlaylists,
    refetch,
    isFetching,
  } = useFollowingPlaylistQuery('', {
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });

  const updateProfileHandler = (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    setProfilePic(formData);
    // formData.append('user_id', data.data.user_id);
  };

  return (
    <div>
      <React.Suspense fallback={<Loading />}>
        <Await resolve={user}>
          {(loadedUser) => {
            // console.log(loadedUser.profilePicture);

            return (
              <>
                <div className="flex p-5 bg-slate-600 relative">
                  <div
                    className="self-start relative"
                    onMouseEnter={() => {
                      setProfileHover(true);
                    }}
                    onMouseLeave={() => {
                      setProfileHover(false);
                    }}
                  >
                    {loadedUser.profilePicture ? (
                      <img
                        src={loadedUser.profilePicture}
                        alt="profile picture"
                        style={{
                          height: '200px',
                          width: '200px',
                        }}
                        className="self-end rounded-full"
                      />
                    ) : (
                      <FaUserAlt
                        style={{ width: '200px', height: '200px' }}
                        className="bg-zinc-400 p-2 rounded-full"
                      />
                    )}
                    {isUserPage && profileHover && (
                      <div
                        className="absolute bg-black opacity-70 top-0 rounded-full flex justify-center items-center text-4xl text-white"
                        style={{ height: '200px', width: '200px' }}
                        onClick={() => {
                          avatarRef.current?.click();
                        }}
                      >
                        <AiOutlineEdit />
                        <input
                          type="file"
                          accept="image/*"
                          ref={avatarRef}
                          className="hidden"
                          onChange={() => {
                            if (avatarRef.current?.files) {
                              updateProfileHandler(avatarRef.current.files[0]);
                            }
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-between ml-5 text-white">
                    <p>Profile</p>
                    <p className="font-bold text-7xl">
                      {loadedUser?.user.username}
                    </p>
                    <p>followers</p>
                  </div>
                </div>
                <div className="text-white flex flex-col gap-2">
                  {loadedUser?.user.followingArtists.length > 0 && (
                    <>
                      <p className="font-bold text-4xl p-2">Followed Artists</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 px-2">
                        <ArtistsResults
                          artists={loadedUser.user.followingArtists}
                        />
                      </div>
                    </>
                  )}
                  {loadedUser?.user.likedAlbums.length > 0 && (
                    <>
                      <p className="font-bold text-4xl p-2">Liked Albums</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 px-2">
                        <AlbumResults albums={loadedUser.user.likedAlbums} />
                      </div>
                    </>
                  )}
                </div>
                {isFetching ? (
                  <Loading />
                ) : (
                  followedPlaylists?.length > 0 && (
                    <div className="text-white">
                      <p className="font-bold text-4xl p-2">Liked Playlists</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 px-2">
                        <PlaylistResults playlists={followedPlaylists} />
                      </div>
                    </div>
                  )
                )}
              </>
            );
          }}
        </Await>
      </React.Suspense>
    </div>
  );
}

export default Profile;

export async function loader({ params }: any) {
  const { username } = params;
  const data = fetch(`http://localhost:5000/api/user/${username}`);
  return defer({
    user: data.then((res) => res.json()),
  });
}
