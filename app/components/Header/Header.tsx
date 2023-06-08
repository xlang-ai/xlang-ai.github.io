import React, { useState } from 'react';

import Image from 'next/image';

const Header = () => {
  return (
    <div className='fixed top-0 left-0 w-full h-14 md:h-20 bg-transparent py-4 px-10 flex justify-between items-center z-10'>
      <div className='flex gap-3 items-center'>
        <Image
          src='/xlang-ai.png'
          alt='Xlang'
          width={30}
          height={30}
          className='rounded-md'
        />
        <div className='font-bold'>Xlang AI</div>
      </div>

      <ul className='flex gap-3'>
        <li className='btn btn-primary text-sm'>Waitlist</li>
        <li className='btn'>Demo</li>
      </ul>
    </div>
  );
};

export default Header;
