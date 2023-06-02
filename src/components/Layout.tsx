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
      <div className="relative flex w-5/6 flex-col bg-zinc-800">
        <div className="fixed right-3 top-1 z-20 text-white ">
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

      <div className="fixed bottom-0 w-full ">
        <Player />
      </div>
    </div>
  );
};

export default Layout;
