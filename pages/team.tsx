import Image from 'next/image';
import React from 'react';

const fakeMembers: Member[] = [
  {
    name: 'John Doe',
    description:
      'Experienced software engineer with a passion for creating innovative solutions.',
    image: '/test2.png',
  },
  {
    name: 'Jane Smith',
    description:
      'Marketing specialist with expertise in digital strategy and campaign management.',
    image: '/test2.png',
    url: 'https://github.com',
  },
  {
    name: 'David Johnson',
    description:
      'Skilled graphic designer with a keen eye for aesthetics and attention to detail.',
    image: '/test2.png',
  },
  {
    name: 'Emily Davis',
    description:
      'Seasoned project manager adept at coordinating cross-functional teams and delivering results.',
    image: '/test2.png',
    url: 'https://github.com',
  },
  {
    name: 'Michael Wilson',
    description:
      'Data analyst with a strong analytical mindset and expertise in statistical modeling.',
    image: '/test2.png',
  },
  {
    name: 'Sarah Anderson',
    description:
      'Creative writer with a knack for crafting engaging and persuasive content.',
    image: '/test2.png',
  },
  {
    name: 'Robert Martinez',
    description:
      'Experienced sales executive with a track record of driving revenue growth and building strong client relationships.',
    image: '/test2.png',
  },
];

const Team = () => {
  return (
    <div className='py-20 bg-brand-offWhite min-h-screen'>
      <h1 className='title px-4 sm:px-10'>Team Members</h1>
      <div className='px-4 sm:px-10 pb-8 pt-4'>
        <h2 className='title mb-4'>Faculty</h2>
        <TeamGallery members={fakeMembers} />
      </div>

      <div className='bg-white px-4 sm:px-10 py-8'>
        <h2 className='title mb-4'>Postdoc and Ph.D.</h2>
        <TeamList members={fakeMembers} />
      </div>
      <div className='px-4 sm:px-10 py-8'>
        <h2 className='title mb-4'>Allumni</h2>
        <TeamList members={fakeMembers} />
      </div>
    </div>
  );
};

interface Member {
  name: string;
  description: string;
  image: string;
  url?: string;
}

const TeamGallery = ({ members }: { members: Member[] }) => {
  return (
    <div className='flex flex-wrap gap-x-20 gap-y-6'>
      {members.map((member) => (
        <div className='w-32 text-sm' key={member.name}>
          <div className='w-32 h-32 relative'>
            <Image
              src={member.image}
              alt={member.name}
              fill
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
                borderRadius: '10px',
              }}
            />
          </div>
          <a className='font-medium my-2' href={member.url}>
            {member.name}
          </a>
          <div>{member.description}</div>
        </div>
      ))}
    </div>
  );
};

const TeamList = ({ members }: { members: Member[] }) => {
  return (
    <div className='grid grid-cols-4 gap-y-1'>
      {members.map((member) => (
        <React.Fragment key={member.name}>
          <a
            className='font-medium col-span-1'
            style={
              member?.url
                ? { cursor: 'pointer', textDecoration: 'underline' }
                : undefined
            }
            href={member.url}
          >
            {member.name}
          </a>
          <span className='ml-2 col-span-3'>{member.description}</span>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Team;
