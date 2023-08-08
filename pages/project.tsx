import Head from 'next/head';
import Image from 'next/image';
import { InferGetStaticPropsType } from 'next';
import React from 'react';

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
    <h1 className='font-[600] text-2xl mb-8'>Projects</h1>
    <p className='text-sm leading-6'>
      XLANG focuses on transforming natural language instructions (via large
      language models (LLMs)) into code or actions executable within real-world
      environments, including databases, web applications, and the physical
      world, etc. It lies at the heart of LLM-powered agents or natural language
      interfaces that interact with these real-world environments to facilitate
      human interaction with data analysis, web applications, and robotic
      instruction through conversation. Recent advances in Executable Language
      Grounding incorporate techniques such as LLM + external tools/actionable
      or agentic LLMs, code generation, semantic parsing, and dialog or
      interactive systems.
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
            Start Chatting
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
      className={`col-span-1 h-[300px] relative rounded-lg overflow-hidden ${className}`}
    >
      {image ? (
        <Image
          src={image}
          alt={title}
          fill
          style={{ objectFit: 'cover', objectPosition: 'left center' }}
        />
      ) : (
        <div className='bg-[#D9D9D9] w-full h-full' />
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
          {videoLink && <Link href={videoLink}>video</Link>}
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
        Recent Projects
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
    <div className='border-t border-b border-black/30 py-6'>
      <div className='max-sm:flex-col flex gap-4'>
        {project.image ? (
          <div className='relative w-[180px] max-sm:h-48 h-32'>
            <Image
              src={project.image}
              alt={project.title}
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>
        ) : (
          <div className='min-w-[180px] max-sm:h-48 h-32 rounded bg-[#D9D9D9]' />
        )}

        <div className='flex flex-col'>
          <h1 className='text-lg font-[500] my-0'>{project.title}</h1>
          <p className='text-xs'>{project.desc}</p>
        </div>
      </div>
    </div>
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
