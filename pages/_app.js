import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import '../styles/globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Image from 'next/image';
import { publicFilePath } from '../utils';
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
      <div className='relative w-full h-full'>
        <div className='absolute top-0 left-0 max-sm:hidden -mt-8 z-[-1]'>
          <Image src={publicFilePath('/background/wave.svg')} alt="Wave" width={2000} height={1000} />
          <Image src={publicFilePath('/background/wave2.svg')} alt="Wave 2" width={2000} height={1000} />
        </div>
        <Component {...pageProps} />
      </div>
      <Footer />
    </SessionProvider>
  );
}
