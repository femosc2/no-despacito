import Header from '../Header'
import type { AppProps } from 'next/app'

interface IProps {
  children: any;
}

export default function Layout(props: IProps) {
  const { children } = props;
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  )
}