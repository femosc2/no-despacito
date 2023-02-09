import React, { useEffect, useState } from 'react';
import firebaseConfig from '../Auth/firebase';
import firebase from 'firebase/compat/app';
import Router from 'next/router'

const Header = () => {
  const [currentUser, setCurrentUser] = useState<string | null | undefined>(null);

  const logout = () => {
    firebase.auth().signOut().then(() => {
      setCurrentUser(null);
      Router.push('/');
    })
  }

  useEffect(() => {
    setCurrentUser(firebase.auth().currentUser?.displayName);
  }, [firebase.auth().currentUser])

  return (
    <header className="bg-gray-800 rounded-lg shadow-md flex justify-between ">
    <nav className="flex justify-between p-4">
      <section>
        <a><h1 className='text-white font-bold text-xl'>N😡 Despacito</h1></a>
        <a href="#" className="text-white font-bold ml-4">Music</a>
      </section>
    </nav>
    {currentUser && <section className='pt-5'>
      <p className={'text-white'}>Hello {currentUser} are you ready to listen to some music?</p>
      <a className="text-white font-bold ml-4" onClick={() => logout()}>Logout</a>
    </section>}
    {!currentUser && <section className='pt-8 ml-5'>
      <a href="/signup" className="text-white font-bold">Sign Up</a>
      <a href="/login" className="text-white font-bold ml-4">Login</a>
    </section>}
  </header>
  )
  
};

export default Header;