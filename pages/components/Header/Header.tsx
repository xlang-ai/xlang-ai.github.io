import React, { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { publicFilePath } from '@/utils';
import { Menu2, X } from 'tabler-icons-react';
import PopupCenter from '@/utils/popup';

const Header = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <div className='fixed top-0 left-0 w-full h-14 md:h-20 bg-brand-offWhite py-4 px-6 flex justify-between items-center z-10'>
      <Link href='/'>
        <div className='flex gap-2 items-center cursor-pointer text-brand-dark'>
          <Image
            src={publicFilePath('/logo.svg')}
            alt='Xlang'
            width={30}
            height={30}
            className='rounded-md'
          />
          <div>XLANG</div>
        </div>
      </Link>
      <div className='sm:hidden' onClick={() => setShowMenu(true)}>
        <Menu2 />
      </div>
      {showMenu && <SideMenu setShowMenu={setShowMenu} />}
      <ul className='gap-8 text-md text-text-brand-dark hidden sm:flex'>
        <li className='font-medium hover:underline'>
          <Link href='/about'>About</Link>
        </li>
        <li className='font-medium hover:underline'>
          <Link href='/team'>Team</Link>
        </li>
        <li className='font-medium hover:underline'>
          <Link href='/research'>Research</Link>
        </li>
        <li className='font-medium hover:underline'>
          <Link href='https://chat.xlang.ai'>Demos</Link>
        </li>
        <li className='font-medium hover:underline'>
          <Link href='/blog'>Blogs</Link>
        </li>
      </ul>

      <ul className='hidden lg:flex gap-6'>
        <li>
          <Link href='mailto:mail@xlang.ai'>
            <Image
              src={publicFilePath('/mail.svg')}
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
              src={publicFilePath('/slack.svg')}
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
              src={publicFilePath('/discord.svg')}
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
              src={publicFilePath('/github.svg')}
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
              src={publicFilePath('/twitter.svg')}
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
              src={publicFilePath('/threads.svg')}
              alt='Xlang'
              width={25}
              height={25}
              className='rounded-md'
            />
          </Link>
        </li>
      </ul>
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
