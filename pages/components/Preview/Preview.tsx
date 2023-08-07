import Image, { StaticImageData } from 'next/image';
import React, { useState } from 'react';

import DemoImage from '@/public/demo/demo.png';
import DataAgentImage from '@/public/icons/data-agent.png';
import PluginImage from '@/public/icons/plugin.svg';
import WebAgentImage from '@/public/icons/web-agent.svg';

const Preview = () => {
  const [preview, setPreview] = useState<string | StaticImageData>(DemoImage);

  return (
    <div className='w-full max-sm:py-8 py-16'>
      <div className='page-x-width'>
        <div className='grid grid-cols-4 h-fit md:h-[500px] max-sm:mb-4 mb-12'>
          <div className='max-sm:col-span-4 max-sm:max-w-fit col-span-1 h-full flex flex-col justify-center max-w-[200px]'>
            <div className='text-2xl font-bold mb-4'>XLANG Agent</div>
            <div className='  text-left text-sm leading-6 mb-4'>
              Open-source framework and ecosystem for building and evaluating
              LLM-based agents
            </div>
            <div
              className='max-sm:w-full btn btn-primary text-xs font-[600] py-2'
              onClick={() => window.open('https://chat.xlang.ai', '_blank')}
            >
              Start Chatting
            </div>
          </div>
          <div className='max-sm:col-span-4 max-sm:h-[300px] max-sm:my-2 rounded-lg overflow-hidden col-span-3 relative'>
            <Image
              src={preview}
              alt='Demo'
              fill
              style={{ objectFit: 'contain', objectPosition: 'left center' }}
            />
          </div>
        </div>

        <div className='flex flex-wrap gap-10 justify-center'>
          {features.map((feature) => (
            <FeatureBox
              feature={feature}
              preview={preview}
              setPreview={setPreview}
              key={feature.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface Feature {
  icon: string | StaticImageData;
  title: string;
  desc: string;
  video?: string | StaticImageData;
  details?: string;
}

const features: Feature[] = [
  {
    icon: DataAgentImage,
    title: 'Data Agent',
    desc: 'open-source version of OpenAI with LLM + more data tools',
    video: DemoImage,
    details: '1',
  },
  {
    icon: PluginImage,
    title: 'Plugins',
    desc: 'open-source version of OpenAI by manipulating webs/plugins via APIs - web/app apis',
    video: '/demo/xlang-demo.png',
    details: '2',
  },
  {
    icon: WebAgentImage,
    title: 'Web Agent',
    desc: 'grounding natural language instructions into click and typing actions to manipulate webs as humans do.',
    video: '/icons/data-agent.svg',
    details: '3',
  },
];

const FeatureBox = ({
  feature,
  preview,
  setPreview,
}: {
  feature: Feature;
  preview: string | StaticImageData;
  setPreview: React.Dispatch<React.SetStateAction<string | StaticImageData>>;
}) => {
  const isSelected = preview === feature.video;

  return (
    <div
      className='flex flex-col items-center shadow-lg rounded-2xl p-6 max-w-[220px] border cursor-pointer'
      style={isSelected ? { borderColor: '#0156AC' } : {}}
      onClick={() => setPreview(feature.video)}
    >
      <div className='relative w-12 h-12'>
        <Image
          src={feature.icon}
          alt={feature.title}
          fill
          style={{ objectFit: 'contain', objectPosition: 'center' }}
        />
      </div>
      <div className='text-lg'>{feature.title}</div>
      <div className='text-[10px] text-center flex-1 pb-4'>{feature.desc}</div>

      <div className='flex gap-4'>
        {feature.video && (
          <div className='btn cursor-pointer text-[#0156AC] border border-[#0156AC] font-[600] rounded-lg py-1 px-4 text-xs'>
            Video
          </div>
        )}
        {feature.details && (
          <div className='btn cursor-pointer bg-[#0156AC] text-white border border-[#0156AC] font-[600] rounded-lg py-1 px-4 text-xs'>
            Details
          </div>
        )}
      </div>
    </div>
  );
};

export default Preview;
