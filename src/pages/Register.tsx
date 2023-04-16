import React from 'react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function Register() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const registerSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('email', email);
    console.log('password', password);
    fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        cookies.set('TOKEN', data.token, {
          path: '/',
        });
        cookies.set('USERNAME', data.email, {
          path: '/',
        });
        window.location.href = 'http://localhost:5173/';
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <form onSubmit={registerSubmitHandler} className="text-white bg-black">
      <div className="flex justify-center items-center h-screen ">
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            className="text-black"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="text-black"
            name="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="submit">Register</button>
        </div>
      </div>
    </form>
  );
}
