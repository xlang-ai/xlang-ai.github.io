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

const Footer = () => {
  return (
    <div className='w-full bg-brand-offBlack py-10'>
      <div className='max-w-[1650px] mx-auto px-6 md:px-12 lg:px-16 xl:px-16 2xl:px-20'>
        <div className='mb-20'>
          <p className='text-white font-medium text-xl -ml-0.5 leading-snug md:text-xl md:-ml-0.5 md:leading-tight lg:text-2xl lg:-ml-0.5 xl:text-2xl xl:-ml-0.5 2xl:text-3xl 2xl:-ml-0.5 tracking-tight leading-none mb-4'>
            Join the waitlist
          </p>
          <p className='text-white  text-base leading-snug lg:text-base xl:text-base 2xl:text-lg 2xl:-ml-0.5 tracking-tight leading-none mb-4 max-w-sm'>
            Be among the first to try out Xlang AI
          </p>
          <div
            className='text-off_black hover:bg-[#EBE6E3] bg-white inline-block px-8 py-2 rounded-full  text-base leading-snug lg:text-base xl:text-base 2xl:text-lg 2xl:-ml-0.5 tracking-tight leading-none transition duration-150 ease-out hover:ease-in cursor-pointer'
            onClick={() => PopupCenter('/google-signin', 'Waitlist Login')}
          >
            Sign up now
          </div>
        </div>

        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <div className='hidden md:inline-block md:mr-8 lg:mr-10 xl:mr-12'>
              <nav className='astro-EN3INNNH'>
                <ul className='text-white font-350 tracking-tighter leading-none text-4xl -ml-0.5 md:ml-0 md:text-lg md:tracking-tight md:leading-snug lg:text-xl xl:text-xl gap-6 md:flex astro-EN3INNNH'>
                  <li className='cursor-pointer'>
                    <Link href='https://github.com/xlang-ai'>
                      <BrandDiscord />
                    </Link>
                  </li>
                  <li className='cursor-pointer'>
                    <Link href='https://github.com/xlang-ai'>
                      <BrandGithub />
                    </Link>
                  </li>
                  <li className='cursor-pointer'>
                    <Link href='https://github.com/xlang-ai'>
                      <BrandSlack />
                    </Link>
                  </li>
                  <li className='cursor-pointer'>
                    <Link href='https://github.com/xlang-ai'>
                      <BrandTwitter />
                    </Link>
                  </li>
                  <li className='cursor-pointer'>
                    <Link href='https://github.com/xlang-ai'>
                      <At />
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div>
            <Link href='/' className='block p-4 -translate-x-4'>
              <div
                className='
    w-[85px] h-[14px] 
    md:w-[100px] md:h-[16px] 
    2xl:w-[115px] 2xl:h-[19px]'
              >
                <h1 className='text-white font-bold tracking-widest'>XLANG</h1>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
