import React from 'react';
import { parseDateString } from '@/utils/date';
import { News as NewsInterface } from '@/interface/news';

const News = ({ news }: { news?: NewsInterface[] }) => {
  return (
    <div className='w-full bg-[#D9D9D9]/20 max-sm:py-4 py-16'>
      <div className='page-x-width'>
        <h1 className='text-2xl font-normal'>News</h1>
        <div className='flex flex-col gap-2'>
          {news &&
            news.map((n) => (
              <div
                className='grid grid-cols-[auto,1fr] gap-x-8 flex-wrap py-3 border-b border-black/30 text-sm'
                key={n.description}
              >
                <div>{parseDateString(n.date)}</div>
                <div>{n.description}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default News;
