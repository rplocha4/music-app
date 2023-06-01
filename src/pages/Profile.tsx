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
  useFollowUserMutation,
  useFollowingPlaylistQuery,
  useSetProfilePicMutation,
  useUnfollowUserMutation,
} from '../store/features/ServerApi';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineEdit } from 'react-icons/ai';
import { hideInfo, showInfo } from '../store/uiSlice';
import UserResults from '../components/User/UserResults';
function Profile() {
  const data = useLoaderData();
  const { user }: any = data;
  const { isFollowing }: any = data;
  const [isFollowingState, setIsFollowingState] = React.useState(isFollowing);
  const [profileHover, setProfileHover] = React.useState(false);
  const avatarRef = React.useRef<HTMLInputElement>(null);

  const { username } = useSelector((state: any) => state.user);

  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();

  // const isUserPage = true;
  const [setProfilePic] = useSetProfilePicMutation();
  const dispatch = useDispatch();

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
    localStorage.setItem('avatar', URL.createObjectURL(file));

    setProfilePic(formData).then((res: any) => {
      dispatch(showInfo(res.data.message));
      window.location.reload();

      setTimeout(() => {
        dispatch(hideInfo());
      }, 3000);
    });

    // formData.append('user_id', data.data.user_id);
  };

  return (
    <div>
      <React.Suspense fallback={<Loading />}>
        <Await resolve={user}>
          {(loadedUser) => {
            // console.log(loadedUser);

            return (
              <>
                <div className="flex p-5 bg-zinc-700 relative">
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
                    {username === loadedUser.user?.username && profileHover && (
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
                    <div className="flex gap-1 items-center font-semibold">
                      <p>{loadedUser?.user.followers.length} followers</p>
                      <p className="font-extrabold">·</p>

                      <p>{loadedUser?.user.followingUsers.length} following</p>
                    </div>
                  </div>
                </div>
                {username && username !== loadedUser.user?.username && (
                  <button
                    onClick={() => {
                      if (isFollowingState) {
                        unfollowUser({
                          username,
                          userId: loadedUser.user.id,
                        }).then((res: any) => {
                          dispatch(showInfo(res.data.message));

                          setIsFollowingState(false);
                        });
                      } else {
                        followUser({ username, user: loadedUser.user }).then(
                          (res: any) => {
                            dispatch(showInfo(res.data.message));
                            setIsFollowingState(true);
                          }
                        );
                      }
                    }}
                    className="m-2 p-2 border border-gray-600 hover:border-white rounded-md grow-0 text-white"
                  >
                    {isFollowingState ? 'Unfollow' : 'Follow'}
                  </button>
                )}
                {/* 
                <div className="text-white">
                  {loadedUser?.user.followingUsers.length > 0 && (
                    <>
                      <p className="font-bold text-4xl p-2">Followed Users</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 px-2">
                        <UserResults
                          users={loadedUser.user.followingUsers.map(
                            (user: any) => {
                              return {
                                user,
                                profilePicture: user.profilePicture,
                              };
                            }
                          )}
                        />
                      </div>
                    </>
                  )}
                </div> */}

                <div className="text-white flex flex-col gap-2">
                  <p className="font-bold text-4xl p-2">Followed Artists</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 px-2">
                    {loadedUser?.user.followingArtists.length > 0 ? (
                      <ArtistsResults
                        artists={loadedUser.user.followingArtists}
                      />
                    ) : (
                      <p>No followed artists by {loadedUser.user.username}</p>
                    )}
                  </div>

                  <p className="font-bold text-4xl p-2">Liked Albums</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 px-2">
                    {loadedUser?.user.likedAlbums.length > 0 ? (
                      <AlbumResults albums={loadedUser.user.likedAlbums} />
                    ) : (
                      <p>No liked albums by {loadedUser.user.username}</p>
                    )}
                  </div>
                </div>
                {isFetching ? (
                  <Loading />
                ) : (
                  <div className="text-white">
                    <p className="font-bold text-4xl p-2">Liked Playlists</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 px-2">
                      {loadedUser?.user.likedPlaylists.length > 0 ? (
                        <PlaylistResults playlists={followedPlaylists} />
                      ) : (
                        <p>No liked playlists by {loadedUser.user.username}</p>
                      )}
                    </div>
                  </div>
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
  const res = await fetch(
    `http://localhost:5000/api/isFollowingUser/${localStorage.getItem(
      'USERNAME'
    )}/${username}`
  );
  const isFollowing = await res.json();
  return defer({
    user: data.then((res) => res.json()),
    isFollowing: isFollowing.isFollowing,
  });
}
