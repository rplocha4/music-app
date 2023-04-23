import React, { useEffect } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { FiHome } from 'react-icons/fi';
import { IoLogOutOutline } from 'react-icons/io5';
import { MdQueueMusic } from 'react-icons/md';
import { RiPlayList2Fill } from 'react-icons/ri';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const Navbar = () => {
  const [username, setUsername] = React.useState(
    localStorage.getItem('USERNAME')
  );
  const navigate = useNavigate();
  const routes = [
    { name: 'Home', path: '/home', icon: <FiHome className="mr-2" /> },
    { name: 'Search', path: '/search', icon: <BsSearch className="mr-2" /> },
    {
      name: 'Queue',
      path: '/queue',
      icon: <MdQueueMusic className="mr-2" />,
    },
    {
      name: 'Playlists',
      path: '/playlists',
      icon: <RiPlayList2Fill className="mr-2" />,
    },
    {
      name: 'Liked Songs',
      path: `/likedSongs/${username}`,
      icon: (
        <AiFillHeart
          style={{
            background:
              'linear-gradient(129deg, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)',
          }}
          className="mr-2 bg-red-400 p-1"
        />
      ),
    },
  ];
  useEffect(() => {
    setUsername(localStorage.getItem('USERNAME'));
  }, [localStorage.getItem('USERNAME')]);
  return (
    <div className="flex flex-col w-1/6 items-start p-5 gap-7 bg-zinc-900 text-white overflow-y-hidden fixed h-screen text-lg ">
      {routes.map((route, i) => (
        <NavLink
          to={route.path}
          className={({ isActive, isPending }) =>
            isPending
              ? 'text-gray-400'
              : isActive
              ? 'text-white font-bold scale-110'
              : ''
          }
          key={route.name}
        >
          <span className="flex justify-center items-center">
            {route.icon}
            <p>{route.name}</p>
          </span>
        </NavLink>
      ))}
      <span
        className="mr-2 flex items-center gap-2 cursor-pointer justify-center"
        onClick={() => {
          localStorage.clear();
          navigate('/auth');
        }}
      >
        <IoLogOutOutline />
        Logout
      </span>
    </div>
  );
};

export default Navbar;
