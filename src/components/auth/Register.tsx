import React, { useEffect } from 'react';
import {
  hideLogin,
  hideRegister,
  showInfo,
  showLogin,
} from '../../store/uiSlice';
import { useDispatch } from 'react-redux';
import useInput from '../../hooks/useInput';
import { setUsername } from '../../store/userSlice';
const isNotEmpty = (value: string) => value.trim() !== '';

const validEmail = (value: string) =>
  value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) !== null;

const Register = () => {
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
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasErrors: emailHasErrors,
    valueBlurHandler: emailBlurHandler,
    valueChangeHandler: emailChangeHandler,
    reset: emailReset,
  } = useInput(validEmail);

  const dispatch = useDispatch();

  let formIsValid = false;
  if (usernameIsValid && passwordIsValid && emailIsValid) {
    formIsValid = true;
  }
  const loginHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    fetch('https://music-backend-2hi1.onrender.com/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: emailValue,
        username: usernameValue,
        password: passwordValue,
      }),
    })
      .then((res) => res.json())

      .then((data) => {
        if (data.message === 'User Created Successfully') {
          localStorage.setItem('TOKEN', data.token);
          localStorage.setItem('USERNAME', data.username);
          localStorage.setItem('ID', data._id);
          dispatch(setUsername(data.username));

          // console.log(data._id);

          dispatch(hideRegister());
          dispatch(showInfo(data.message));
        } else {
          throw new Error(data.message);
        }
      })
      .catch((err) => {
        setServerError(err.message);
        dispatch(showInfo('Register failed. Please try again.'));
      });
    usernameReset();
    passwordReset();
    emailReset();
  };
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-10 rounded-md bg-zinc-950 py-4 text-white">
      <p
        className={`font-bold ${
          serverError ? 'text-2xl text-red-500' : 'text-4xl text-white'
        } `}
      >
        {serverError !== '' ? serverError : 'Register'}
      </p>
      {/* {serverError && <p className="text-red-500">{serverError}</p>} */}

      <form
        className="flex items-center justify-center rounded-lg"
        onSubmit={loginHandler}
      >
        <div className="flex items-center justify-center">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="rounded-sm p-1 text-black"
                value={emailValue}
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                placeholder="Email"
              />
              {emailHasErrors && (
                <p className="text-red-500">Enter Valid Email</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="username">Username</label>
              <input
                type="username"
                name="username"
                id="username"
                value={usernameValue}
                className="rounded-sm p-1 text-black opacity-95 active:border-0 "
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
                className="rounded-sm p-1 text-black"
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
              className="text-md rounded-sm bg-white py-1 font-bold text-black"
            >
              Register
            </button>
            <div>
              <p className="text-white">
                Already have an account?{' '}
                <span
                  className="cursor-pointer text-blue-500"
                  onClick={() => {
                    dispatch(hideRegister());
                    dispatch(showLogin());
                  }}
                >
                  Login
                </span>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
