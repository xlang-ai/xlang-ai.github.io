import React, { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { publicFilePath } from '@/utils';
import PopupCenter from '@/utils/popup';

const Header = () => {
  return (
    <div className='fixed top-0 left-0 w-full h-14 md:h-20 bg-brand-offWhite py-4 px-10 flex justify-between items-center z-10'>
      <div className='flex gap-3 items-center'>
        <Image
          src={publicFilePath('/xlang-ai.png')}
          alt='Xlang'
          width={30}
          height={30}
          className='rounded-md'
        />
        <div className='font-bold'>Xlang AI</div>
      </div>

      <ul className='flex gap-4 text-md'>
        {/* <a
          className='btn btn-primary text-sm'
          href='https://forms.gle/Mcyq88JugmMYEar58'
        >
          Join Us
        </a> */}
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
          <Link href='https://chat.xlang.ai'>Demo</Link>
        </li>
        <li className='font-medium hover:underline'>
          <Link href='/blog'>Blog</Link>
        </li>
        <li className='font-medium hover:underline'>
          <Link href='/docs'>Docs</Link>
        </li>
        <li className='font-medium hover:underline'>
          <Link href='/news'>News</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
