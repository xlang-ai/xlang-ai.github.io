import React from 'react';
import Image from 'next/image';

import GoogleImage from '@/public/icons/google.svg';
import AmazonImage from '@/public/icons/amazon.svg';
import SalesforceImage from '@/public/icons/salesforce.png';

const Sponsors = () => {
  return (
    <div className='w-full bg-[#B9B9B9]/30 h-fit py-6 sm:py-12'>
      <div className='page-x-width'>
        <h1 className='max-sm:text-lg max-sm:font-[600] text-2xl mb-4'>
          Sponsors & Donations
        </h1>
        <p className='max-sm:text-xs text-sm'>
          <b>Acknowledgements:</b> We are grateful to the following
          agencies/institutions for their contributions to our research:
          Research at Google, Amazon and Salesforce.
        </p>
        <div className='max-sm:my-8 my-4 w-full flex gap-12 justify-center items-center'>
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
        <p className='max-sm:text-xs text-sm'>
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
