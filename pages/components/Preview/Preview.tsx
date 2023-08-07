import Image, { StaticImageData } from 'next/image';
import React, { useState } from 'react';

import DemoImage from '@/public/demo/demo.png';
import { HighlightSubProject } from '@/interface/project';
import Link from 'next/link';

const Preview = ({ subProj }: { subProj?: HighlightSubProject[] }) => {
  const [index, setIndex] = useState<number>(0);

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
            <Link href='https://chat.xlang.ai' target='_blank'>
              <div
                className='max-sm:w-full btn btn-primary text-xs font-[600] py-2'
                onClick={() => window.open('https://chat.xlang.ai', '_blank')}
              >
                Start Chatting
              </div>
            </Link>
          </div>
          {subProj && (
            <div className='max-sm:col-span-4 max-sm:h-[300px] max-sm:my-2 rounded-lg overflow-hidden col-span-3 relative'>
              <Image
                src={subProj[0].image}
                alt='Demo'
                fill
                style={{ objectFit: 'contain', objectPosition: 'left center' }}
              />
            </div>
          )}
        </div>

        <div className='flex flex-wrap gap-10 justify-center'>
          {subProj &&
            subProj.map((proj, i) => (
              <FeatureBox
                proj={proj}
                selected={index === i}
                index={i}
                setIndex={setIndex}
                key={proj.title}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

const FeatureBox = ({
  proj,
  selected,
  index,
  setIndex,
}: {
  proj: HighlightSubProject;
  selected: boolean;
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div
      className='flex flex-col items-center shadow-lg rounded-2xl p-6 max-w-[220px] border cursor-pointer'
      style={selected ? { borderColor: '#0156AC' } : {}}
      onClick={() => setIndex(index)}
    >
      <div className='relative w-12 h-12'>
        <Image
          src={proj.icon}
          alt={proj.title}
          fill
          style={{ objectFit: 'contain', objectPosition: 'center' }}
        />
      </div>
      <div className='text-lg'>{proj.title}</div>
      <div className='text-[10px] text-center flex-1 pb-4'>
        {proj.shortDesc}
      </div>

      <div className='flex gap-4'>
        {proj.videoLink && (
          <Link href={proj.videoLink} target='_blank'>
            <div className='btn cursor-pointer text-[#0156AC] border border-[#0156AC] font-[600] rounded-lg py-1 px-4 text-xs'>
              Video
            </div>
          </Link>
        )}
        {proj.slidesLink && (
          <Link href={proj.slidesLink} target='_blank'>
            <div className='btn cursor-pointer bg-[#0156AC] text-white border border-[#0156AC] font-[600] rounded-lg py-1 px-4 text-xs'>
              Details
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Preview;
