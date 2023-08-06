import {
  getCollaborators,
  getCoreTeamMembers,
  getFacultyMembers,
} from '@/utils/data';
import { InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import React from 'react';

interface TeamMember {
  image?: string;
  name: string;
  title: string;
}

interface Collaborator {
  institution: string;
  members: string[];
}

const Team = ({
  facultyMembers,
  coreMembers,
  collaborators,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className='pt-20 sm:pt-36 w-full bg-[#D9D9D9]/20'>
      <div className='page-x-width flex flex-col gap-10 sm:gap-12 pb-10'>
        <Intro />
        <Faculty facultyMembers={facultyMembers} />
        <CoreMembers coreMembers={coreMembers} />
        <Collaborators collaborators={collaborators} />
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

const MemberCard = ({ member }: { member: TeamMember }) => {
  return (
    <div className='rounded-lg shadow p-6 flex gap-4 w-[340px]'>
      <div className='relative min-w-fit w-32 h-32 rounded-lg overflow-hidden'>
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            width={128}
            height={128}
          />
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

const Faculty = ({ facultyMembers }: { facultyMembers: TeamMember[] }) => {
  return (
    <div>
      <h1 className='text-2xl font-[500] mb-6'>Faculty</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-y-4'>
        {facultyMembers.map((member) => (
          <MemberCard member={member} key={member.name} />
        ))}
      </div>
    </div>
  );
};

const CoreMembers = ({ coreMembers }: { coreMembers: TeamMember[] }) => {
  return (
    <div>
      <h1 className='text-2xl font-[500] mb-6'>Core Member</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-y-4'>
        {coreMembers.map((member) => (
          <MemberCard member={member} key={member.name} />
        ))}
      </div>
    </div>
  );
};

const Collaborators = ({
  collaborators,
}: {
  collaborators: Collaborator[];
}) => {
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

export const getStaticProps = async () => {
  const facultyMembers = getFacultyMembers() as TeamMember[];
  const coreMembers = getCoreTeamMembers() as TeamMember[];
  const collaborators = getCollaborators() as Collaborator[];

  return {
    props: {
      facultyMembers,
      coreMembers,
      collaborators,
    },
  };
};

export default Team;
