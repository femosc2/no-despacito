import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import Router from 'next/router';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../firebase';


const SignUp: React.FC = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<null | string>(null);

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      await firebase.auth().currentUser?.updateProfile({ displayName });
      signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      Router.push('/')
    })
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-10 bg-gray-800">
    <form className="bg-gray-700 p-6 rounded-lg shadow-md" onSubmit={handleSignUp}>
      <h2 className="text-lg font-medium mb-4 text-gray-300">Sign Up</h2>
      <div className="mb-4">
        <label className="block text-gray-300 font-medium mb-2" htmlFor={'displayName'}>
          Display Name
        </label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="w-full border border-gray-300 p-2 bg-gray-600"
          id="displayName"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 font-medium mb-2"  htmlFor={'email'}>
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 p-2 bg-gray-600"
          id="email"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 font-medium mb-2"  htmlFor={'password'}>
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 p-2 bg-gray-600"
          id={'password'}
        />
      </div>
      <div className="mb-4">
          <button
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all"
            type="submit" onClick={(e) => handleSignUp(e)}
          >
            Submit
          </button>
        </div>
    </form>
    </div>
  )
}

export default SignUp;
