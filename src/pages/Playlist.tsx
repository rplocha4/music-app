import React from 'react';
import {
  Await,
  Link,
  defer,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import Loading from '../components/Animate/Loading';
import TrackResults from '../components/Tracks/TrackResults';
import Cookies from 'universal-cookie';
import TrackResultsSortable from '../components/Tracks/TrackResultsSortable';
import {
  useDeletePlaylistMutation,
  useFollowPlaylistMutation,
  useGetPlaylistInfoQuery,
  useIsFollowingPlaylistQuery,
  useRemoveTrackFromPlaylistMutation,
  useUnfollowPlaylistMutation,
} from '../store/features/ServerApi';
import { showInfo } from '../store/uiSlice';
import { useDispatch, useSelector } from 'react-redux';
const Playlist = () => {
  const data: any = useLoaderData();
  const { id } = data;
  const {
    data: playlist,
    refetch: refetchPlaylist,
    isLoading,
  } = useGetPlaylistInfoQuery(id);
  const { username } = useSelector((state: any) => state.user);
  const [deleteSong, res] = useRemoveTrackFromPlaylistMutation();
  const [followPlaylist] = useFollowPlaylistMutation();
  const [unFollowPlaylist] = useUnfollowPlaylistMutation();
  const [deletePlaylist] = useDeletePlaylistMutation();
  const navigate = useNavigate();
  const { data: isFollowingData, refetch } = useIsFollowingPlaylistQuery(id);
  const dispatch = useDispatch();

  if (isLoading) return <Loading />;
  return (
    <div className="flex w-full flex-col gap-5 p-5 text-white">
      <div className="flex h-full items-center justify-start">
        <img
          src={playlist.images[0].url}
          alt="album image"
          className="rounded-md"
          style={{ width: '200px', height: '200px' }}
        />
        <div className="flex min-h-full flex-col justify-end gap-5 px-5">
          <p>{playlist.public ? 'Public ' : 'Private '} </p>
          <p className="text-5xl font-bold">{playlist.name}</p>
          <p className="text-gray-400">{playlist.description}</p>
          <div className="flex gap-2 text-gray-400">
            <span className="text-white">
              Mady by{' '}
              <Link
                to={`/user/${playlist.owner.display_name}`}
                className="hover:underline"
              >
                {playlist.owner.display_name}
              </Link>
            </span>
            <p className="font-extrabold">·</p>
            <span>{playlist.followers.total} likes</span>
            <p className="font-extrabold">·</p>
            <span>{playlist.tracks.total} songs</span>
          </div>
        </div>
      </div>
      {playlist.createdBy !== localStorage.getItem('ID') ? (
        <button
          onClick={() => {
            isFollowingData?.isFollowing
              ? unFollowPlaylist(playlist._id)
                  .then((res: any) => {
                    dispatch(showInfo(res.data.message));
                    refetch();
                  })
                  .catch((err) => {
                    // console.log(err);
                  })
              : followPlaylist(playlist._id)
                  .then((res: any) => {
                    dispatch(showInfo(res.data.message));
                    refetch();
                  })
                  .catch((err) => {
                    // console.log(err);
                  });
          }}
          className=" w-24 grow-0 rounded-md border border-gray-600 p-2 hover:border-white"
        >
          {isFollowingData?.isFollowing ? 'Following' : 'Follow'}
        </button>
      ) : (
        username === playlist.owner.display_name && (
          <button
            onClick={() => {
              deletePlaylist(playlist._id)
                .then((res: any) => {
                  dispatch(showInfo(res.data.message));
                  navigate(`/playlists`);
                })
                .catch((err) => dispatch(showInfo(res.data.message)));
            }}
            className=" w-32 grow-0 rounded-md border border-gray-600 p-2 text-red-600 hover:border-white"
          >
            Delete playlist
          </button>
        )
      )}

      <TrackResultsSortable
        tracks={playlist.tracks.items}
        owner={playlist.owner.display_name}
        onDelete={(id) =>
          deleteSong({
            playlistId: playlist._id,
            trackId: id,
          })
            .then((res: any) => {
              dispatch(showInfo(res.data.message));
              refetchPlaylist();
            })
            .catch((err) => {
              // console.log(err);
            })
        }
      />
    </div>
  );
};

export default Playlist;

export async function loader({ params }: any) {
  const id = params.id;
  // const res = fetch(`https://music-backend-2hi1.onrender.com/api/getPlaylist/${id}`);
  // const res = fetch(`https://api.spotify.com/v1/playlists/${id}`, {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  //   },
  // });
  return defer({
    // playlist: res.then((res) => res.json()),
    id: id,
  });
}
