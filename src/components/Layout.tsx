import React, { useState, useEffect } from 'react';
import Player from './Player/Player';
import {
  Link,
  NavLink,
  Outlet,
  useNavigate,
  useRoutes,
} from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { MdQueueMusic } from 'react-icons/md';
import { FiHome } from 'react-icons/fi';
import { RiPlayList2Fill } from 'react-icons/ri';
import { IoLogOutOutline } from 'react-icons/io5';
import UserButton from './UserButton';
import { useDispatch, useSelector } from 'react-redux';
import ShowInfo from './Alert/ShowInfo';
import { hideInfo, hideLogin, hideRegister } from '../store/uiSlice';
import Modal from './Playlist/Modal';
import Login from './auth/Login';
import Navbar from './Ui/Navbar';
import Register from './auth/Register';
import { setUsername } from '../store/userSlice';
import { RootState } from '../store/store';

const Layout: React.FC<{}> = () => {
  // const accessToken = useAuth(code);
  const navigate = useNavigate();
  const uiState = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('USERNAME')) {
      dispatch(setUsername(localStorage.getItem('USERNAME')));
    }
  }, [localStorage.getItem('USERNAME')]);

  useEffect(() => {
    if (!uiState.showInfo || !uiState.message) return;
    const timeout = setTimeout(() => {
      dispatch(hideInfo());
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, [uiState.showInfo, uiState.message]);

  useEffect(() => {
    if (window.location.pathname === '/') {
      navigate('/home');
    }
  }, []);

  return (
    <div className="flex" style={{ minHeight: '100vh', width: '100%' }}>
      <Navbar />
      <div className="w-1/6"></div>
      <div className="flex flex-col w-5/6 bg-zinc-800 relative">
        <div className="text-white right-3 top-1 fixed z-20 ">
          <UserButton />
        </div>
        <div className="min-h-screen pb-24">
          {uiState.showInfo && <ShowInfo message={uiState.message} />}
          {uiState.showLogin && (
            <Modal onClose={() => dispatch(hideLogin())}>
              <Login />
            </Modal>
          )}
          {uiState.showRegister && (
            <Modal onClose={() => dispatch(hideRegister())}>
              <Register />
            </Modal>
          )}
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
