import { useEffect, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useRouteError } from 'react-router-dom';
import { showInfo } from '../store/uiSlice';

export default function ErrorPage() {
  const error: any = useRouteError();
  // console.error(error);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(showInfo('An unexpected error has occurred'));
    navigate('/home');
  }, []);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
