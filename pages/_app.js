import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import '../styles/globals.css';
import Header from './components/Header';
import Footer from './components/Footer';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>XLanG</title>
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </SessionProvider>
  );
}
