import React, { useEffect, useRef, useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const UserButton: React.FC = ({}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const ref = useRef<any>(null);
  const [username, setUsername] = useState<string | undefined>(
    cookies.get('USERNAME')
  );
  const [token, setToken] = useState<string | undefined>(cookies.get('TOKEN'));

  useEffect(() => {
    setUsername(cookies.get('USERNAME'));
    setToken(cookies.get('TOKEN'));
  }, [cookies.get('USERNAME'), cookies.get('TOKEN')]);

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
    cookies.remove('TOKEN', { path: '/' });
    cookies.remove('USERNAME', { path: '/' });
    setUsername(undefined);
    setToken(undefined);
  };
  return (
    <div>
      <button
        className="rounded-full bg-black p-2 "
        ref={ref}
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <span className="flex justify-center items-center gap-2 ">
          <FaUserAlt className="bg-slate-500 rounded-full w-8 p-1 h-8" />
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
              <span className="hover:bg-zinc-500 h-full w-full rounded-xl p-2 cursor-pointer">
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
            <span className="hover:bg-zinc-500 h-full w-full rounded-xl p-2 cursor-pointer">
              Login
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default UserButton;
