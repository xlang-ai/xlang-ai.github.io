import React from 'react';

import LogoWhite from '@/public/logo-white.svg';

import Link from 'next/link';
import Image from 'next/image';
import { publicFilePath } from '@/utils';

import {
  discord,
  email,
  github,
  slack,
  threads,
  twitter,
} from '@/data/socials/socials';

const Footer = () => {
  return (
    <div className='w-full bg-brand-offBlack p-4'>
      <div className='page-x-width flex justify-center sm:justify-between flex-wrap gap-4'>
        <div className='flex gap-2 items-center'>
          <Link href='/'>
            <div className='relative'>
              <Image
                src={LogoWhite}
                alt='Xlang'
                width={30}
                height={30}
                className='rounded-md'
              />
            </div>
          </Link>
          <div className='text-white text-xs w-fit'>
            © Copyright 2023 XLANG Lab. All right reserved.
          </div>
        </div>
        <nav>
          <ul className='text-white flex gap-6'>
            <li className='cursor-pointer'>
              <Link href={`mailto:${email}`}>
                <Image
                  src={publicFilePath('/mail.svg')}
                  alt='Xlang'
                  width={20}
                  height={20}
                  className='rounded-md'
                />
              </Link>
            </li>
            <li className='cursor-pointer'>
              <Link href={slack}>
                <Image
                  src={publicFilePath('/slack.svg')}
                  alt='Xlang'
                  width={20}
                  height={20}
                  className='rounded-md'
                />
              </Link>
            </li>
            <li className='cursor-pointer'>
              <Link href={discord}>
                <Image
                  src={publicFilePath('/discord.svg')}
                  alt='Xlang'
                  width={20}
                  height={20}
                  className='rounded-md'
                />
              </Link>
            </li>
            <li className='cursor-pointer'>
              <Link href={github}>
                <Image
                  src={publicFilePath('/github.svg')}
                  alt='Xlang'
                  width={20}
                  height={20}
                  className='rounded-md'
                />
              </Link>
            </li>
            <li className='cursor-pointer'>
              <Link href={twitter}>
                <Image
                  src={publicFilePath('/twitter.svg')}
                  alt='Xlang'
                  width={20}
                  height={20}
                  className='rounded-md'
                />
              </Link>
            </li>
            <li className='cursor-pointer'>
              <Link href={threads}>
                <Image
                  src={publicFilePath('/threads.svg')}
                  alt='Xlang'
                  width={20}
                  height={20}
                  className='rounded-md'
                />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Footer;
