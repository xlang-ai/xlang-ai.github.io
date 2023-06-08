import React from 'react';

import { Check } from 'tabler-icons-react';

const RoadMap = () => {
  return (
    <div className='p-6'>
      <div className='title'>RoadMap</div>
      <div className='mt-6'>
        <div className='flex flex-col gap-1 w-1/3 m-auto border border-2 border-slate-400 rounded opacity-40'>
          <h2 className='text-center bg-slate-600 font-medium text-sm py-1'>
            June 2023
          </h2>
          <div className='flex flex-col gap-1 w-full p-2'>
            <RoadMapItem completed text='Python executor' />
            <RoadMapItem completed text='Public release' />
          </div>
        </div>

        <RoadMapLine completed />

        <div className='flex flex-col gap-1 w-1/3 m-auto border border-2 border-slate-400 rounded'>
          <h2 className='text-center bg-slate-600 font-medium text-sm py-1'>
            July 2023
          </h2>
          <div className='flex flex-col gap-1 w-full p-2'>
            <RoadMapItem text='Public release' />
            <RoadMapItem text='MongoDB connector' />
          </div>
        </div>

        <RoadMapLine />

        <div className='flex flex-col gap-1 w-1/3 m-auto border border-2 border-slate-400 rounded'>
          <h2 className='text-center bg-slate-600 font-medium text-sm py-1'>
            August 2023
          </h2>
          <div className='flex flex-col gap-1 w-full p-2'>
            <RoadMapItem text='Public release' />
            <RoadMapItem text='MongoDB connector' />
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckBox = ({ ticked }: { ticked?: boolean }) => (
  <div className='border border-slate-300 w-4 h-4 flex items-center justify-center rounded-sm text-slate-200'>
    {ticked && <Check size={20} />}
  </div>
);

const RoadMapItem = ({
  completed,
  text,
}: {
  completed?: boolean;
  text: string;
}) => (
  <div className='flex gap-2 items-center text-sm'>
    <CheckBox ticked={completed} />
    <div className='text-slate-300 text-xs'>{text}</div>
  </div>
);

const RoadMapLine = ({ completed }: { completed?: boolean }) => (
  <div
    className={`w-0.5 h-10 bg-slate-400 m-auto ${
      completed ? 'opacity-40' : ''
    }`}
  />
);

export default RoadMap;
