import React, { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { publicFilePath } from '@/utils';
import { Menu2, X } from 'tabler-icons-react';
import PopupCenter from '@/utils/popup';

const Header = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <div className='fixed top-0 left-0 w-full h-14 md:h-20 bg-brand-offWhite py-4 z-10'>
      <div className='page-x-width w-full flex justify-between items-center'>
        <Link href='/'>
          <div className='flex gap-2 items-center cursor-pointer text-brand-dark'>
            <Image
              src={publicFilePath('/logo.svg')}
              alt='Xlang'
              width={30}
              height={30}
              className='rounded-md'
            />
            <div>XLANG Lab</div>
          </div>
        </Link>
        <div className='sm:hidden' onClick={() => setShowMenu(true)}>
          <Menu2 />
        </div>
        {showMenu && <SideMenu setShowMenu={setShowMenu} />}
        <ul className='gap-8 text-md text-text-brand-dark hidden sm:flex'>
          <li className='font-medium hover:underline text-brand-dark'>
            <Link href='/'>about</Link>
          </li>
          <li className='font-medium hover:underline text-brand-dark'>
            <Link href='/team'>team</Link>
          </li>
          <li className='font-medium hover:underline text-brand-dark'>
            <Link href='/research'>research</Link>
          </li>
          <li className='font-medium hover:underline text-brand-dark'>
            <Link href='https://chat.xlang.ai'>demos</Link>
          </li>
          <li className='font-medium hover:underline text-brand-dark'>
            <Link href='/blog'>blogs</Link>
          </li>
        </ul>

        <div className='flex gap-4 items-center'>
          <ul className='hidden lg:flex gap-3'>
            <li>
              <Link href='mailto:mail@xlang.ai'>
                <Image
                  src={publicFilePath('/github-black.svg')}
                  alt='Xlang'
                  width={25}
                  height={25}
                  className='rounded-md'
                />
              </Link>
            </li>
            <li>
              <Link href='mailto:mail@xlang.ai'>
                <Image
                  src={publicFilePath('/twitter-black.svg')}
                  alt='Xlang'
                  width={25}
                  height={25}
                  className='rounded-md'
                />
              </Link>
            </li>
          </ul>

          <div className='border border-brand-primary2 border-2 text-brand-primary2 font-[500] rounded-xl py-1 px-3 cursor-pointer'>
            join us
          </div>
        </div>
      </div>
    </div>
  );
};

const SideMenu = ({
  setShowMenu,
}: {
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className='fixed min-w-screen min-h-screen left-0 top-0 right-0 bottom-0 bg-brand-offWhite z-100'>
      <div
        className='absolute right-5 top-5'
        onClick={() => setShowMenu(false)}
      >
        <X width={40} height={40} />
      </div>
      <ul className='gap-y-4 p-10 flex flex-col justify-center h-full text-brand-dark'>
        <li className='font-medium text-2xl hover:underline'>
          <Link href='/about'>About</Link>
        </li>
        <li className='font-medium text-2xl hover:underline'>
          <Link href='/team'>Team</Link>
        </li>
        <li className='font-medium text-2xl hover:underline'>
          <Link href='/research'>Research</Link>
        </li>
        <li className='font-medium text-2xl hover:underline'>
          <Link href='https://chat.xlang.ai'>Demos</Link>
        </li>
        <li className='font-medium text-2xl hover:underline'>
          <Link href='/blog'>Blogs</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
