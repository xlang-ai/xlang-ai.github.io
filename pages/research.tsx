import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const Research = () => {
  return (
    <div className='w-full pt-36 pb-10 bg-[#D9D9D9]/20'>
      <div className='page-x-width flex flex-col gap-10'>
        <Intro />
        <PapersSection />
        <TalksSection />
      </div>
    </div>
  );
};

const Intro = () => (
  <div className='text-sm font-[500]'>
    <h1 className='text-2xl mb-4'>Research</h1>
    <p>
      “X” in XLang Grounding LLMs into executable code or actions in different
      environments
    </p>
    <p>Enhance LLMs with various external tools for building AI agents</p>
    <p>
      Interdisciplinary research efforts among NLP, HCI, DB, VIS, UI, DataSci,
      Robotics, Code/PL, SE.
    </p>
    <p>Interaction among humans, agents, and environments.</p>
  </div>
);

type PaperCategory =
  | 'CodeGeneration'
  | 'ToolUse'
  | 'PoweredAgents'
  | 'EfficientLLMs'
  | 'InteractiveSystems'
  | 'Robotics';

const PaperCategoryNames: Record<PaperCategory, string> = {
  CodeGeneration: 'Code Generation and Semantic Parsing',
  ToolUse: 'lm + tool use/actionable or agentic LLMs',
  PoweredAgents: 'llm-powered agents',
  EfficientLLMs: 'Efficient and Generalizable Large Language Models',
  InteractiveSystems: 'dialog or interactive systems',
  Robotics: 'llm + robotics',
};

interface Paper {
  image?: string;
  category?: PaperCategory;
  title: string;
  authors: string;
  publication?: string;
  paperLink?: string;
  codeLink?: string;
  dataLink?: string;
  blogLink?: string;
  twitterLink?: string;
}

// TODO: verify links and category

const papers: Paper[] = [
  {
    category: 'CodeGeneration',
    title: 'Binder: Binding Language Models in Symbolic Languages',
    authors:
      'Zhoujun Cheng*, Tianbao Xie*, Peng Shi, Chengzu Li, Rahul Nadkarni, Yushi Hu, Caiming Xiong, Dragomir Radev, Mari Ostendorf, Luke Zettlemoyer, Noah A Smith, Tao Yu',
    publication: 'ICLR 2023',
    paperLink: 'https://arxiv.org/abs/2210.02875',
    codeLink: 'https://github.com/hkunlp/binder',
    dataLink: 'https://github.com/HKUNLP/Binder/tree/main/datasets',
    blogLink: 'https://github.com/hkunlp/binder',
    twitterLink: 'https://github.com/hkunlp/binder',
  },
  {
    category: 'PoweredAgents',
    title:
      'Instructor Embeddings: One Embedder, Any Task: Instruction-Finetuned Text Embeddings',
    authors:
      'Hongjin Su, Weijia Shi, Jungo Kasai, Yizhong Wang, Yushi Hu, Mari Ostendorf, Wen-tau Yih, Noah A. Smith, Luke Zettlemoyer, Tao Yu',
    publication: 'ACL 2023 Findings',
  },
  {
    category: 'ToolUse',
    title: 'Selective Annotation',
    authors:
      'Hongjin Su, Jungo Kasai, Chen Henry Wu, Weijia Shi, Tianlu Wang, Jiayi Xin, Rui Zhang, Mari Ostendorf, Luke Zettlemoyer, Noah A. Smith, Tao Yu',
    publication: 'ICLR 2023',
  },
];

const PapersSection = () => {
  const [filter, setFilter] = useState<PaperCategory>(null);
  const [filteredPapers, setFilteredPapers] = useState<Paper[]>(papers);

  useEffect(() => {
    setFilteredPapers(
      papers.filter((paper) => !filter || paper.category === filter)
    );
  }, [filter]);

  return (
    <div>
      <h1 className='text-2xl font-[500] mb-4'>Papers</h1>
      <div className='flex gap-3 flex-wrap'>
        {Object.entries(PaperCategoryNames).map(([key, value]) => (
          <div
            key={key}
            className='border border-[1.5px] border-[#7A7A7A] text-[#7A7A7A] rounded-lg py-1 px-3 text-xs cursor-pointer'
            style={
              filter === key ? { borderColor: '#0156AC', color: '#0156AC' } : {}
            }
            onClick={() => {
              if (key === filter) setFilter(null);
              else setFilter(key as PaperCategory);
            }}
          >
            {value}
          </div>
        ))}
      </div>

      <div className='flex flex-col mt-10'>
        {filteredPapers.map((paper) => (
          <PaperBlock paper={paper} key={paper.title} />
        ))}
      </div>
    </div>
  );
};

const PaperBlock = ({ paper }: { paper: Paper }) => {
  return (
    <div className='border-t border-b border-black/30 py-6'>
      <div className='sm:flex gap-4'>
        {paper.image ? (
          <div className='relative w-[180px] h-32'>
            <Image
              src={paper.image}
              alt={paper.title}
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>
        ) : (
          <div className='min-w-[180px] h-32 rounded bg-[#D9D9D9]' />
        )}

        <div className='flex flex-col'>
          <h1 className='text-lg font-[500]'>{paper.title}</h1>
          <p className='text-[#727272] text-xs font-[500]'>{paper.authors}</p>
          {paper.publication && (
            <p className='italic text-xs font-[500]'>{paper.publication}</p>
          )}
          <div className='flex justify-end w-full gap-3 font-[500] text-xs'>
            {paper.paperLink && (
              <a href={paper.paperLink} target='_blank'>
                paper
              </a>
            )}
            {paper.codeLink && (
              <a href={paper.codeLink} target='_blank'>
                code
              </a>
            )}
            {paper.dataLink && (
              <a href={paper.dataLink} target='_blank'>
                data
              </a>
            )}
            {paper.blogLink && (
              <a href={paper.blogLink} target='_blank'>
                blog
              </a>
            )}
            {paper.twitterLink && (
              <a href={paper.twitterLink} target='_blank'>
                twitter
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const TalksSection = () => {
  return (
    <div>
      <h1 className='text-xl font-[500] mb-10'>Talks</h1>
      <div className='flex flex-wrap gap-4'>
        {talks.map((talk) => (
          <TalkBlock talk={talk} key={talk.title} />
        ))}
      </div>
    </div>
  );
};

interface Talk {
  title: string;
  startDate: Date;
  endDate: Date;
  desc: string;
}

const talks: Talk[] = [
  {
    title:
      'Building Natural Language Interfaces through Grounding Language Models into Executable Actions',
    startDate: new Date('2023-04-01'),
    endDate: new Date('2023-05-01'),
    desc: 'Columbia NLP seminar\nCornell DB seminar\nMicrosoft Research Asia',
  },
  {
    title:
      'Building Natural Language Interfaces through Grounding Language Models into Executable Actions',
    startDate: new Date('2023-04-01'),
    endDate: new Date('2023-05-01'),
    desc: 'Columbia NLP seminar\nCornell DB seminar\nMicrosoft Research Asia',
  },
  {
    title:
      'Building Natural Language Interfaces through Grounding Language Models into Executable Actions',
    startDate: new Date('2023-04-01'),
    endDate: new Date('2023-05-01'),
    desc: 'Columbia NLP seminar\nCornell DB seminar\nMicrosoft Research Asia',
  },
  {
    title:
      'Building Natural Language Interfaces through Grounding Language Models into Executable Actions',
    startDate: new Date('2023-04-01'),
    endDate: new Date('2023-05-01'),
    desc: 'Columbia NLP seminar\nCornell DB seminar\nMicrosoft Research Asia',
  },
];

const TalkBlock = ({ talk }: { talk: Talk }) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  return (
    <div className='rounded-xl shadow p-8 min-w-[300px] w-[45%]'>
      <h1 className='text-lg text-[#0156AC]'>{talk.title}</h1>
      <p className='text-xs text-black/80'>
        {months[talk.startDate.getMonth()]} - {months[talk.endDate.getMonth()]}{' '}
        {talk.endDate.getFullYear()}
      </p>
      <p className='text-xs whitespace-pre-wrap'>{talk.desc}</p>
    </div>
  );
};

export default Research;
