import Image from 'next/image';
import React from 'react';

import DemoImage from '@/public/demo.png';

const Preview = () => {
  return (
    <div className='w-full py-16'>
      <div className='page-x-width grid grid-cols-4  h-[200px] md:h-[500px]'>
        <div className='col-span-1 h-full flex flex-col justify-center max-w-[200px]'>
          <div className='text-2xl font-bold mb-4'>XLANG Agent</div>
          <div className='text-left text-sm leading-6 mb-4'>
            Open-source framework and ecosystem for building and evaluating
            LLM-based agents
          </div>
          <div
            className='btn btn-primary text-xs font-normal py-2'
            onClick={() => window.open('https://chat.xlang.ai', '_blank')}
          >
            Start Chatting
          </div>
        </div>
        <div className='col-span-3 relative'>
          <Image
            src={DemoImage}
            alt='Demo'
            fill
            style={{ objectFit: 'contain', objectPosition: 'center' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Preview;
