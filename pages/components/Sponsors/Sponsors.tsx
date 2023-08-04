import React from 'react';
import Image from 'next/image';

import GoogleImage from '@/public/google.svg';
import AmazonImage from '@/public/amazon.svg';
import SalesforceImage from '@/public/salesforce.png';

const Sponsors = () => {
  return (
    <div className='w-full bg-[#B9B9B9]/30 h-fit py-6 sm:py-12'>
      <div className='page-x-width'>
        <h1 className='text-2xl mb-4'>Sponsors & Donations</h1>
        <p className='text-sm'>
          <b>Acknowledgements:</b> We are grateful to the following
          agencies/institutions for their contributions to our research:
          Research at Google, Amazon and Salesforce.
        </p>
        <div className='w-full flex gap-12 justify-center items-center'>
          <Image
            src={GoogleImage}
            alt='Google Research'
            width={60}
            height={60}
          />
          <Image
            src={AmazonImage}
            alt='Google Research'
            width={60}
            height={60}
          />
          <Image
            src={SalesforceImage}
            alt='Google Research'
            width={60}
            height={60}
          />
        </div>
        <p className='text-sm'>
          XLANG Lab primarily relies on university grants and donations. We
          welcome diverse forms of donations and sponsorships, including cash,
          GPU hardware and hours, cloud credits, other computing resources, and
          more. If you want to join us in democratizing large models, please
          contact us at{' '}
          <a
            href='mailto:tao.yu.nlp@gmail.com'
            className='text-[#0156AC] underline'
          >
            tao.yu.nlp@gmail.com
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Sponsors;
