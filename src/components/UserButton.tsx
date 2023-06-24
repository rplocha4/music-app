import React, { useEffect, useRef, useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { showInfo, showLogin, showRegister } from '../store/uiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setUsername } from '../store/userSlice';
import { RootState } from '../store/store';
const UserButton: React.FC = ({}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const ref = useRef<any>(null);
  const { username } = useSelector((state: RootState) => state.user);
  const [token, setToken] = useState(localStorage.getItem('TOKEN'));
  const avatar = localStorage.getItem('avatar') || null;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  const logoutHandler = () => {
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('USERNAME');
    localStorage.removeItem('ID');
    localStorage.removeItem('avatar');
    dispatch(setUsername(null));
    navigate('/home');
    dispatch(showInfo('Logged out'));
  };
  return (
    <div>
      <button
        className="rounded-full bg-black p-2 "
        ref={ref}
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <span className="flex items-center justify-center gap-2 ">
          {avatar && avatar !== null ? (
            <img
              src={avatar}
              alt="profile pic"
              style={{ height: '40px', width: '40px' }}
              className="rounded-full"
            />
          ) : (
            <FaUserAlt className="h-10 w-10 rounded-full bg-slate-500 p-1" />
          )}

          {username ? username : 'Login'}
          {isExpanded ? (
            <MdKeyboardArrowUp className="text-2xl font-bold" />
          ) : (
            <MdKeyboardArrowDown className="text-2xl font-bold" />
          )}
        </span>
      </button>
      {isExpanded && (
        <div className="absolute mt-1  flex  w-full flex-col rounded-xl bg-zinc-900">
          {username ? (
            <>
              <span
                className="h-full w-full cursor-pointer rounded-xl p-2 text-center hover:bg-zinc-700"
                onMouseDown={() => {
                  navigate(`user/${username}`);
                }}
              >
                Profile
              </span>
              <span
                className="h-full w-full cursor-pointer rounded-xl p-2 text-center hover:bg-zinc-700"
                onMouseDown={logoutHandler}
              >
                Logout
              </span>
            </>
          ) : (
            <>
              <span
                onMouseDown={() => {
                  dispatch(showLogin());
                }}
                className="h-full w-full cursor-pointer rounded-xl p-2 text-center hover:bg-zinc-700"
              >
                Login
              </span>
              <span
                onMouseDown={() => {
                  dispatch(showRegister());
                }}
                className="h-full w-full cursor-pointer rounded-xl p-2 text-center hover:bg-zinc-700"
              >
                Register
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserButton;
