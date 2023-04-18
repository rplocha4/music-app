import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import Player from './Player/Player';
import {
  Link,
  NavLink,
  Outlet,
  useNavigate,
  useRoutes,
} from 'react-router-dom';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { FaUserAlt } from 'react-icons/fa';
import { BsSearch } from 'react-icons/bs';
import { MdQueueMusic } from 'react-icons/md';
import { FiHome } from 'react-icons/fi';
import { TbPlaylist } from 'react-icons/tb';
import { RiPlayList2Fill } from 'react-icons/ri';
import { IoLogOutOutline } from 'react-icons/io5';
import Cookies from 'universal-cookie';
import UserButton from './UserButton';
import { AiFillHeart } from 'react-icons/ai';
const cookies = new Cookies();
const routes = [
  { name: 'Home', path: '/home', icon: <FiHome className="mr-2" /> },
  { name: 'Search', path: '/search', icon: <BsSearch className="mr-2" /> },
  { name: 'Queue', path: '/queue', icon: <MdQueueMusic className="mr-2" /> },
  {
    name: 'Playlists',
    path: '/playlists',
    icon: <RiPlayList2Fill className="mr-2" />,
  },
  {
    name: 'Liked Songs',
    path: `/likedSongs/${cookies.get('USERNAME')}`,
    icon: <AiFillHeart className="mr-2 bg-red-400 p-0.5" />,
  },
];
const Layout: React.FC<{}> = () => {
  // const accessToken = useAuth(code);
  const navigate = useNavigate();
  return (
    <div className="flex" style={{ minHeight: '100vh', width: '100%' }}>
      <div className="flex flex-col w-1/6 items-start p-5 gap-7 bg-zinc-900 text-white overflow-y-hidden fixed h-screen text-xl ">
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
      <div className="w-1/6"></div>
      <div className="flex flex-col w-5/6 bg-zinc-800 relative">
        <div className="text-white right-3 top-1 fixed z-20 ">
          <UserButton />
        </div>
        <div className="min-h-screen pb-24">
          <Outlet />
        </div>
      </div>

      <div className="fixed w-full bottom-0 ">
        <Player />
      </div>
    </div>
  );
};

export default Layout;
