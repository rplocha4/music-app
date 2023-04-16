import React from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';
import Loading from '../components/Animate/Loading';
import { FaUserAlt } from 'react-icons/fa';
import ArtistsResults from '../components/Artist/ArtistsResults';
function Profile() {
  const data = useLoaderData();
  const { user }: any = data;

  return (
    <div>
      <React.Suspense fallback={<Loading />}>
        <Await resolve={user}>
          {(loadedUser) => {
            console.log();

            return (
              <>
                <div className="flex p-5 bg-slate-600">
                  {loadedUser?.image ? (
                    <img
                      src={loadedUser.image}
                      alt=""
                      style={{
                        height: '200px',
                        width: '200px',
                      }}
                      className="self-end"
                    />
                  ) : (
                    <FaUserAlt
                      style={{ width: '200px', height: '200px' }}
                      className="bg-zinc-400 p-2 rounded-full"
                    />
                  )}
                  <div className="flex flex-col justify-between ml-5 text-white">
                    <p>Profile</p>
                    <p className="font-bold text-7xl">
                      {loadedUser?.user.username}
                    </p>
                    <p>followers</p>
                  </div>
                </div>
                <div className="text-white flex flex-col gap-2">
                  <p className="p-2 text-3xl font-semi-bold">
                    Following Artists
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 px-2">
                    <ArtistsResults
                      artists={loadedUser.user.followingArtists}
                    />
                  </div>
                </div>
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