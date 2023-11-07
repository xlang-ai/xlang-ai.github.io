import Head from 'next/head';
import Image from 'next/image';
import { InferGetStaticPropsType } from 'next';
import React from 'react';

import { getRecentProjects } from '@/utils/data';
import { Project } from '@/interface/project';

const Project = ({
  recentProjects,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>XLANG Lab | Projects</title>
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/favicon/white-on-blue/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon/white-on-blue/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon/white-on-blue/favicon-16x16.png'
        />
        <link rel='manifest' href='/favicon/white-on-blue/site.webmanifest' />
      </Head>
      <div className='w-full pt-20 sm:pt-36 pb-10 bg-[#D9D9D9]/20'>
        <div className='page-x-width'>
          <Intro />
          <RecentProject recentProjects={recentProjects} />
        </div>
      </div>
    </>
  );
};

const Intro = () => (
  <>
    <h1 className='text-2xl mb-6'>Projects</h1>
    <p className='leading-7'>
      Our lab is actively engaged in projects focused on creating language model
      agents that translate language instructions into executable actions across
      real-world domains such as databases (data agent), web applications
      (plugins/web agent), and the physical world (robotic agent) etc. We are
      currently developing an open-source framework to facilitate the
      construction and assessment of these agents, starting with XLang Agent
      demos. In the coming months, we&apos;ll open-source essential projects
      like frameworks, models, methods, and benchmarks, aiming to establish a
      robust community dedicated to building capable multifunctional agents.
    </p>
  </>
);

const RecentProject = ({ recentProjects }: { recentProjects: Project[] }) => {
  return (
    <div>
      <h1 className='text-lg font-[600] sm:font-[500] text-[#545454] sm:text-2xl mb-4 mt-6'>
        Selected Projects
      </h1>
      <div>
        {recentProjects.map((project) => (
          <ProjectBlock project={project} key={project.title} />
        ))}
      </div>
    </div>
  );
};

const ProjectBlock = ({ project }: { project: Project }) => {
  return (
    <a href={project.link} target='_blank'>
      <div className='border-t border-b border-black/30 py-6'>
        <div className='max-sm:flex-col flex gap-4'>
          {project.image ? (
            <div className='relative min-w-[180px] max-sm:h-48 h-32 rounded-lg overflow-hidden my-auto shadow-xl'>
              <Image
                src={project.image}
                alt={project.title}
                fill
                style={{ objectFit: 'fill', objectPosition: 'left center' }}
              />
            </div>
          ) : (
            <div className='min-w-[180px] max-sm:h-48 h-32 rounded bg-[#D9D9D9]' />
          )}

          <div className='flex flex-col'>
            <h1 className='text-lg font-[500] my-0'>{project.title}</h1>
            <li className='text-xs'>{project.desc}</li>
          </div>
        </div>
      </div>
    </a>
  );
};

export async function getStaticProps() {
  const recentProjects = getRecentProjects();
  return {
    props: {
      recentProjects,
    },
  };
}

export default Project;
