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
    <div className='h-screen w-screen relative p-10 pt-28 md:pt-20 flex flex-col bg-brand-offWhite'>
      <Image
        src='/hero.png'
        alt='hero'
        fill
        style={{ objectFit: 'cover', objectPosition: 'center' }}
      />
      <div className='relative flex flex-col gap-5 h-full w-1/2'>
        <h1 className='text-3xl font-light leading-tight text-2xl'>
          <div className='hero-height font-bold'>Your Data AI copilot</div>
        </h1>
        <div className='text-sm'>
          Collaborative research efforts and areas: HCI, DB, NLP, VIS, UI,
          DataSci, Robotics, Code/PL, SE, also different domain data and use
          cases.
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
              <span>Join Waitlist</span>
              <ArrowRight className='w-[20px] h-[20px] -rotate-45 transition group-hover:rotate-0' />
            </div>
          </a>
        )}

        {/* Down Arrow */}
        <div className='absolute bottom-0 left-auto flex justify-center items-center'>
          <ArrowDown
            className='w-[36px] h-[36px] cursor-pointer'
            style={{ animation: 'arrowAnimation 2s infinite' }}
            onClick={() => {
              window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth',
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
