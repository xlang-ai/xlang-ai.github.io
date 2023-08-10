import React from 'react';

import Image from 'next/image';
import Head from 'next/head';
import { InferGetStaticPropsType } from 'next';

import { Collaborator, TeamMember, Alumni } from '@/interface/team';

import {
  getFacultyMembers,
  getGraduates,
  getUndergraduates,
  getAlumni,
  getCollaborators,
} from '@/utils/data';

const Team = ({
  facultyMembers,
  graduates,
  undergraduates,
  alumni,
  collaborators,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>XLANG Lab | Team</title>
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/favicon/white-on-purple/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon/white-on-purple/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon/white-on-purple/favicon-16x16.png'
        />
        <link rel='manifest' href='/favicon/white-on-purple/site.webmanifest' />
      </Head>
      <div className='pt-20 sm:pt-36 w-full bg-[#D9D9D9]/20'>
        <div className='page-x-width flex flex-col gap-10 sm:gap-12 pb-10'>
          <Intro />
          <Faculty facultyMembers={facultyMembers} />
          <Graduates graduates={graduates} />
          <Undergraduates undergraduates={undergraduates} />
          <Alumni alumni={alumni} />
          <Collaborators collaborators={collaborators} />
          {/* <SpecialMemorialMentor /> */}
        </div>
      </div>
    </>
  );
};

const Intro = () => {
  return (
    <div className='flex flex-col gap-2'>
      <h1 className='text-2xl font-[500]'>Team</h1>
      <p>
        Our research team is dedicated to crafting language model agents that link language instructions to executable code or actions, enabling the execution of complex tasks in real-world scenarios. Consisting of a diverse and interdisciplinary group, our team merges expertise from fields such as NLP, HCI, DB, CV, VIS, Robotics, UI, DataSci, and Code/PL. This collaborative approach lets us explore our investigations from multiple angles, fostering a thorough understanding of the subject.      </p>
      {/*  <a href="https://forms.gle/3Ki9ectMB5D31F8g8" target="_blank" rel="noopener noreferrer">*/}
      {/*<button className='btn btn-secondary text-xs py-1 w-24'>Join Us</button>*/}
      {/*  </a>*/}
    </div>
  );
};

const MemberCard = ({ member }: { member: TeamMember }) => {
  const titles = member.titles.split(';');

  return (
    <div className='rounded-lg shadow p-4 flex gap-4 w-[340px]'>
      <div className='relative min-w-fit w-32 h-32 rounded-lg overflow-hidden'>
        {member.link ? (
          <a target="_blank" href={member.link}>
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
          </a>
        ) : (
          member.image ? (
            <Image
              src={member.image}
              alt={member.name}
              width={128}
              height={128}
            />
          ) : (
            <div className='bg-[#D9D9D9] rounded-lg w-32 h-32' />
          )
        )}
      </div>
      <div className='w-full'>
        <div className='font-[600] text-sm mb-1 mt-2'>
          {member.link ? (  
            <a target="_blank" href={member.link} className='text-black hover:text-brand-primary2'>{member.name}</a>  
          ) : (  
            <span className='text-black'>{member.name}</span>  
          )}
        </div>
        <div className='text-black/80 text-xs'>
          {titles.map((title, index) => (
            <div key={index} className='text-black mt-1'>{title}</div>
          ))}
        </div>
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

const Graduates = ({ graduates }: { graduates: TeamMember[] }) => {
  return (
    <div>
      <h1 className='text-2xl font-[500] mb-6'>Graduate Students & Visitors</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-y-4'>
        {graduates.map((member) => (
          <MemberCard member={member} key={member.name} />
        ))}
      </div>
    </div>
  );
};

const Undergraduates = ({ undergraduates }: { undergraduates: TeamMember[] }) => {
  return (
    <div>
      <h1 className='text-2xl font-[500] mb-6'>Undergraduate Students & Interns</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-y-4'>
        {undergraduates.map((member) => (
          <MemberCard member={member} key={member.name} />
        ))}
      </div>
    </div>
  );
};

const Alumni = ({ alumni }: { alumni: Alumni[] }) => {
  return (
    <div>
      <h1 className='text-2xl font-[500] mb-6'>Student & Visitor Alumni</h1>
      <div className='text-sm grid grid-cols-3 gap-6'>  
        {alumni.map((alumnus, index) => (  
          <div key={index}>  
            {alumnus.link ? (  
              <a href={alumnus.link} target='_blank' className='hover:text-brand-primary2'>  
                {alumnus.name} ({alumnus.institution})  
              </a>  
            ) : (  
              <span>{alumnus.name} ({alumnus.institution})</span>  
            )}  
          </div>  
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
  const category1 = collaborators.filter(c => c.category === '1');
  const category2 = collaborators.filter(c => c.category === '2');

  return (
    <div>
      <h1 className='text-2xl font-[500] mb-6'>Other Collaborators</h1>
      <div className='text-sm grid grid-cols-3 gap-6'>  
        {category1.map((collaborator, index) => (  
          <div key={index}>  
            {collaborator.link ? (  
              <a href={collaborator.link} target='_blank' className='hover:text-brand-primary2'>  
                {collaborator.name} ({collaborator.institution})  
              </a>  
            ) : (  
              <span>{collaborator.name} ({collaborator.institution})</span>  
            )}  
          </div>  
        ))}  
      </div>
      <hr className='my-6 border-black/10' />
      <div className='text-[#818181] font-[500] pb-2 mb-2 '>
        Special Memorial Mentor
      </div>
      <a href='http://www.cs.yale.edu/homes/radev/' target='_blank' className='text-sm hover:text-brand-primary2'>Dragomir Radev (Yale University)</a>
      <hr className='my-6 border-black/10' />
      <div className='text-sm grid grid-cols-3 gap-6'>  
        {category2.map((collaborator, index) => (  
          <div key={index}>  
            {collaborator.link ? (  
              <a href={collaborator.link} target='_blank' className='hover:text-brand-primary2'>  
                {collaborator.name} ({collaborator.institution})  
              </a>  
            ) : (  
              <span>{collaborator.name} ({collaborator.institution})</span>  
            )}  
          </div>  
        ))}  
      </div>
      {/* <div className='flex flex-col gap-6'>
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
      </div> */}
    </div>
  );
};

// const SpecialMemorialMentor = () => {
//   return (
//     <div>
//       <h1 className='text-2xl font-[500] mb-6'>Special Memorial Mentor</h1>
//       <span className='text-sm gap-6'>
//         <a href='http://www.cs.yale.edu/homes/radev/' target='_blank' className='hover:text-brand-primary2'>Dragomir Radev (Yale University)</a>
//       </span>
//     </div>
//   );
// }

export const getStaticProps = async () => {
  const facultyMembers = getFacultyMembers();
  const graduates = getGraduates();
  const undergraduates = getUndergraduates();
  const alumni = getAlumni();
  const collaborators = getCollaborators();

  return {
    props: {
      facultyMembers,
      graduates,
      undergraduates,
      alumni,
      collaborators,
    },
  };
};

export default Team;
