import React from 'react';

import Image from 'next/image';

const Hero = () => {
  return (
    <div className='h-screen w-screen relative p-10 pt-14 md:pt-20'>
      <div className='-z-1 opacity-70'>
        <Image
          src='/hero.jpg'
          alt='hero image'
          fill={true}
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>
      <div className='relative mt-10'>
        <div className='text-3xl font-bold mb-3'>
          <div>A new way to</div>
          <div>do Data Science</div>
        </div>
        <div className='max-w-sm mb-6 leading-7 tracking-wide'>
          We are building the most powerful framework for building natural
          language interface in all-procedure data science scenario
        </div>
        <div className='btn btn-pill btn-primary w-fit text-lg'>
          Join the waitlist
        </div>
      </div>
    </div>
  );
};

export default Hero;
