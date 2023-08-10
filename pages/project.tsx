import Head from 'next/head';
import Image from 'next/image';
import { InferGetStaticPropsType } from 'next';
import React, {useEffect, useState} from 'react';

import projectImage from '@/public/demo.png';
import Link from 'next/link';
import {
  getHighlightProject,
  getHighlightSubProjects,
  getRecentProjects,
} from '@/utils/data';
import {
  HighlightProject as HighlightProjectInterface,
  HighlightSubProject,
  Project,
} from '@/interface/project';

const Project = ({
  recentProjects,
  hightlightProject,
  highlightSubProjects,
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
          <HighlightProject hightlightProject={hightlightProject} />
          <SubHighlightProject highlightSubProjects={highlightSubProjects} />
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
    Our lab is actively engaged in projects focused on creating language model agents that translate language instructions into executable actions across real-world domains such as databases (data agent), web applications (plugins/web agent), and the physical world (robotic agent) etc. We are currently developing an open-source framework to facilitate the construction and assessment of these agents, starting with XLang Agent demos. In the coming months, we&apos;ll open-source essential projects like frameworks, models, methods, and benchmarks, aiming to establish a robust community dedicated to building capable multifunctional agents.
    </p>
  </>
);

const HighlightProject = ({
  hightlightProject,
}: {
  hightlightProject: HighlightProjectInterface;
}) => {
  return (
    <div className='grid grid-cols-2'>
      <div className='max-sm:col-span-2 col-span-1'>
        <div className='flex flex-col max-sm:gap-3 gap-6 h-full justify-center w-3/4 max-sm:w-full'>
          <h1 className='max-sm:mt-6 max-sm:text-[#545454] max-sm:text-xl font-[600] text-3xl my-0'>
            {hightlightProject.title}
          </h1>
          <p className='max-sm:text-sm max-sm:leading-7 text-lg my-0'>
            {hightlightProject.desc}
          </p>
          <button
            className='max-sm:w-full max-sm:py-2 max-sm:text-sm max-sm:rounded-lg max-sm:mb-4 btn btn-primary font-[500] py-1 w-44 text-xs rounded-md'
            onClick={() => {
              window.open(hightlightProject.link, '_blank');
            }}
          >
            Try Online Demo
          </button>
        </div>
      </div>
      <HighlightProjectImage
        className='col-span-2 sm:col-span-1'
        image={hightlightProject.image}
      />
    </div>
  );
};

const HighlightProjectImage = ({
  className,
  image,
}: {
  className?: string;
  image: string;
}) => (
  <div className={`${className}`}>
    <div className='relative max-sm:w-full max-sm:h-[240px] w-[120%] h-[400px]'>
      <Image
        src={image}
        alt='project'
        fill
        style={{ objectFit: 'contain', objectPosition: 'left center' }}
      />
    </div>
  </div>
);

const SubHighlightProject = ({
  highlightSubProjects,
}: {
  highlightSubProjects: HighlightSubProject[];
}) => {
  return (
    <div className='my-20 flex flex-col max-sm:gap-12 gap-20'>
      {highlightSubProjects.map((proj, i) => (
        <SubHighlightProjectBlock
          key={proj.title}
          subHighlightProject={proj}
          reverse={i % 2 === 1}
        />
      ))}
    </div>
  );
};

const SubHighlightProjectBlock = ({
  subHighlightProject,
  reverse,
}: {
  subHighlightProject: HighlightSubProject;
  reverse?: boolean;
}) => {
  const { image, title, desc, slidesLink, productLink, videoLink } =
    subHighlightProject;

  const ImageBlock = ({ className }: { className?: string }) => (
    <div
      className={`col-span-1 h-[250px] relative rounded-lg overflow-hidden ${className}`}
    >
      {videoLink ? (
        <iframe 
          width="95%" 
          height="100%" 
          src={videoLink}
          style={{ objectFit: 'cover', objectPosition: 'left center' }}>
        </iframe>
      ) : (
        <div>
        <div>Coming soon, please stay tuned...</div>
        </div>
      )}
    </div>
  );

  return (
    <div className='grid grid-cols-2 max-sm:gap-6 gap-12'>
      {reverse || <ImageBlock className='max-sm:hidden' />}
      <div className='max-sm:col-span-2 col-span-1 flex flex-col gap-4'>
        <div className='flex gap-4 items-center'>
          <Image
            src={subHighlightProject.icon}
            alt={subHighlightProject.title}
            width={50}
            height={50}
          />
          <h1 className='text-md sm:text-2xl font-[500] text-[#6F6F6F]'>
            {subHighlightProject.title}
          </h1>
        </div>
        <p className='text-sm flex-1'>{desc}</p>

        <div className='max-sm:justify-start max-sm:underline flex gap-4 text-xs justify-end'>
          {slidesLink && <Link href={slidesLink}>use cases</Link>}
          {productLink && <Link href={productLink}>product</Link>}
          {/* {videoLink && <Link href={videoLink}>video</Link>} */}
        </div>
      </div>
      {reverse && <ImageBlock className='max-sm:hidden' />}
      <ImageBlock className='sm:hidden col-span-2' />
    </div>
  );
};

const RecentProject = ({ recentProjects }: { recentProjects: Project[] }) => {
  return (
    <div>
      <h1 className='text-lg font-[600] sm:font-[500] text-[#545454] sm:text-2xl mb-4'>
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
    <a href={project.link} target="_blank" >
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
  const hightlightProject = getHighlightProject();
  const highlightSubProjects = getHighlightSubProjects();
  return {
    props: {
      recentProjects,
      hightlightProject,
      highlightSubProjects,
    },
  };
}

export default Project;
