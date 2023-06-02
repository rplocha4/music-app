import React from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const UserResults: React.FC<{ users: any }> = ({ users }) => {
  console.log(users);

  return (
    <>
      {users.map((user: any) => {
        return (
          <Link
            to={`/user/${user.user.username}`}
            key={user.user._id}
            className="flex cursor-pointer flex-col items-center  justify-center gap-2  rounded-md bg-zinc-900 p-5 hover:bg-zinc-700  "
          >
            {user.profilePicture ? (
              <img
                src={user.profilePicture}
                alt="profile picture"
                style={{
                  height: '200px',
                  width: '200px',
                }}
                className=" rounded-full"
              />
            ) : (
              <FaUserAlt
                style={{ width: '200px', height: '200px' }}
                className="rounded-full bg-zinc-400 p-2"
              />
            )}
            <div className="self-start">
              <p>{user.user.username}</p>
              <p className="font-thin text-gray-300">user</p>
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default UserResults;
