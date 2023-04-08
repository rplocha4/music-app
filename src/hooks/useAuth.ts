import React, { useEffect } from 'react';
import axios from 'axios';

const useAuth = (code: string) => {
  const [accessToken, setAccessToken] = React.useState();
  const [refreshToken, setRefleshToken] = React.useState();
  const [expiresIn, setExpiresIn] = React.useState();

  

  useEffect(() => {
    if (!code) return;
    axios
      .post('http://localhost:5000/auth/login', {
        code,
      })
      .then((res) => {
        setAccessToken(res.data.accessToken);
        localStorage.setItem('accessToken', res.data.accessToken);
        console.log(res.data.accessToken);
        
        setRefleshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        window.history.pushState({}, '', '/');
      })
      .catch((err) => {
        // console.log(err);
        // window.location = '/';
      });
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post('http://localhost:5000/auth/refresh', {
          refreshToken,
        })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          localStorage.setItem('accessToken', res.data.accessToken);

          setExpiresIn(res.data.expiresIn);
          // window.history.pushState({}, null, '/');
        })
        .catch((err) => {
          console.log(err);

          // window.location = '/';
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn, accessToken]);
  return accessToken;
};
export default useAuth;
