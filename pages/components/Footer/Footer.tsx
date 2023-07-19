import React from 'react';

import PopupCenter from '@/utils/popup';

import {
  BrandTwitter,
  BrandGithub,
  BrandSlack,
  BrandDiscord,
  At,
} from 'tabler-icons-react';
import Link from 'next/link';
import Image from 'next/image';
import { publicFilePath } from '@/utils';

const Footer = () => {
  return (
    <div className='w-full bg-brand-offWhite'>
      <div className='bg-brand-offBlack'>
        <div className='w-[80vw] sm:w-[70vw] m-auto pt-16 pb-20'>
          <p className='text-white font-medium text-xl -ml-0.5 leading-snug md:text-xl md:-ml-0.5 md:leading-tight lg:text-2xl lg:-ml-0.5 xl:text-2xl xl:-ml-0.5 2xl:text-3xl 2xl:-ml-0.5 tracking-tight leading-none'>
            Sign up for Newsletter
          </p>
          <p className='text-white leading-snug lg:text-base 2xl:text-lg 2xl:-ml-0.5 tracking-tight leading-none mb-4'>
            Stay tuned for updates and product announcements
          </p>
          <div className='flex flex-wrap gap-6 mb-8 mt-6'>
            <input
              type='text'
              placeholder='Enter Name'
              className='rounded-lg px-3 py-2 font-montserrat text-sm font-[600]'
            />
            <input
              type='text'
              placeholder='Enter Organization'
              className='rounded-lg px-3 py-2 font-montserrat text-sm font-[600]'
            />
            <input
              type='text'
              placeholder='Enter Email'
              className='rounded-lg px-3 py-2 font-montserrat text-sm font-[600]'
            />
          </div>
          <div
            className='btn bg-brand-primary w-fit text-white'
            onClick={() => PopupCenter('/google-signin', 'Waitlist Login')}
          >
            Sign up
          </div>
        </div>
      </div>
      <div className='max-w-[1650px] mx-auto px-6 md:px-12 lg:px-16 xl:px-16 2xl:px-20 py-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <div className='inline-block md:mr-8 lg:mr-10 xl:mr-12'>
              <nav>
                <ul className='text-white font-350 tracking-tighter leading-none text-4xl -ml-0.5 md:ml-0 md:text-lg md:tracking-tight md:leading-snug lg:text-xl xl:text-xl gap-4 sm:gap-6 flex mr-2'>
                  <li className='cursor-pointer'>
                    <Link href='https://github.com/xlang-ai'>
                      <Image
                        src={publicFilePath('/mail.svg')}
                        alt='Xlang'
                        width={25}
                        height={25}
                        className='rounded-md'
                      />
                    </Link>
                  </li>
                  <li className='cursor-pointer'>
                    <Link href='https://github.com/xlang-ai'>
                      <Image
                        src={publicFilePath('/slack.svg')}
                        alt='Xlang'
                        width={25}
                        height={25}
                        className='rounded-md'
                      />
                    </Link>
                  </li>
                  <li className='cursor-pointer'>
                    <Link href='https://github.com/xlang-ai'>
                      <Image
                        src={publicFilePath('/discord.svg')}
                        alt='Xlang'
                        width={25}
                        height={25}
                        className='rounded-md'
                      />
                    </Link>
                  </li>
                  <li className='cursor-pointer'>
                    <Link href='https://github.com/xlang-ai'>
                      <Image
                        src={publicFilePath('/github.svg')}
                        alt='Xlang'
                        width={25}
                        height={25}
                        className='rounded-md'
                      />
                    </Link>
                  </li>
                  <li className='cursor-pointer'>
                    <Link href='https://github.com/xlang-ai'>
                      <Image
                        src={publicFilePath('/twitter.svg')}
                        alt='Xlang'
                        width={25}
                        height={25}
                        className='rounded-md'
                      />
                    </Link>
                  </li>
                  <li className='cursor-pointer'>
                    <Link href='https://github.com/xlang-ai'>
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
              </nav>
            </div>
          </div>
          <div>
            <Link href='/' className='block p-4 -translate-x-4'>
              <div className='w-[85px] h-[14px] md:w-[100px] md:h-[16px] 2xl:w-[115px] 2xl:h-[19px] flex gap-2 items-center'>
                <Image
                  src={publicFilePath('/logo.svg')}
                  alt='Xlang'
                  width={30}
                  height={30}
                  className='rounded-md'
                />
                <div className='text-brand-dark'>XLANG</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
