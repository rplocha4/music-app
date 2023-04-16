import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux/es/exports';
import App from './App';
import './index.css';
import store from './store/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/errorPage';
import Album from './pages/Album';
import { loader as albumLoader } from './pages/Album';
import Artist from './pages/Artist';
import { loader as artistLoader } from './pages/Artist';
import { loader as queueLoader } from './pages/Queue';
import { loader as homeLoader } from './pages/Home';
import Search from './pages/Search';
import Queue from './pages/Queue';
import Playlists from './pages/Playlists';
import Home from './pages/Home';
import Lyricks from './pages/Lyricks';
import Login from './pages/Login';
import SpotifyAuth from './pages/SpotifyAuth';
import Register from './pages/Register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'search',
        element: <Search />,
      },
      {
        path: 'home',
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: 'album/:id',
        element: <Album />,
        loader: albumLoader,
      },
      {
        path: 'artist/:id',
        element: <Artist />,
        loader: artistLoader,
      },
      {
        path: 'queue',
        element: <Queue />,
        loader: queueLoader,
      },
      {
        path: 'playlists',
        element: <Playlists />,
        // loader: queueLoader,
      },
      {
        path: 'lyricks',
        element: <Lyricks />,
      },
    ],
  },
  {
    path: '/auth',
    element: <SpotifyAuth />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
