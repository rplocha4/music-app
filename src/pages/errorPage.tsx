import { useEffect, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate, useRouteError } from 'react-router-dom';
import { showInfo } from '../store/uiSlice';

export default function ErrorPage() {
  const error: any = useRouteError();
  // console.error(error);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  dispatch(showInfo('Something went wrong! Please try again later!'));

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-zinc-700 text-white">
      <h1 className="text-3xl font-bold">
        Something went wrong! Please try again later!
      </h1>
      <button
        onClick={() => {
          navigate('/');
        }}
        className="mt-5 rounded-lg bg-blue-500 px-5 py-2 text-white"
      >
        Go back to home page
      </button>
    </div>
  );
}
