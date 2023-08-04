import Image, { StaticImageData } from 'next/image';
import React from 'react';

import DemoImage from '@/public/demo.png';
import DataAgentImage from '@/public/data-agent.png';
import PluginImage from '@/public/plugin.svg';
import WebAgentImage from '@/public/web-agent.svg';

const Preview = () => {
  return (
    <div className='w-full py-16'>
      <div className='page-x-width'>
        <div className='grid grid-cols-4 h-fit md:h-[500px] mb-12'>
          <div className='max-sm:col-span-4 max-sm:mx-auto col-span-1 h-full flex flex-col justify-center max-w-[200px]'>
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
          <div className='max-sm:col-span-4 max-sm:h-[300px] col-span-3 relative'>
            <Image
              src={DemoImage}
              alt='Demo'
              fill
              style={{ objectFit: 'contain', objectPosition: 'center' }}
            />
          </div>
        </div>

        <div className='flex flex-wrap gap-10 justify-center'>
          <PreviewBox
            image={DataAgentImage}
            title='Data Agent'
            desc='open-source version of OpenAI with LLM + more data tools'
          />
          <PreviewBox
            image={PluginImage}
            title='Plugins'
            desc='open-source version of OpenAI by manipulating webs/plugins via APIs - web/app apis'
          />
          <PreviewBox
            image={WebAgentImage}
            title='Web Agent'
            desc='grounding natural language instructions into click and typing actions to manipulate webs as humans do.'
          />
        </div>
      </div>
    </div>
  );
};

const PreviewBox = ({
  image,
  title,
  desc,
}: {
  image: string | StaticImageData;
  title: string;
  desc: string;
}) => {
  return (
    <div className='flex flex-col items-center shadow rounded-2xl p-6 max-w-[220px]'>
      <div className='relative w-12 h-12'>
        <Image
          src={image}
          alt={title}
          fill
          style={{ objectFit: 'contain', objectPosition: 'center' }}
        />
      </div>
      <div className='text-lg'>{title}</div>
      <div className='text-[10px] text-center'>{desc}</div>
    </div>
  );
};

export default Preview;
