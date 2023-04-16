import React from 'react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const loginHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch('http://localhost:5000/login', {
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
        window.location.href = 'http://localhost:5173/home';
        cookies.set('TOKEN', data.token, {
          path: '/',
        });
        cookies.set('USERNAME', data.username, {
          path: '/',
        });
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <form className="text-white bg-black" onSubmit={loginHandler}>
      <div className="flex justify-center items-center h-screen ">
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            className="text-black"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </div>
      </div>
    </form>
  );
}
