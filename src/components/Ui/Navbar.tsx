import React, { useEffect } from 'react';
import { AiFillHeart, AiOutlineRollback } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { FiHome } from 'react-icons/fi';
import { IoLogOutOutline } from 'react-icons/io5';
import { MdQueueMusic } from 'react-icons/md';
import { RiPlayList2Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { RootState } from '../../store/store';
import { setUsername } from '../../store/userSlice';
import { BiRightTopArrowCircle } from 'react-icons/bi';

const Navbar = () => {
  const { username } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      name: 'Top Tracks',
      path: '/top',
      icon: <BiRightTopArrowCircle className="mr-2" />,
    },
    // {
    //   name: 'Recently Played',
    //   path: '/recently-played',
    //   icon: <AiOutlineRollback className="mr-2" />,
    // },
    {
      name: 'Liked Songs',
      path: `/likedSongs`,
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
  // useEffect(() => {
  //   setUsername(localStorage.getItem('USERNAME'));
  // }, [localStorage.getItem('USERNAME')]);
  return (
    <div className="fixed flex h-screen w-1/6 flex-col items-start gap-7 overflow-y-hidden bg-zinc-900 p-5 text-lg text-white ">
      {routes.map((route, i) =>
        route.path.includes('likedSongs') ||
        route.path.includes('playlists') ? (
          username !== null && (
            <NavLink
              to={route.path}
              className={({ isActive, isPending }) =>
                isPending
                  ? 'text-gray-400'
                  : isActive
                  ? 'scale-110 font-bold text-white'
                  : ''
              }
              key={route.name}
            >
              <span className="flex items-center justify-center">
                {route.icon}
                <p>{route.name}</p>
              </span>
            </NavLink>
          )
        ) : (
          <NavLink
            to={route.path}
            className={({ isActive, isPending }) =>
              isPending
                ? 'text-gray-400'
                : isActive
                ? 'scale-110 font-bold text-white'
                : ''
            }
            key={route.name}
          >
            <span className="flex items-center justify-center">
              {route.icon}
              <p>{route.name}</p>
            </span>
          </NavLink>
        )
      )}
      <span
        className="mr-2 flex cursor-pointer items-center justify-center gap-2"
        onClick={() => {
          localStorage.clear();
          dispatch(setUsername(null));
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
