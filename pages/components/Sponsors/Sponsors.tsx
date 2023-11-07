import React from 'react';
import Image from 'next/image';

import GoogleImage from '@/public/icons/google.svg';
import AmazonImage from '@/public/icons/amazon.svg';
import SalesforceImage from '@/public/icons/salesforce.svg';
import UGCImage from '@/public/icons/ugc.png';

const Sponsors = () => {
  return (
    <div className='w-full bg-[#B9B9B9]/30 h-fit py-6 sm:py-12'>
      <div className='page-x-width'>
        <h1 className='max-sm:text-lg max-sm:font-[600] text-2xl mb-4'>
          Acknowledgements
        </h1>
        <p className='max-sm:text-xs text-sm'>
          We thank the following institutions for their gift support: Google
          Research, Amazon AWS, Salesforce Research, and UGC.
        </p>
        <div className='max-sm:my-8 my-4 w-full flex gap-12 justify-center items-center'>
          <Image
            src={GoogleImage}
            alt='Google Research'
            width={90}
            height={90}
            className='mt-2'
          />
          <Image src={AmazonImage} alt='Amazon AWS' width={90} height={90} />
          <Image
            src={SalesforceImage}
            alt='Salesforce Research'
            width={90}
            height={90}
          />
          <Image
            src={UGCImage}
            alt='UGC'
            width={848}
            height={90}
          />
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
