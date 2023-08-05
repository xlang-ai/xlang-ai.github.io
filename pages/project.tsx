import Image from 'next/image';
import React, { memo, useMemo } from 'react';

import projectImage from '@/public/demo.png';
import Link from 'next/link';

const Project = () => {
  return (
    <div className='w-full pt-20 sm:pt-36 pb-10 bg-[#D9D9D9]/20'>
      <div className='page-x-width'>
        <Intro />
        <HighlightProject />
        <SubHighlightProject />
        <RecentProject />
      </div>
    </div>
  );
};

const Intro = () => (
  <>
    <h1 className='font-[600] text-2xl mb-8'>Projects</h1>
    <p className='text-sm leading-6'>
      XLANG focuses on transforming natural language instructions (via large
      language models (LLMs)) into code or actions executable within real-world
      environments, including databases, web applications, and the physical
      world etc,. It lies at the heart of LLM-powered agents or natural language
      interfaces that interact with these real-world environments to facilitate
      human interaction with data analysis, web applications, and robotic
      instruction through conversation. Recent advances in Executable Language
      Grounding incorporate techniques such as LLM + external tools/actionable
      or agentic LLMs, code generation, semantic parsing, and dialog or
      interactive systems.
    </p>
  </>
);

const HighlightProject = () => {
  return (
    <div className='grid grid-cols-2'>
      <div className='max-sm:col-span-2 col-span-1'>
        <div className='flex flex-col gap-6 h-full justify-center w-3/4 max-sm:w-full'>
          <h1 className='max-sm:mt-6 font-[600] text-3xl my-0'>XLANG Agent</h1>
          <HighlightProjectImage className='sm:hidden' />
          <p className='max-sm:text-center text-lg my-0'>
            Open-source framework and ecosystem for building and evaluating
            LLM-based agents
          </p>
          <button
            className='max-sm:mx-auto btn btn-primary font-[500] py-1 w-44 text-xs rounded-md'
            onClick={() => {
              window.open('https://chat.xlang.ai', '_blank');
            }}
          >
            Start Chatting
          </button>
        </div>
      </div>
      <HighlightProjectImage className='max-sm:hidden' />
    </div>
  );
};

const HighlightProjectImage = ({ className }: { className?: string }) => (
  <div className={`col-span-1 ${className}`}>
    <div className='relative max-sm:w-full max-sm:h-[240px] w-[120%] h-[400px]'>
      <Image
        src={projectImage}
        alt='project'
        fill
        style={{ objectFit: 'contain', objectPosition: 'left center' }}
      />
    </div>
  </div>
);

interface SubHighlightProjectInterface {
  icon: string;
  title: string;
  desc: string;
  image?: string;
  slidesLink?: string;
  productLink?: string;
  videoLink?: string;
}

const subhighlightProjects: SubHighlightProjectInterface[] = [
  {
    icon: '/data-agent.png',
    title: 'Data Agent',
    desc: 'By combining code generation with DataTool, Data Copilot introduces a tool-augmented code paradigm. It enables the transformation of user intent, based on data, into actionable insights. This approach pushes the boundaries of traditional coding and tool usage.',
    image: '/demo.png',
    slidesLink: 'https://github.com/xlang-ai',
    productLink: 'https://github.com/xlang-ai',
    videoLink: 'https://github.com/xlang-ai',
  },
  {
    icon: '/plugin.svg',
    title: 'Plugin',
    desc: 'XLang Agents employ an intelligent Plugins system that connects to a wide range of real-world applications, effortlessly integrating into your daily life, assisting with tasks such as scheduling meetings, organizing emails, providing recipe recommendations, and finding optimal routes for your commute.',
    image: '/demo.png',
    slidesLink: 'https://github.com/xlang-ai',
    productLink: 'https://github.com/xlang-ai',
    videoLink: 'https://github.com/xlang-ai',
  },
  {
    icon: '/web-agent.svg',
    title: 'Web Agent',
    desc: 'Beyond retrieving information, WeBot takes proactive action. It adeptly navigates the complexities of the internet, completing intricate forms, making purchases on your behalf, and even uncovering hidden insights. ',
    image: '/demo.png',
    slidesLink: 'https://github.com/xlang-ai',
    productLink: 'https://github.com/xlang-ai',
    videoLink: 'https://github.com/xlang-ai',
  },
];

const SubHighlightProject = () => {
  return (
    <div className='my-20 flex flex-col gap-20'>
      {subhighlightProjects.map((proj, i) => (
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
  subHighlightProject: SubHighlightProjectInterface;
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
    <div className='grid grid-cols-2 gap-12'>
      {reverse || <ImageBlock className='max-sm:hidden' />}
      <div className='max-sm:col-span-2 col-span-1 flex flex-col gap-4'>
        <div className='flex gap-4 items-center'>
          <Image
            src={subHighlightProject.icon}
            alt={subHighlightProject.title}
            width={50}
            height={50}
          />
          <h1 className='text-2xl font-[500] text-[#6F6F6F]'>
            {subHighlightProject.title}
          </h1>
        </div>
        <ImageBlock className='sm:hidden' />
        <p className='text-sm flex-1'>{desc}</p>

        <div className='flex gap-4 text-xs justify-end'>
          {slidesLink && <Link href={slidesLink}>slides</Link>}
          {productLink && <Link href={productLink}>product</Link>}
          {videoLink && <Link href={videoLink}>video</Link>}
        </div>
      </div>
      {reverse && <ImageBlock className='max-sm:hidden' />}
    </div>
  );
};

interface Project {
  title: string;
  desc: string;
  image?: string;
}

const projects: Project[] = [
  {
    title: 'Binder: Binding Language Models in Symbolic Languages',
    desc: "One of the earliest works in LLM + tool use/agents, simultaneously with 'ReAct' last October. We proposed the use of LLM to leverage python/sql code interpreters and various API calls (similar to functional calling) to solve complex problems. This work was, unfortunately, under-recognized and under-credited. It proposed the concept of Toolformer and ChatGPT plugins half a year before its time.",
  },
  {
    title:
      'Instructor Embeddings: One Embedder, Any Task: Instruction-Finetuned Text Embeddings',
    desc: "This work showcased instruction-finetuned text embeddings/retriever, the SOTA embedding for retrieval, semantic similarity, etc. It's open-source, and superior to OpenAI embeddings! Used in retrieval augmented language models, it achieved over 500k downloads, over 1k stars, and was used in ~500 projects in half a year.",
  },
  {
    title: 'Selective Annotation',
    desc: "This work explored how annotation example selection impacts LLM's in-context learning performance.",
  },
  {
    title: 'Code Generation and Semantic Parsing',
    desc: 'represented recent LLM-based methods and benchmarks for general code generation, e.g., text-to-python. UnifiedSKG (EMNLP 2022) was a unified text-to-text SOTA T5 LM-based framework for 21 structured knowledge grounding tasks. A good summary in the direction before the ChatGPT era.',
  },
  {
    title:
      'Spider: A Large-Scale Human-Labeled Dataset for Complex and Cross-Domain Semantic Parsing and Text-to-SQL Task',
    desc: 'This was the most popular complex text-to-SQL benchmark, with over 200 submissions from top research labs, including Google, Facebook, UCB, CMU, UW, and more. It was widely studied not just in NLP but also HCI, VIS, PL, and DB communities.',
  },
  {
    title: 'Dialog and Interactive Systems',
    desc: 'This was the first work demonstrating LLM’s good performance on dialogue state tracking tasks. Other conversational text-to-code tasks included SParC (ACL 2019), CoSQL (EMNLP 2019), NL2Interface (NLVIZ 2022)',
  },
];

const RecentProject = () => {
  return (
    <div>
      <h1 className='font-[500] text-[#545454] text-2xl mb-4'>
        Recent Projects
      </h1>
      <div>
        {projects.map((project) => (
          <ProjectBlock project={project} key={project.title} />
        ))}
      </div>
    </div>
  );
};

const ProjectBlock = ({ project }: { project: Project }) => {
  return (
    <div className='border-t border-b border-black/30 py-6'>
      <div className='sm:flex gap-4'>
        {project.image ? (
          <div className='relative w-[180px] h-32'>
            <Image
              src={project.image}
              alt={project.title}
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>
        ) : (
          <div className='min-w-[180px] h-32 rounded bg-[#D9D9D9]' />
        )}

        <div className='flex flex-col'>
          <h1 className='text-lg font-[500] my-0'>{project.title}</h1>
          <p className='text-xs'>{project.desc}</p>
        </div>
      </div>
    </div>
  );
};

export default Project;
