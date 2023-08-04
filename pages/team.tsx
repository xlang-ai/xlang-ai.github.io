import Image from 'next/image';
import React from 'react';

const Team = () => {
  return (
    <div className='pt-36 w-full bg-[#D9D9D9]/20'>
      <div className='page-x-width flex flex-col gap-12 pb-10'>
        <Intro />
        <Faculty />
        <CoreMembers />
        <Collaborators />
      </div>
    </div>
  );
};

const Intro = () => {
  return (
    <div className='flex flex-col gap-2'>
      <h1 className='text-2xl font-[500]'>Team</h1>
      <p>
        We have an interdisciplinary team that allows us to carry out studies
        ranging from exploring to the development of next-generation
      </p>
      <button className='btn btn-secondary text-xs py-1 w-24'>Join Us</button>
    </div>
  );
};

interface TeamMember {
  image?: string;
  name: string;
  title: string;
}

const MemberCard = ({ member }: { member: TeamMember }) => {
  return (
    <div className='rounded-lg shadow p-6 flex gap-4 w-[340px]'>
      <div className='relative w-32 h-32'>
        {member.image ? (
          <Image src={member.image} alt={member.name} />
        ) : (
          <div className='bg-[#D9D9D9] rounded-lg w-32 h-32' />
        )}
      </div>
      <div className='w-full mt-3'>
        <div className='font-[600] text-sm mb-2'>{member.name}</div>
        <div className='text-black/80 text-xs'>{member.title}</div>
      </div>
    </div>
  );
};

const facultyMember: TeamMember[] = [
  {
    name: 'Tao Yu',
    title:
      'Assistant Professor of Computer Science, Co-director of the HKU NLP Group',
  },
];

const Faculty = () => {
  return (
    <div>
      <h1 className='text-2xl font-[500] mb-6'>Faculty</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-y-4'>
        {facultyMember.map((member) => (
          <MemberCard member={member} key={member.name} />
        ))}
      </div>
    </div>
  );
};

const coreMember: TeamMember[] = [
  {
    name: 'Yiheng Xu',
    title: 'PhD student',
  },
  {
    name: 'Yiheng Xu',
    title: 'PhD student',
  },
  {
    name: 'Yiheng Xu',
    title: 'PhD student',
  },
  {
    name: 'Yiheng Xu',
    title: 'PhD student',
  },
  {
    name: 'Yiheng Xu',
    title: 'PhD student',
  },
  {
    name: 'Yiheng Xu',
    title: 'PhD student',
  },
  {
    name: 'Yiheng Xu',
    title: 'PhD student',
  },
  {
    name: 'Yiheng Xu',
    title: 'PhD student',
  },
  {
    name: 'Yiheng Xu',
    title: 'PhD student',
  },
];

const CoreMembers = () => {
  return (
    <div>
      <h1 className='text-2xl font-[500] mb-6'>Core Member</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-y-4'>
        {coreMember.map((member) => (
          <MemberCard member={member} key={member.name} />
        ))}
      </div>
    </div>
  );
};

interface Collaborator {
  institution: string;
  members: string[];
}

const collaborators: Collaborator[] = [
  {
    institution: 'Salesforce Research',
    members: ['Caiming Xiong', 'Chen Xing'],
  },
  { institution: 'Google Research', members: ['Will Wu', 'Yaqing Wang'] },
  {
    institution: 'Amazon AWS',
    members: ['Yi Zhang', 'Zhiguo Wang', 'Salvatore Romeo'],
  },
  { institution: 'DB', members: ['Yiru Chen', 'Bohan Zhang'] },
  {
    institution: 'HCI/VIS',
    members: ['Haotian Li', 'Xingbo Wang', 'Ziyi Huang'],
  },
  {
    institution: 'Other',
    members: [
      'Bailin Wang',
      'Ruiqi Zhong',
      'Sida Wang',
      'Zijian He',
      'Ansong Ni',
    ],
  },
];

const Collaborators = () => {
  return (
    <div>
      <h1 className='text-2xl font-[500] mb-6'>Collaborators</h1>
      <div className='flex flex-col gap-6'>
        {collaborators.map((collaborator) => (
          <div key={collaborator.institution}>
            <div className='text-[#818181] font-[500] pb-2 mb-2 border-b border-black/30'>
              {collaborator.institution}
            </div>
            <div className='flex flex-wrap gap-y-3'>
              {collaborator.members.map((member) => (
                <div key={member} className='w-72 font-[500] text-sm'>
                  {member}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
