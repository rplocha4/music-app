import React, { useEffect } from 'react';
import axios from 'axios';

const useAuth = (code: string) => {
  const [accessToken, setAccessToken] = React.useState();
  const [refreshToken, setRefreshToken] = React.useState();
  const [expiresIn, setExpiresIn] = React.useState();


  

  useEffect(() => {
    if (!code) return;
    axios
      .post('http://localhost:5000/auth/login', {
        code,
      })
      .then((res) => {
          // console.log(Date.now() + res.data.expiresIn * 1000);

        setAccessToken(res.data.accessToken);
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem("expiresAt", `${Date.now() + res.data.expiresIn * 1000}`);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        setRefreshToken(res.data.refreshToken);
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
          localStorage.setItem("expiresAt", `${Date.now() + res.data.expiresIn * 1000}`);
          
          setExpiresIn(res.data.expiresIn);
          // window.history.pushState({}, null, '/');
        })
        .catch((err) => {
          // console.log(err);

          // window.location = '/';
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn, accessToken]);
  return accessToken;
};
export default useAuth;
