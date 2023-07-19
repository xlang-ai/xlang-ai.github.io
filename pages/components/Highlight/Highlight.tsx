import Image from 'next/image';
import React from 'react';

const Highlight = () => {
  return (
    <div className='bg-gradient'>
      <div className='ml-[10vw] sm:ml-[15vw] sm:flex sm:justify-between py-10'>
        <div className='sm:w-1/2 flex flex-col gap-4 py-20 pr-4'>
          <div>
            <h2 className='font-[600] text-3xl'>XLANG CHAT</h2>
            <h2 className='font-[600]'>
              Connect Your Data with Next-Level Language Interfaces
            </h2>
          </div>
          <div className='leading-6 tracking-wide'>
            Next generation logic learning machine based AI Assistant that
            assists users in a variety of tasks by interacting with data.
          </div>
          <div className='btn btn-primary w-fit'>Start Chatting</div>
        </div>
        <div className='relative overflow-hidden'>
          <Image
            src='/xlang-demo.png'
            alt='image'
            width={500}
            height={500}
            style={{ objectFit: 'contain', objectPosition: 'center' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Highlight;
