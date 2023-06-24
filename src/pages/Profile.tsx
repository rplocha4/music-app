import React from 'react';
import { defer, useLoaderData } from 'react-router-dom';
import Loading from '../components/Animate/Loading';
import { FaUserAlt } from 'react-icons/fa';
import ArtistsResults from '../components/Artist/ArtistsResults';
import AlbumResults from '../components/Album/AlbumResults';
import PlaylistResults from '../components/Playlist/PlaylistResults';
import {
  useFollowUserMutation,
  useFollowingPlaylistQuery,
  useSetProfilePicMutation,
  useUnfollowUserMutation,
  useGetUserQuery,
} from '../store/features/ServerApi';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineEdit } from 'react-icons/ai';
import { hideInfo, showInfo } from '../store/uiSlice';
import UserResults from '../components/User/UserResults';
function Profile() {
  const data: any = useLoaderData();
  const { isFollowing } = data;
  const { username: usernameFromParams } = data;
  const [isFollowingState, setIsFollowingState] = React.useState(isFollowing);
  const [profileHover, setProfileHover] = React.useState(false);
  const avatarRef = React.useRef<HTMLInputElement>(null);

  const { username } = useSelector((state: any) => state.user);

  const {
    data: user,
    isLoading,
    refetch: refetchUser,
  } = useGetUserQuery(usernameFromParams);

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
      setTimeout(() => {
        dispatch(hideInfo());
        refetchUser();
      }, 3000);
    });

    // formData.append('user_id', data.data.user_id);
  };
  if (isLoading) {
    return <Loading />;
  }
  // console.log(user);

  return (
    <div>
      <div className="relative flex bg-zinc-700 p-5">
        <div
          className="relative self-start"
          onMouseEnter={() => {
            setProfileHover(true);
          }}
          onMouseLeave={() => {
            setProfileHover(false);
          }}
        >
          {user.profilePicture ? (
            <img
              src={user.profilePicture}
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
              className="rounded-full bg-zinc-400 p-2"
            />
          )}
          {username === user.user?.username && profileHover && (
            <div
              className="absolute top-0 flex items-center justify-center rounded-full bg-black text-4xl text-white opacity-70"
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
        <div className="ml-5 flex flex-col justify-between text-white">
          <p>Profile</p>
          <p className="text-7xl font-bold">{user?.user.username}</p>
          <div className="flex items-center gap-1 font-semibold">
            {/* <p>{user?.user.followers.length} followers</p>
            <p className="font-extrabold">·</p>

            <p>{user?.user.followingUsers.length} following</p> */}
          </div>
        </div>
      </div>
      {username && username !== user.user?.username && (
        <button
          onClick={() => {
            if (isFollowingState) {
              unfollowUser({
                username,
                user: user.user,
              }).then(() => {
                refetchUser();

                dispatch(showInfo(`Unfollowed ${user.user.username}`));

                setIsFollowingState(false);
              });
            } else {
              followUser({ username, user: user.user }).then(() => {
                dispatch(showInfo(`Followed ${user.user.username}`));
                refetchUser();
                setIsFollowingState(true);
              });
            }
          }}
          className="m-2 grow-0 rounded-md border border-gray-600 p-2 text-white hover:border-white"
        >
          {isFollowingState ? 'Unfollow' : 'Follow'}
        </button>
      )}

      <div className="flex flex-col gap-2 text-white">
        <p className="p-2 text-4xl font-bold">Followed Artists</p>
        <div className="grid grid-cols-1 gap-5 px-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {user?.user.followingArtists.length > 0 ? (
            <ArtistsResults artists={user.user.followingArtists} />
          ) : (
            <p>No followed artists by {user.user.username}</p>
          )}
        </div>

        <p className="p-2 text-4xl font-bold">Liked Albums</p>
        <div className="grid grid-cols-1 gap-5 px-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {user?.user.likedAlbums.length > 0 ? (
            <AlbumResults albums={user.user.likedAlbums} />
          ) : (
            <p>No liked albums by {user.user.username}</p>
          )}
        </div>
      </div>
      {isFetching ? (
        <Loading />
      ) : (
        <div className="text-white">
          <p className="p-2 text-4xl font-bold">Liked Playlists</p>
          <div className="grid grid-cols-1 gap-5 px-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {user?.user.likedPlaylists.length > 0 ? (
              <PlaylistResults playlists={followedPlaylists} />
            ) : (
              <p>No liked playlists by {user.user.username}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;

export async function loader({ params }: any) {
  const { username } = params;

  let isFollowing = false;
  if (localStorage.getItem('USERNAME')) {
    const res = await fetch(
      `https://music-backend-2hi1.onrender.com/api/isFollowingUser/${localStorage.getItem(
        'USERNAME'
      )}/${username}`
    );

    const data = await res.json();
    isFollowing = data.isFollowing;
  }
  return defer({
    isFollowing: isFollowing,
    username,
  });
}
