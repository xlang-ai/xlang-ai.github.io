import React, { useEffect, useState } from 'react';

import Head from 'next/head';
import Image from 'next/image';
import { InferGetStaticPropsType } from 'next';
import { Star } from 'tabler-icons-react';
import { Download } from 'tabler-icons-react';

import { getPapers, getTalks } from '@/utils/data';

import { Paper, PaperCategory, Talk } from '@/interface/research';
import { publicFilePath } from '@/utils';
const PaperCategoryNames: Record<PaperCategory, string> = {
  // CodeGeneration: 'code generation and semantic parsing',
  CodeGeneration: 'Code Generation for Data Science',
  DigitalAIAgents: 'Grounding Language in the Digital World',
  PhysicalAIAgents: 'Grounding Language in the Physical World',
  Others: 'Others : RAG, Tool use, Efficient LLM, Data synthesis etc.',
};

const Publications = ({
  papers,
  talks,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>XLANG Lab | Research</title>
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/favicon/white-on-green/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon/white-on-green/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon/white-on-green/favicon-16x16.png'
        />
        <link rel='manifest' href='/favicon/white-on-green/site.webmanifest' />
      </Head>
      <div className='w-full pt-20 sm:pt-36 pb-10 bg-[#D9D9D9]/20'>
        <div className='page-x-width flex flex-col gap-8 sm:gap-6'>
          <Intro />
          <PapersSection papers={papers} />
          {/*<TalksSection talks={talks} />*/}
        </div>
      </div>
    </>
  );
};

const Intro = () => (
  <div>
    <h1 className='text-2xl mb-6'>Research</h1>
    <p className='leading-7'>
      Our research focuses on building grounded AI systems that enable users to interact 
      through natural language with digital and physical environments. We develop AI agents 
      that translate language and perception into executable code and actions, empowering 
      people to perform data science, control computers, and collaborate with robots. Our 
      work spans three core areas: code generation for data science, grounding language in 
      the digital world, and grounding language in the physical world.
    </p>
  </div>
);

const PapersSection = ({ papers }: { papers: Paper[] }) => {
  const [filter, setFilter] = useState<PaperCategory>(null);
  const [filteredPapers, setFilteredPapers] = useState<Paper[]>(papers);

  useEffect(() => {
    setFilteredPapers(
      papers.filter((paper) => !filter || paper.category.includes(filter))
    );
  }, [filter, papers]);

  return (
    <div>
      <h1 className='text-2xl font-[500] mb-6'>Papers</h1>
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
  const [githubStars, setGithubStars] = useState<number>();
  const [huggingfaceDownloads, setHuggingfaceDownloads] = useState<number>();

  useEffect(() => {
    paper.codeLink &&
      (async () => {
        const stars = await getGitHubStars(paper.codeLink);
        setGithubStars(stars);
      })();

    paper.huggingfaceModel &&
      (async () => {
        const downloads = await getHuggingFaceDownloads(paper.huggingfaceModel);
        setHuggingfaceDownloads(downloads);
      })();
  }, [githubStars, paper.codeLink, paper.huggingfaceModel]);

  return (
    <div className='border-t border-b border-black/30 py-6'>
      <div className='grid grid-cols-6 gap-4'>
        {paper.image ? (
          <div className='col-span-2 relative aspect-video rounded-lg overflow-hidden shadow-xl'>
            <Image
              src={publicFilePath(paper.image)}
              alt={paper.title}
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>
        ) : (
          <div className='col-span-2 aspect-video rounded bg-[#D9D9D9]' />
        )}

        <div className='col-span-4 flex flex-col'>
          <h1 className='text-lg font-[500]'>{paper.title}</h1>
          <p className='text-[#727272] text-xs font-[500]'>{paper.authors}</p>
          {paper.publication && (
            <p className='text-md font-[500]'>{paper.publication}</p>
          )}
          <div className='flex justify-end items-center w-full gap-3 font-[500] text-xs mt-auto'>
            {huggingfaceDownloads !== undefined &&
              paper.huggingfaceModel[0] && (
                <a
                  href={`https://huggingface.co/${paper.huggingfaceModel[0]}`}
                  target='_blank'
                  className='flex items-center gap-1'
                >
                  <Download size={12} />
                  {huggingfaceDownloads}
                </a>
              )}
            {githubStars !== undefined && paper.codeLink && (
              <a
                href={paper.codeLink}
                target='_blank'
                className='flex items-center gap-1'
              >
                <Star size={12} />
                {githubStars}
              </a>
            )}
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
            {/*{paper.dataLink && (*/}
            {/*  <a href={paper.dataLink} target='_blank'>*/}
            {/*    data*/}
            {/*  </a>*/}
            {/*)}*/}
            {paper.blogLink && (
              <a href={paper.blogLink} target='_blank'>
                page
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

const getGitHubStars = async (url: string) => {
  const regex = /https:\/\/github\.com\/([^\/]+)\/([^\/]+)/;
  const match = url.match(regex);
  try {
    const response = await fetch(
      `https://api.github.com/repos/${match[1]}/${match[2]}`
    );
    const data = await response.json();
    if (data.stargazers_count !== undefined) {
      return data.stargazers_count;
    } else {
      return undefined;
    }
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

const getHuggingFaceDownloads = async (modelIds: string[]) => {
  let total = 0;
  for (const modelId of modelIds) {
    const apiUrl = `https://huggingface.co/api/models/${modelId}?expand[]=downloadsAllTime`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data?.downloadsAllTime) {
        total += data.downloadsAllTime;
      }
    } catch (error) {
      console.error(error);
    }
  }

  return total;
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

export default Publications;
