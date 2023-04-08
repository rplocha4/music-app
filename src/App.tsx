import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Login from './pages/Login';
import './App.css';
import useAuth from './hooks/useAuth';

const code = new URLSearchParams(window.location.search).get('code');

const App: React.FC = () => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('accessToken')
  );
  const [newAccessToken, setNewAccessToken] = useState(useAuth(code));

  useEffect(() => {
    if (accessToken !== null && accessToken !== undefined) {
      return;
    } else {
      setAccessToken(localStorage.getItem('accessToken'));
    }
  }, [localStorage.getItem('accessToken'), code]);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* {accessToken ? <WebPlayback /> : <Login />} */}
      {!accessToken && !code ? (
        <Login />
      ) : !accessToken ? (
        <Login />
      ) : (
        <Layout />
      )}
      {/* {!code ? <Login /> : <Layout code={code} />} */}
    </div>
  );
};

export default App;
