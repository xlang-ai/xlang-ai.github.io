import Image, { StaticImageData } from 'next/image';
import React, { useState } from 'react';

import { HighlightSubProject } from '@/interface/project';
import Link from 'next/link';

const Preview = ({ subProj }: { subProj?: HighlightSubProject[] }) => {
  const [index, setIndex] = useState<number>(0);

  return (
    <div className='w-full max-sm:py-8 py-16'>
      <div className='page-x-width'>
        <div className='grid grid-cols-4 gap-1 h-fit md:h-[500px] max-sm:mb-4 mb-12'>
          <div className='col-span-4'>
                <p className='text-lg leading-6 my-4'>XLang Agents: Our ongoing effort to build an open-source framework and ecosystem for building and evaluating language model agents. The open-source journey begins with XLang Agent demos. In the following months, and beyond, we will be open-sourcing several significant projects, including a framework, models, methods, benchmarks, and more. In the foreseeable future, we envision that a proficient functional agent will require the fusion of these various agents.</p>
          </div>
          <div className='col-span-4'>
              <img src='/demo/xlang_overview.jpg' alt='xlang-overview' className='w-full h-auto my-4' />
          </div>
        </div>
        <div className='grid grid-cols-4 gap-1 h-fit md:h-[500px] max-sm:mb-4 mb-12'>
          <div className='max-sm:col-span-4 max-sm:max-w-fit col-span-1 h-full flex flex-col justify-center max-w-[200px]'>
            <div className='text-2xl font-[600] mb-4'>XLANG Agents</div>
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
            <div className='max-sm:col-span-4 max-sm:h-[55vw] rounded-lg overflow-hidden col-span-3 relative'>
              <Image
                src={subProj[0].image}
                alt='Demo'
                fill
                style={{ objectFit: 'contain', objectPosition: 'left center' }}
              />
            </div>
          )}
        </div>

        <div className='flex flex-wrap gap-10 grid grid-cols-1 sm:grid-cols-2 justify-center'>
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
    <a href={proj.useCaseLink} target='_blank'>
      <div
        className='flex items-center shadow-lg rounded-2xl p-6 gap-2 max-w-[400px] max-h-[150px] cursor-pointer'
        style={selected ? { borderColor: '#0156AC' } : {}}
        onClick={() => setIndex(index)}
      >
        <div className='relative w-36 h-36'>
          <Image
            src={proj.icon}
            alt={proj.title}
            fill
            style={{ objectFit: 'contain', objectPosition: 'center' }}
          />
        </div>
        <div className='flex flex-col gap-2 mt-4 ml-4'>
          <div className='text-lg'>{proj.title}</div>
          <div className='text-[10px] flex-1 pb-4'>{proj.shortDesc}</div>
        </div>
        {/* <div className='text-lg'>{proj.title}</div>
        <div className='text-[10px] text-center flex-1 pb-4'>
          {proj.shortDesc}
        </div> */}

        {/*<div className='flex gap-4'>*/}
        {/*  {proj.videoLink && (*/}
        {/*    <Link href={proj.videoLink} target='_blank'>*/}
        {/*      <div className='btn cursor-pointer text-[#0156AC] border border-[#0156AC] font-[600] rounded-lg py-1 px-4 text-xs'>*/}
        {/*        Video*/}
        {/*      </div>*/}
        {/*    </Link>*/}
        {/*  )}*/}
        {/*  {proj.slidesLink && (*/}
        {/*    <Link href={proj.slidesLink} target='_blank'>*/}
        {/*      <div className='btn cursor-pointer bg-[#0156AC] text-white border border-[#0156AC] font-[600] rounded-lg py-1 px-4 text-xs'>*/}
        {/*        Details*/}
        {/*      </div>*/}
        {/*    </Link>*/}
        {/*  )}*/}
        {/*</div>*/}
      </div>
    </a>
  );
};

export default Preview;
