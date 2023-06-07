import './globals.css';
import { Inter } from 'next/font/google';

import Header from './components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Xlang AI',
  description: 'Xlang',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Header />
        <div className='mt-14 md:mt-20'>{children}</div>
      </body>
    </html>
  );
}
