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
  useIsFollowingPlaylistQuery,
  useRemoveTrackFromPlaylistMutation,
  useUnfollowPlaylistMutation,
} from '../store/features/ServerApi';
import { showInfo } from '../store/uiSlice';
import { useDispatch, useSelector } from 'react-redux';
const Playlist = () => {
  const data: any = useLoaderData();
  const { playlist, id } = data;
  const { username } = useSelector((state: any) => state.user);
  const [deleteSong, res] = useRemoveTrackFromPlaylistMutation();
  const [followPlaylist, followPlaylistResult] = useFollowPlaylistMutation();
  const [unFollowPlaylist, unFollowPlaylistResult] =
    useUnfollowPlaylistMutation();
  const [deletePlaylist, deletePlaylistResult] = useDeletePlaylistMutation();
  const navigate = useNavigate();
  const { data: isFollowingData, refetch } = useIsFollowingPlaylistQuery(id);
  const dispatch = useDispatch();
  return (
    <React.Suspense fallback={<Loading />}>
      <Await resolve={playlist}>
        {(loadedPlaylist: any) => {
          return (
            <div className="w-full flex flex-col text-white p-5 gap-5">
              <div className="flex items-center justify-start h-full">
                <img
                  src={loadedPlaylist.images[0].url}
                  alt="album image"
                  className="rounded-md"
                  style={{ width: '200px', height: '200px' }}
                />
                <div className="flex flex-col px-5 justify-end gap-5 min-h-full">
                  <p>{loadedPlaylist.public ? 'Public ' : 'Private '} </p>
                  <p className="text-5xl font-bold">{loadedPlaylist.name}</p>
                  <p className="text-gray-400">{loadedPlaylist.description}</p>
                  <div className="text-gray-400 flex gap-2">
                    <span className="text-white">
                      Mady by{' '}
                      <Link
                        to={`/user/${loadedPlaylist.owner.display_name}`}
                        className="hover:underline"
                      >
                        {loadedPlaylist.owner.display_name}
                      </Link>
                    </span>
                    <p className="font-extrabold">·</p>
                    <span>{loadedPlaylist.followers.total} likes</span>
                    <p className="font-extrabold">·</p>
                    <span>{loadedPlaylist.tracks.total} songs</span>
                  </div>
                </div>
              </div>
              {loadedPlaylist.createdBy !== localStorage.getItem('ID') ? (
                <button
                  onClick={() => {
                    isFollowingData?.isFollowing
                      ? unFollowPlaylist(loadedPlaylist._id)
                          .then((res: any) => {
                            dispatch(showInfo(res.data.message));
                            refetch();
                          })
                          .catch((err) => console.log(err))
                      : followPlaylist(loadedPlaylist._id)
                          .then((res: any) => {
                            dispatch(showInfo(res.data.message));
                            refetch();
                          })
                          .catch((err) => console.log(err));
                  }}
                  className=" w-24 p-2 border border-gray-600 hover:border-white rounded-md grow-0"
                >
                  {isFollowingData?.isFollowing ? 'Following' : 'Follow'}
                </button>
              ) : (
                username === loadedPlaylist.owner.display_name && (
                  <button
                    onClick={() => {
                      deletePlaylist(loadedPlaylist._id)
                        .then((res: any) => {
                          dispatch(showInfo(res.data.message));
                          navigate(`/playlists`);
                        })
                        .catch((err) => dispatch(showInfo(res.data.message)));
                    }}
                    className=" w-32 p-2 border border-gray-600 text-red-600 hover:border-white rounded-md grow-0"
                  >
                    Delete playlist
                  </button>
                )
              )}

              <TrackResultsSortable
                tracks={loadedPlaylist.tracks.items}
                owner={loadedPlaylist.owner.display_name}
                onDelete={(id) =>
                  deleteSong({
                    playlistId: loadedPlaylist._id,
                    trackId: id,
                  }).then((res: any) => {
                    dispatch(showInfo(res.data.message));
                  })
                }
              />
            </div>
          );
        }}
      </Await>
    </React.Suspense>
  );
};

export default Playlist;

export async function loader({ params }: any) {
  const id = params.id;
  const res = fetch(`http://localhost:5000/api/getPlaylist/${id}`);
  // const res = fetch(`https://api.spotify.com/v1/playlists/${id}`, {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  //   },
  // });
  return defer({
    playlist: res.then((res) => res.json()),
    id: id,
  });
}
