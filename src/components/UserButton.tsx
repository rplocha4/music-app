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
  const avatar = localStorage.getItem('avatar');

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
        <span className="flex justify-center items-center gap-2 ">
          {avatar ? (
            <img
              src={avatar}
              alt="profile pic"
              style={{ height: '40px', width: '40px' }}
              className="rounded-full"
            />
          ) : (
            <FaUserAlt className="bg-slate-500 rounded-full w-10 p-1 h-10" />
          )}

          {username ? username : 'Login'}
          {isExpanded ? (
            <MdKeyboardArrowUp className="font-bold text-2xl" />
          ) : (
            <MdKeyboardArrowDown className="font-bold text-2xl" />
          )}
        </span>
      </button>
      {isExpanded && (
        <div className="absolute bg-zinc-600  rounded-xl  w-full mt-1 flex flex-col">
          {username ? (
            <>
              <span
                className="hover:bg-zinc-500 h-full w-full rounded-xl p-2 cursor-pointer"
                onMouseDown={() => {
                  navigate(`user/${username}`);
                }}
              >
                Profile
              </span>
              <span
                className="hover:bg-zinc-500 h-full w-full rounded-xl p-2 cursor-pointer"
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
                className="hover:bg-zinc-500 h-full w-full rounded-xl p-2 cursor-pointer"
              >
                Login
              </span>
              <span
                onMouseDown={() => {
                  dispatch(showRegister());
                }}
                className="hover:bg-zinc-500 h-full w-full rounded-xl p-2 cursor-pointer"
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
