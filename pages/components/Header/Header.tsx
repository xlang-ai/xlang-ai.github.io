import React, { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { publicFilePath } from '@/utils';
import { Menu2, X } from 'tabler-icons-react';

import { github, twitter } from '@/data/socials/socials';

const Header = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <div className='fixed top-0 left-0 w-full h-14 md:h-20 bg-white py-4 z-10 navbar-shadow'>
      <div className='page-x-width w-full flex justify-between items-center'>
        <div
          className='sm:hidden w-fit h-fit cursor-pointer'
          onClick={() => setShowMenu(true)}
        >
          <Menu2 className='text-[#0156AC]' />
        </div>
        <Link href='/'>
          <div className='flex gap-2 items-center cursor-pointer text-brand-dark'>
            <Image
              src={publicFilePath('/icons/logo.svg')}
              alt='Xlang'
              width={30}
              height={30}
              className='rounded-md'
            />
            <div>XLANG Lab</div>
          </div>
        </Link>
        {showMenu && <SideMenu setShowMenu={setShowMenu} />}
        <ul className='gap-8 text-md text-text-brand-dark hidden sm:flex'>
          <li className='font-[500] hover:underline text-brand-dark'>
            <Link href='/'>about</Link>
          </li>
          <li className='font-[500] hover:underline text-brand-dark'>
            <Link href='/team'>team</Link>
          </li>
          <li className='font-[500] hover:underline text-brand-dark'>
            <Link href='/research'>research</Link>
          </li>
          <li className='font-[500] hover:underline text-brand-dark'>
            <Link href='/project'>projects</Link>
          </li>
          <li className='font-[500] hover:underline text-brand-dark'>
            <Link href='/blog'>blogs</Link>
          </li>
        </ul>

        <div className='flex gap-4 items-center'>
          <ul className='hidden lg:flex gap-3'>
            <li>
              <Link href={github}>
                <Image
                  src={publicFilePath('/icons/github-black.svg')}
                  alt='Xlang'
                  width={25}
                  height={25}
                  className='rounded-md'
                />
              </Link>
            </li>
            <li>
              <Link href={twitter}>
                <Image
                  src={publicFilePath('/icons/twitter-black.svg')}
                  alt='Xlang'
                  width={25}
                  height={25}
                  className='rounded-md'
                />
              </Link>
            </li>
          </ul>

          <div className='max-sm:text-sm border border-brand-primary2 border-2 text-brand-primary2 font-[500] rounded-xl py-1 px-3 cursor-pointer'>
            <a href="https://forms.gle/3Ki9ectMB5D31F8g8" target="_blank" rel="noopener noreferrer">
            join us
            </a>
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
        className='absolute right-5 top-5 text-brand-dark'
        onClick={() => setShowMenu(false)}
      >
        <X width={40} height={40} />
      </div>
      <ul className='gap-y-4 p-10 flex flex-col justify-center h-full text-brand-dark'>
        <li className='text-2xl font-[600] hover:underline text-brand-dark'>
          <Link href='/' onClick={() => setShowMenu(false)}>
            about
          </Link>
        </li>
        <li className='text-2xl font-[600] hover:underline text-brand-dark'>
          <Link href='/team' onClick={() => setShowMenu(false)}>
            team
          </Link>
        </li>
        <li className='text-2xl font-[600] hover:underline text-brand-dark'>
          <Link href='/research' onClick={() => setShowMenu(false)}>
            research
          </Link>
        </li>
        <li className='text-2xl font-[600] hover:underline text-brand-dark'>
          <Link href='/project' onClick={() => setShowMenu(false)}>
            projects
          </Link>
        </li>
        <li className='text-2xl font-[600] hover:underline text-brand-dark'>
          <Link href='/blog' onClick={() => setShowMenu(false)}>
            blogs
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
