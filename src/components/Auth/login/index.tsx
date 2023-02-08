import React, { FC, useCallback, useEffect, useState } from "react";
import {GoogleAuthProvider, signInWithEmailAndPassword } from "@firebase/auth";
import Router from 'next/router'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { LoginMethods } from "@/utils/types";
import { auth } from '../firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const provider = new GoogleAuthProvider();

  const handleLogin = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent, method: LoginMethods ) => {
    e.preventDefault();
    switch (method) {
      case 'email':
        signInWithEmailAndPassword(auth, email, password)
          .then(() => {
            Router.push('/')
    })
    case 'google':
       auth.signInWithPopup(provider)
          .then(() => {
            Router.push('/')
    })
  }
}
  return (
    <section className="flex justify-center mx-auto mt-10 w-8/12">
    <section className="w-full max-w-sm mx-auto mt-10 bg-gray-800">
      <form className="bg-gray-700 p-6 rounded-lg shadow-md" onSubmit={(e) => handleLogin(e, 'email')}>
        <div className="mb-4">
          <label className="block text-gray-300 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full border border-gray-400 p-2 bg-gray-600"
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value) }
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="w-full border border-gray-400 p-2 bg-gray-600"
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value) }
            required
          />
        </div>
        <div className="mb-4">
          <button
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
    <section className="w-full max-w-sm mx-auto mt-10 bg-gray-800">
      <button
            className={
              'px-6 py-3 bg-red-700 hover:bg-red-800 text-white font-bold rounded mt-12'
            }
            onClick={(e) => handleLogin(e, 'google')}
          >
            <FontAwesomeIcon icon={faGoogle} className="mr-2" />
            Sign in with Google
          </button>
    </section>
    </section>
  );
}

export default Login;