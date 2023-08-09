import React from 'react';
import Image from 'next/image';

import GoogleImage from '@/public/icons/google.svg';
import AmazonImage from '@/public/icons/amazon.svg';
import SalesforceImage from '@/public/icons/salesforce.svg';

const Sponsors = () => {
  return (
    <div className='w-full bg-[#B9B9B9]/30 h-fit py-6 sm:py-12'>
      <div className='page-x-width'>
        <h1 className='max-sm:text-lg max-sm:font-[600] text-2xl mb-4'>
          Acknowledgements
        </h1>
        <p className='max-sm:text-xs text-sm'>
          We thank the following institutions for their gift supports:
          Google Research, Amazon AWS and Salesforce Research.
        </p>
        <div className='max-sm:my-8 my-4 w-full flex gap-12 justify-center items-center'>
          <Image
            src={GoogleImage}
            alt='Google Research'
            width={90}
            height={90}
          />
          <Image
            src={AmazonImage}
            alt='Amazon AWS'
            width={90}
            height={90}
          />
          <Image
            src={SalesforceImage}
            alt='Salesforce Research'
            width={90}
            height={90}
          />
        </div>
        <p className='max-sm:text-xs text-sm'>
          <b>Donations appreciated!</b> XLANG Lab is funded by university grants and kind donations. We welcome any form of donations and sponsorships. To aid our mission of building open-source language agents, contact us at {''}
          <a
            href='mailto:mail@xlang.ai'
            className='text-[#0156AC] underline'
          >
            mail@xlang.ai
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Sponsors;
