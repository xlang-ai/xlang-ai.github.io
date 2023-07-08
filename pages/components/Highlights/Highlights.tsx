import React from 'react';

import TextWithImage from '../TextWithImage';
import { publicFilePath } from '@/utils';

const Highlights = () => {
  return (
    <div className=' bg-brand-offWhite px-10 py-10'>
      <div className='title mb-10'>Highlights</div>

      <div className='flex flex-col gap-20 mt-5'>
        <TextWithImage
          image={publicFilePath('/hero.png')}
          title='Advanced Data Analysis'
          content='Unleash the power of the most advanced language models for free, to help you do data cleaning, data wrangling, connecting with your Kaggle dataset and other data analysis.'
          button={
            <button className='btn btn-secondary text-sm w-fit'>
              Join the waitlist
            </button>
          }
        />

        <TextWithImage
          image={publicFilePath('/xlang-ai.png')}
          title='Your best AI assistant'
          content='Unleash the power of your digital companion - Xlang AI, guiding you effortlessly through every task, anticipating your needs with unrivaled intelligence and finesse.'
          reverse
          button={
            <button className='btn btn-secondary text-sm w-fit'>
              Join the waitlist
            </button>
          }
        />
      </div>
    </div>
  );
};

export default Highlights;
