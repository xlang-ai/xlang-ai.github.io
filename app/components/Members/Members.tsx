import React from 'react';

import Image from 'next/image';

interface Member {
  image: string;
  name: string;
}
const members: Member[] = [
  {
    image: '/test3.png',
    name: 'Euna',
  },
  {
    image: '/test.png',
    name: 'Ruben',
  },
  {
    image: '/test2.png',
    name: 'Derek',
  },
  {
    image: '/xlang-ai.png',
    name: 'Xlang AI',
  },
];

const Members = () => {
  return (
    <div className='p-10'>
      <div className='title mb-7'>Members</div>

      <div className='flex gap-x-6 gap-y-4 flex-wrap justify-center'>
        {members.map((member) => {
          return (
            <div key={member.name} className='flex flex-col items-center gap-2'>
              <div className='relative w-20 h-20 rounded-full overflow-hidden'>
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                />
              </div>
              <a className='font-medium hover:underline cursor-pointer'>
                {member.name}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Members;
