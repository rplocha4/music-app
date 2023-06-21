import { useEffect, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate, useRouteError } from 'react-router-dom';
import { showInfo } from '../store/uiSlice';

export default function ErrorPage() {
  const error: any = useRouteError();
  // console.error(error);

  const dispatch = useDispatch();
  dispatch(showInfo('Something went wrong! Please try again later!'));

  return <Navigate to="/" replace />;
}
