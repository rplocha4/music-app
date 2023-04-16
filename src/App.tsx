import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import './App.css';
import useAuth from './hooks/useAuth';
import axios from 'axios';
import SpotifyAuth from './pages/SpotifyAuth';

const code = new URLSearchParams(window.location.search).get('code') as string;

const App: React.FC = () => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('accessToken')
  );
  const [newAccessToken, setNewAccessToken] = useState(useAuth(code));
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setAccessToken(token);
  }, [localStorage.getItem('accessToken')]);
  useEffect(() => {
    if (!localStorage.getItem('expiresAt')) return;
    const timeout = setTimeout(
      () => {
        const refreshToken = localStorage.getItem('refreshToken');
        axios
          .post('http://localhost:5000/auth/refresh', {
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
            console.log(err);
          });
      },
      Number(localStorage.getItem('expiresAt')) - Date.now() > 0
        ? Number(localStorage.getItem('expiresAt')) - Date.now()
        : 0
    );

    return () => clearTimeout(timeout);
  }, [localStorage.getItem('expiresAt')]);

  // useEffect(() => {
  //   if (accessToken !== null && accessToken !== undefined) {
  //     return;
  //   } else {
  //     setAccessToken(localStorage.getItem('accessToken'));
  //   }
  // }, [localStorage.getItem('accessToken'), code]);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* {accessToken ? <WebPlayback /> : <Login />} */}
      {!accessToken && !code ? (
        <SpotifyAuth />
      ) : !accessToken ? (
        <SpotifyAuth />
      ) : (
        <Layout />
      )}
      {/* {!code ? <Login /> : <Layout code={code} />} */}
    </div>
  );
};

export default App;
