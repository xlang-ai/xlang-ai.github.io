import React from 'react';

import TextWithImage from '../TextWithImage';
import { publicFilePath } from '@/utils';

const ResearchDirections = () => {
  return (
    <div className='w-[80vw] sm:w-[70vw] m-auto bg-brand-offWhite pt-20'>
      <div className='text-2xl mb-10 font-[600]'>Research Directions</div>

      <div className='flex flex-col gap-24 mt-5'>
        <TextWithImage
          image={publicFilePath('/transcriber.png')}
          title='Executable Language Grounding'
          subtitle='Semantic Parsing and Code Generation'
          content='leverage various tools and take actions in different environments'
          button={
            <button className='btn btn-secondary text-sm w-fit'>
              See More
            </button>
          }
        />

        <TextWithImage
          image={publicFilePath('/transcriber.png')}
          title='Efficient Generalizable Large Language Models'
          subtitle='Semantic Parsing and Code Generation'
          content='Unleash the power of your digital companion - Xlang AI, guiding you effortlessly through every task, anticipating your needs with unrivaled intelligence and finesse.'
          reverse
          button={
            <button className='btn btn-secondary text-sm w-fit'>
              See More
            </button>
          }
        />

        <TextWithImage
          image={publicFilePath('/transcriber.png')}
          title='Dialog and Interactive Systems'
          subtitle='Semantic Parsing and Code Generation'
          content='Unleash the power of your digital companion - Xlang AI, guiding you effortlessly through every task, anticipating your needs with unrivaled intelligence and finesse.'
          button={
            <button className='btn btn-secondary text-sm w-fit'>
              See More
            </button>
          }
        />
      </div>
    </div>
  );
};

export default ResearchDirections;
