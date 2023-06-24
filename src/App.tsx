import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import './App.css';
import useAuth from './hooks/useAuth';
import axios from 'axios';
import SpotifyAuth from './pages/SpotifyAuth';

const code = new URLSearchParams(window.location.search).get('code') as string;

const App: React.FC = () => {
  const [accessToken, setAccessToken] = useState(useAuth(code));

  const renderContent = () => {
    if (!accessToken) return <SpotifyAuth />;
    return <Layout />;
  };

  useEffect(() => {
    if (!localStorage.getItem('expiresAt')) return;
    const timeout = setTimeout(
      () => {
        const refreshToken = localStorage.getItem('refreshToken');
        axios
          .post('https://music-backend-2hi1.onrender.com/auth/refresh', {
            refreshToken,
          })
          .then((res) => {
            setAccessToken(res.data.accessToken);
            localStorage.setItem('accessToken', res.data.accessToken);
            localStorage.setItem(
              'expiresAt',
              `${Date.now() + res.data.expiresIn * 1000}`
            );
          })
          .catch((err) => {
            // console.log(err);
          });
      },
      Number(localStorage.getItem('expiresAt')) - Date.now() > 0
        ? Number(localStorage.getItem('expiresAt')) - Date.now()
        : 0
    );

    return () => clearTimeout(timeout);
  }, [localStorage.getItem('expiresAt')]);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* {!accessToken && !code ? (
        <SpotifyAuth />
      ) : !accessToken ? (
        <SpotifyAuth />
      ) : (
        <Layout />
      )} */}
      {renderContent()}
    </div>
  );
};

export default App;
