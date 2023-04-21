import React from 'react';
import Cookies from 'universal-cookie';
import { hideLogin, showInfo } from '../../store/uiSlice';
import { useDispatch } from 'react-redux';
import useInput from '../../hooks/useInput';
const cookies = new Cookies();
const isNotEmpty = (value: string) => value.trim() !== '';

export default function Login() {
  //   const [username, setUsername] = React.useState('');
  //   const [password, setPassword] = React.useState('');
  const [serverError, setServerError] = React.useState('');

  const {
    value: usernameValue,
    isValid: usernameIsValid,
    hasErrors: usernameHasErrors,
    valueBlurHandler: usernameBlurHandler,
    valueChangeHandler: usernameChangeHandler,
    reset: usernameReset,
  } = useInput(isNotEmpty);
  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasErrors: passwordHasErrors,
    valueBlurHandler: passwordBlurHandler,
    valueChangeHandler: passwordChangeHandler,
    reset: passwordReset,
  } = useInput(isNotEmpty);

  const dispatch = useDispatch();

  let formIsValid = false;
  if (usernameIsValid && passwordIsValid) {
    formIsValid = true;
  }
  const loginHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: usernameValue,
        password: passwordValue,
      }),
    })
      .then((res) => res.json())

      .then((data) => {
        if (data.message === 'Login Successful') {
          cookies.set('TOKEN', data.token, {
            path: '/',
          });
          cookies.set('USERNAME', data.username, {
            path: '/',
          });
          localStorage.setItem('TOKEN', data.token);
          localStorage.setItem('USERNAME', data.username);
          dispatch(hideLogin());
          dispatch(showInfo(data.message));
        } else {
          throw new Error(data.message);
        }
      })
      .catch((err) => {
        setServerError(err.message);
        dispatch(showInfo('Login failed. Please try again.'));
      });
    usernameReset();
    passwordReset();
  };
  return (
    <div className="text-white bg-zinc-950 h-full w-full flex flex-col items-center justify-center gap-10 py-4">
      <p
        className={`font-bold ${
          serverError ? 'text-2xl text-red-500' : 'text-4xl text-white'
        } `}
      >
        {serverError !== '' ? serverError : 'Login'}
      </p>
      {/* {serverError && <p className="text-red-500">{serverError}</p>} */}

      <form
        className="flex justify-center items-center rounded-lg"
        onSubmit={loginHandler}
      >
        <div className="flex justify-center items-center">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <label htmlFor="username">Username</label>
              <input
                type="username"
                name="username"
                id="username"
                value={usernameValue}
                className="text-black rounded-sm p-1 opacity-95 active:border-0 "
                onChange={usernameChangeHandler}
                onBlur={usernameBlurHandler}
                placeholder="Username"
              />
              {usernameHasErrors && (
                <p className="text-red-500">Enter Valid Username</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="text-black rounded-sm p-1"
                value={passwordValue}
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
                placeholder="Password"
              />
              {passwordHasErrors && (
                <p className="text-red-500">Enter Valid Password</p>
              )}
            </div>
            <button
              disabled={!formIsValid}
              type="submit"
              className="bg-white text-black rounded-sm font-bold text-md py-1"
            >
              Log in
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
