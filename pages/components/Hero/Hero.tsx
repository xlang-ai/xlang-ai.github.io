'use client';

import React from 'react';
import { textLinearGradientClassName } from '@/styles/styles';
import Link from 'next/link';
import { ArrowDown, ArrowRight } from 'tabler-icons-react';
import { TypeAnimation } from 'react-type-animation';
import PopupCenter from '@/utils/popup';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

const Hero = () => {
  const { data: session, status } = useSession();
  return (
    <div className='h-screen w-screen pt-28 md:pt-20 flex flex-col bg-brand-offWhite'>
      <div className='relative w-full h-[100vh]'>
        <Image
          src='/hero.jpg'
          alt='hero'
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>
      <div className='relative h-full w-[80vw] sm:w-[70vw] m-auto'>
        <div className='text-brand-primary text-5xl'>
          Agentic Language Models that
        </div>
        <div className='text-brand-primary text-5xl'>
          Execute Actions in Real World
        </div>
        <div className='text-brand-dark2 text-md font-medium w-1/2 mb-10 mt-2'>
          Integration of large language models and plugins to facilitate
          execution of real-world actions by AI agents.
        </div>

        {/* Join Waitlist Button */}
        {session ? (
          session?.user?.assessed ? (
            <a
              className='group btn btn-pill btn-primary w-fit text-sm shadow-md shadow-white'
              href='https://chat.xlang.ai/'
            >
              <div className='flex flex-row gap-1 justify-center items-center'>
                <span>Live Demo</span>
                <ArrowRight className='w-[20px] h-[20px] -rotate-45 transition group-hover:rotate-0' />
              </div>
            </a>
          ) : (
            <div className='group btn btn-pill btn-primary w-fit text-sm shadow-md shadow-white'>
              <div className='flex flex-row gap-1 justify-center items-center'>
                <span>Success! You have been in our waitlist!</span>
              </div>
            </div>
          )
        ) : (
          <a
            className='group btn btn-pill btn-primary w-fit text-sm shadow-md shadow-white'
            onClick={() => PopupCenter('/google-signin', 'Waitlist Login')}
          >
            <div className='flex flex-row gap-1 justify-center items-center'>
              <span>Join Now</span>
              <ArrowRight className='w-[20px] h-[20px] -rotate-45 transition group-hover:rotate-0' />
            </div>
          </a>
        )}
      </div>
    </div>
  );
};

export default Hero;
