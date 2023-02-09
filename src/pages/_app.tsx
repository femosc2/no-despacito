import { auth } from '@/components/Auth/firebase'
import Layout from '@/components/Layout';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
    })
    return () => unsubscribe()
  }, [])
  return (
    <Layout>
      <Component {...pageProps} user={user} />
    </Layout>
  )
}
