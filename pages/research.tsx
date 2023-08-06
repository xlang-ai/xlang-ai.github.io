import { getPapers, getTalks } from '@/utils/data';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

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

interface Talk {
  title: string;
  startDate: Date;
  endDate: Date;
  desc: string;
  link?: string;
}

const Research = ({ papers, talks }: { papers: Paper[]; talks: Talk[] }) => {
  return (
    <div className='w-full pt-20 sm:pt-36 pb-10 bg-[#D9D9D9]/20'>
      <div className='page-x-width flex flex-col gap-8 sm:gap-10'>
        <Intro />
        <PapersSection papers={papers} />
        <TalksSection talks={talks} />
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

const PapersSection = ({ papers }: { papers: Paper[] }) => {
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
          <div className='relative min-w-[180px] max-sm:h-48 h-32 rounded-lg overflow-hidden'>
            <Image
              src={paper.image}
              alt={paper.title}
              fill
              style={{ objectFit: 'contain', objectPosition: 'left center' }}
            />
          </div>
        ) : (
          <div className='min-w-[180px] max-sm:h-48 h-32 rounded bg-[#D9D9D9]' />
        )}

        <div className='flex flex-col w-full'>
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

const TalksSection = ({ talks }: { talks: Talk[] }) => {
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

const TalkBlock = ({ talk }: { talk: Talk }) => {
  const [date, setDate] = useState<string>();

  useEffect(() => {
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

    const start = new Date(talk.startDate);
    const end = new Date(talk.endDate);

    const startMonth = months[start.getMonth()];
    const endMonth = months[end.getMonth()];
    const startYear = start.getFullYear();
    const endYear = end.getFullYear();

    let dateString = '';
    if (startYear === endYear) {
      if (startMonth === endMonth) {
        dateString = `${startMonth} ${startYear}`;
      } else {
        dateString = `${startMonth} - ${endMonth} ${endYear}`;
      }
    } else {
      dateString = `${startMonth} ${startYear} - ${endMonth} ${endYear}`;
    }

    setDate(dateString);
  }, [talk]);

  return (
    <div
      className='rounded-xl shadow-md p-8 min-w-full sm:min-w-[300px] w-[45%]'
      style={talk.link ? { cursor: 'pointer' } : {}}
      onClick={() => {
        if (talk.link) window.open(talk.link, '_blank');
      }}
    >
      <h1 className='text-lg text-[#0156AC]'>{talk.title}</h1>
      {date && <p className='text-xs text-black/80'>{date}</p>}
      <p className='text-xs whitespace-pre-wrap'>{talk.desc}</p>
    </div>
  );
};

export async function getStaticProps() {
  const papers = getPapers();
  const talks = getTalks();

  return {
    props: {
      papers,
      talks,
    },
  };
}

export default Research;
