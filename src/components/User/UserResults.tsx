import React from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const UserResults: React.FC<{ users: any }> = ({ users }) => {
  return (
    <>
      {users.map((user: any) => {
        console.log(user);

        return (
          <Link
            to={`/user/${user.user.username}`}
            key={user.user._id}
            className="flex flex-col justify-center items-center  p-5 gap-2  bg-zinc-900 rounded-md hover:bg-zinc-700 cursor-pointer  "
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
                className="bg-zinc-400 p-2 rounded-full"
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
