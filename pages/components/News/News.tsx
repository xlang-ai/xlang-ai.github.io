import { parseDate } from '@/utils/date';
import React from 'react';

interface NewsInterface {
  date: Date;
  description: string;
}
const news: NewsInterface[] = [
  {
    date: new Date('2021-10-26'),
    description: 'The (renewed) group website is now live!',
  },
  {
    date: new Date('2021-10-26'),
    description: 'The (renewed) group website is now live!',
  },
  {
    date: new Date('2021-10-26'),
    description: 'The (renewed) group website is now live!',
  },
  {
    date: new Date('2021-10-26'),
    description: 'The (renewed) group website is now live!',
  },
  {
    date: new Date('2021-10-26'),
    description: 'The (renewed) group website is now live!',
  },
];

const News = () => {
  return (
    <div className='w-full bg-[#D9D9D9]/20 max-sm:py-0 py-16'>
      <div className='page-x-width'>
        <h1 className='text-2xl font-normal'>News</h1>
        <div className='flex flex-col gap-2'>
          {news.map((n) => (
            <div
              className='flex gap-x-8 flex-wrap py-3 border-b border-black/30 text-sm'
              key={n.description}
            >
              <div>{parseDate(n.date)}</div>
              <div>{n.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
