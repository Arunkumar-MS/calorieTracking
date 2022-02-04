import axios from "@Service/core/axios";
import React from "react";
import cookies from "js-cookie";
import { useRouter } from 'next/router'


export const Login = () => {
  const router = useRouter()
  const [token, setToken] = React.useState('');
  const [error, setError] = React.useState('');

  const onLoginHandler = () => {
    if(!token) {
      setError('Input field is required. Please enter toekn!');
      return;
    }
    setError('')
    axios.post('/auth/login', { token }).then((d) => {
      cookies.set('token', token);
      router.push('/');
    }).catch((e) => {
      setError('Somthing went wrong. Please try again!')
    });
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value);
  }

  return (
    <div className="py-16 sm:py-24" data-test-id="login-page">
      <div className="relative sm:py-16">
        <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="relative rounded-2xl px-6 py-10 bg-indigo-600 overflow-hidden shadow-xl sm:px-12 sm:py-20">
            <div aria-hidden="true" className="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0">
              <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1463 360">
                <path className="text-indigo-500 text-opacity-40" fill="currentColor" d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z" />
                <path className="text-indigo-700 text-opacity-40" fill="currentColor" d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z" />
              </svg>
            </div>
            <div className="relative">

              <div className="sm:text-center">
                <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl" data-test-id="login-page-title">
                  Enter token below for login.
                </h2>
              </div>


              <div className="mt-12 sm:mx-auto sm:max-w-lg sm:flex">

                <div className="min-w-0 flex-1">
                  <label htmlFor="cta-token" className="sr-only">Enter Token</label>
                  <input data-test-id="login-page-token-input" id="cta-token" type="email" className="block w-full border border-transparent rounded-md px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600" placeholder="Enter your token" onChange={onChangeHandler} />
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-3">
                  <button data-test-id="login-page-submit" type="button" onClick={onLoginHandler} className="block w-full rounded-md border border-transparent px-5 py-3 bg-indigo-500 text-base font-medium text-white shadow hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:px-10">Login</button>
                </div>
              </div>
              {error && <div className=" text-center mt-5">
                <div className="text-gray-300	font-medium">{error}</div>
              </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
