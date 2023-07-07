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
    <div className='py-20 bg-brand-offWhite min-h-screen flex flex-col items-center'>
      <h1>Team Members</h1>
      <h2>Faculty</h2>
      <TeamGallery members={fakeMembers} />
      <h2 className='mt-4'>Postdoc and Ph.D.</h2>
      <TeamList members={fakeMembers} />
      <h2 className='mt-4'>Allumni</h2>
      <TeamList members={fakeMembers} />
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
    <div className='flex flex-wrap gap-x-20 gap-y-6 sm:w-3/4 justify-center'>
      {members.map((member) => (
        <div className='w-32 text-sm'>
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
          <a className='font-medium my-1' href={member.url}>
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
    <div className='px-4'>
      {members.map((member) => (
        <div className='flex'>
          <a className='font-medium cursor-pointer underline' href={member.url}>
            {member.name}
          </a>
          <span className='ml-2'>({member.description})</span>
        </div>
      ))}
    </div>
  );
};

export default Team;
