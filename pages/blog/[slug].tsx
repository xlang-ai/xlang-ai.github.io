import React, { useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';

import { getAllPosts, getPostBySlug } from '@/utils/post';
import { parseDateString } from '@/utils/date';
import { publicFilePath } from '@/utils';

import { BlogPost as Post } from '@/interface/blog';
import rehypeRaw from 'rehype-raw';

const BlogPost = ({ post }: { post: Post }) => {
  if (post.layout === 'robocraft') {
    return <RoboCraftPost post={post} />;
  }

  const BlogUrl = `https://xlang.ai/blog/${post.slug}`;
  // const TwitterShareUrl = `http://www.twitter.com/share?url=${BlogUrl}&text=${post.title}`;
  const TwitterShareUrl = post.twitterLink || 'https://twitter.com/XLangNLP';
  const GithubShareUrl = post.githubLink || 'https://github.com/xlang-ai';
  return (
    <>
      <Head>
        <title>XLANG Lab | {post.title}</title>
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/favicon/black-on-white/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon/black-on-white/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon/black-on-white/favicon-16x16.png'
        />
        <link rel='manifest' href='/favicon/black-on-white/site.webmanifest' />
        <meta name="description" content={post.title} />  
        <meta property="og:title" content={post.title} />  
        <meta property="og:type" content="website" />  
        <meta property="og:image" content={post.onlineImage} />  
        <meta property="og:description" content={post.previewContent} />  
        <meta property="og:url" content={BlogUrl} />  
        <meta name="twitter:card" content="summary_large_image" />  
        <meta name="twitter:title" content={post.title} />  
        <meta name="twitter:description" content={post.previewContent} />  
        <meta name="twitter:image" content={post.onlineImage} />
      </Head>
      <div className='pt-36 w-full min-h-screen bg-[#D9D9D9]/20'>
        <div className='page-x-width'>
          <div className='flex flex-col gap-8 mb-8'>
            <div className='text-xs text-[#545454] font-[500] tracking-widest'>
              <Link href='/blog'>Blog</Link> / {post.shortTitle || post.title}
            </div>

            <div className='text-[#0156AC] font-[500] text-3xl text-justify'>
              {post.title}
            </div>
            {post.subTitle && <div className='text-[#0156AC] font-[500] text-2xl text-justify'>
              {post.subTitle}
            </div>}

            <div className='flex flex-wrap flex-col w-full'>
              <PostMeta date={post.date} author={post.author} twitterUrl={TwitterShareUrl} githubUrl={GithubShareUrl}/>
              <PostImage coverImage={post.coverImage} title={post.title} />
              {post.title == 'Introducing Lemur: The State-of-the-art Open Pretrained Large Language Models Balancing Text and Code Capabilities' && <div className='flex items-center justify-center mt-2'>
                <div className='max-sm:text-sm border border-brand-primary2 border-2 text-brand-primary2 font-[500] rounded-xl py-1 px-3 cursor-pointer w-52 text-center'>
                  <a href="https://huggingface.co/OpenLemur" target="_blank" rel="noopener noreferrer">
                    Download the Models
                  </a>
                </div>
              </div>}
            </div>
          </div>

          <ReactMarkdown
            className='tracking-wide leading-7 mb-24 mt-6'
            rehypePlugins={[rehypeRaw]} linkTarget="_blank"
            components={{
              h2(props) {
                return (
                  <h2 className='text-xl font-[600] my-6 text-justify'>{props.children}</h2>
                );
              },
              h3(props) {
                return (
                  <h3 className='text-lg font-[600] my-6 text-justify'>{props.children}</h3>
                );
              },
              p(props) {
                return (
                  <p className='mb-4 text-sm leading-7 text-justify'>{props.children}</p>
                );
              },
              ul(props) {
                return <ul className='list-disc pl-4 text-sm leading-7 text-justify'>{props.children}</ul>;
              },
              a(props) {
                // Check if the link is a reference citation (matches #ref pattern)
                const isRefCitation = props.href && props.href.match(/^#ref\d+$/);
                
                if (isRefCitation) {
                  // Render reference citations as plain text without links
                  return (
                    <span className='text-sm font-medium text-blue-600 bg-blue-50 px-1 py-0.5 rounded'>
                      {props.children}
                    </span>
                  );
                }
                
                // Handle all other links normally
                return (
                  <a 
                    href={props.href} 
                    target="_blank" 
                    className='underline cursor-pointer hover:text-brand-primary2 text-justify'
                  >
                    {props.children}
                  </a>
                );
              },
              iframe(props) {
                return (
                  <iframe
                    {...props}
                    className="w-full aspect-video"
                  />
                );
              },
              hr(props) {
                return <hr className='my-6' />;
              },
              code(props) {
                // Handle inline code
                if (!props.className) {
                  return (
                    <code className='bg-gray-100 text-red-600 px-1 py-0.5 rounded text-sm font-mono'>
                      {props.children}
                    </code>
                  );
                }
                // Handle code blocks
                return (
                  <code className='block bg-gray-100 p-4 rounded-lg text-sm font-mono whitespace-pre-wrap overflow-x-auto leading-relaxed'>
                    {props.children}
                  </code>
                );
              },
              pre(props) {
                return (
                  <pre className='bg-gray-100 p-4 rounded-lg text-sm font-mono whitespace-pre-wrap overflow-x-auto my-4 leading-relaxed'>
                    {props.children}
                  </pre>
                );
              }
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </div>
    </>
  );
};

type Reference = {
  id: string;
  number: string;
  text: string;
};

type ParsedRobocraftContent = {
  preStageContent: string;
  postStageContent: string;
  citationContent: string;
  references: Reference[];
  stages: RoboCraftStage[];
};

type RoboCraftStage = {
  id: string;
  shortTitle: string;
  title: string;
  content: string;
  kicker: string;
  mediaKind: 'scene' | 'taskPlaceholder' | 'rewardPlaceholder' | 'trajectoryVideo' | 'none';
};

const ROBOCRAFT_STAGE_DEFS = [
  {
    prefix: 'Scene Generation',
    shortTitle: 'Scene Gen',
    kicker: 'Diverse worlds',
    mediaKind: 'scene' as const,
  },
  {
    prefix: 'Task Generation',
    shortTitle: 'Task Gen',
    kicker: 'Scene-conditioned goals',
    mediaKind: 'taskPlaceholder' as const,
  },
  {
    prefix: 'Reward Code Generation',
    shortTitle: 'Reward Gen',
    kicker: 'Language into checks',
    mediaKind: 'rewardPlaceholder' as const,
  },
  {
    prefix: 'Motion-Planning Code Generation',
    shortTitle: 'Motion Code',
    kicker: 'Agentic robot programs',
    mediaKind: 'none' as const,
  },
  {
    prefix: 'Trajectory Generation',
    shortTitle: 'Traj Gen',
    kicker: 'Verified VLA rollouts',
    mediaKind: 'trajectoryVideo' as const,
  },
];

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const getMarkdownText = (children: React.ReactNode): string => {
  if (typeof children === 'string' || typeof children === 'number') {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map(getMarkdownText).join('');
  }

  if (React.isValidElement(children)) {
    return getMarkdownText(children.props.children);
  }

  return '';
};

const parseReferences = (content: string): Reference[] => {
  const referenceStart = content.search(/^## References/m);
  if (referenceStart < 0) return [];

  const citationStart = content.search(/^## Citation/m);
  const referenceBlock = content.slice(
    referenceStart,
    citationStart > referenceStart ? citationStart : undefined
  );

  return referenceBlock
    .split('\n')
    .map((line) => line.trim())
    .map((line) =>
      line.match(/(?:<a id=["']ref(\d+)["']><\/a>)?\s*\\?\[(\d+)\\?\]\s*(.+)/)
    )
    .filter((match): match is RegExpMatchArray => Boolean(match))
    .map((match) => {
      const number = match[1] || match[2];
      return {
        id: `ref${number}`,
        number,
        text: match[3].replace(/\\\./g, '.').trim(),
      };
    });
};

const parseRobocraftContent = (content: string): ParsedRobocraftContent => {
  const referenceStart = content.search(/^## References/m);
  const citationStart = content.search(/^## Citation/m);
  const bodyEnd =
    referenceStart >= 0 ? referenceStart : citationStart >= 0 ? citationStart : content.length;
  const body = content.slice(0, bodyEnd).trim();
  const citationContent = citationStart >= 0 ? content.slice(citationStart).trim() : '';
  const references = parseReferences(content);

  const headings = Array.from(body.matchAll(/^## (.+)$/gm)).map((match, index, matches) => ({
    title: match[1].trim(),
    start: match.index || 0,
    bodyStart: (match.index || 0) + match[0].length,
    end: 0,
  }));

  headings.forEach((heading, index) => {
    heading.end = headings[index + 1]?.start ?? body.length;
  });

  const stageHeadings = headings
    .map((heading) => {
      const def = ROBOCRAFT_STAGE_DEFS.find((stage) => heading.title.startsWith(stage.prefix));
      return def ? { ...heading, def } : null;
    })
    .filter((heading): heading is NonNullable<typeof heading> => Boolean(heading));

  if (!stageHeadings.length) {
    return {
      preStageContent: body,
      postStageContent: '',
      citationContent,
      references,
      stages: [],
    };
  }

  const stages = stageHeadings.map(({ title, bodyStart, end, def }) => ({
    id: slugify(def.shortTitle),
    shortTitle: def.shortTitle,
    title,
    content: body.slice(bodyStart, end).trim(),
    kicker: def.kicker,
    mediaKind: def.mediaKind,
  }));

  return {
    preStageContent: body.slice(0, stageHeadings[0].start).trim(),
    postStageContent: body.slice(stageHeadings[stageHeadings.length - 1].end).trim(),
    citationContent,
    references,
    stages,
  };
};

const getContentHeadings = (content: string) =>
  Array.from(content.matchAll(/^## (.+)$/gm)).map((match) => {
    const title = match[1].trim();
    return {
      id: slugify(title),
      label: title.replace(/\s+—\s+.+$/, ''),
    };
  });

const RoboCraftPost = ({ post }: { post: Post }) => {
  const parsed = useMemo(() => parseRobocraftContent(post.content), [post.content]);
  const [activeStage, setActiveStage] = useState(0);
  const [activeCitation, setActiveCitation] = useState<string>();
  const [activeSection, setActiveSection] = useState('overview');

  const BlogUrl = `https://xlang.ai/blog/${post.slug}`;
  const TwitterShareUrl = post.twitterLink || 'https://twitter.com/XLangNLP';
  const GithubShareUrl = post.githubLink || 'https://github.com/xlang-ai';

  const toc = useMemo(
    () => [
      { id: 'overview', label: 'Overview' },
      ...getContentHeadings(parsed.preStageContent),
      { id: 'pipeline-module', label: 'Pipeline Explorer' },
      ...getContentHeadings(parsed.postStageContent),
      ...(parsed.citationContent ? [{ id: 'citation', label: 'Citation' }] : []),
    ],
    [parsed.citationContent, parsed.postStageContent, parsed.preStageContent]
  );

  useEffect(() => {
    const ids = toc.map((item) => item.id);
    const onScroll = () => {
      const current = ids
        .map((id) => ({ id, top: document.getElementById(id)?.getBoundingClientRect().top ?? 9999 }))
        .filter((item) => item.top < 180)
        .pop();
      if (current) setActiveSection(current.id);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [toc]);

  return (
    <>
      <BlogHead post={post} blogUrl={BlogUrl} />
      <div className='min-h-screen bg-[#f7f8fb] pt-28 text-[#0b1b2b]'>
        <div className='mx-auto grid w-full max-w-[1500px] grid-cols-1 gap-8 px-4 pb-24 xl:grid-cols-[220px_minmax(0,820px)_320px] 2xl:px-8'>
          <aside className='hidden xl:block'>
            <div className='sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto border-l border-[#0156AC]/20 pl-5'>
              <Link href='/blog' className='mb-8 block text-xs font-semibold uppercase tracking-[0.3em] text-[#0156AC]'>
                Blog
              </Link>
              <div className='mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400'>
                Contents
              </div>
              <nav className='flex flex-col gap-3'>
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`text-sm leading-5 transition-colors ${
                      activeSection === item.id
                        ? 'font-semibold text-[#0156AC]'
                        : 'text-slate-500 hover:text-[#0156AC]'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <main>
            <section id='overview' className='mb-10 scroll-mt-28 border-b border-[#0156AC]/10 pb-10'>
              <div className='mb-5 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#0156AC]'>
                <span>RoboCraft-preview</span>
                <span>/</span>
                <span>{parseDateString(post.date)}</span>
              </div>
              <h1 className='max-w-4xl text-2xl font-semibold leading-snug tracking-[-0.02em] text-[#031425] sm:text-4xl'>
                {post.title}
              </h1>
              <p className='mt-6 max-w-3xl border-l-4 border-[#0156AC] bg-[#edf4ff] px-5 py-4 text-base font-medium leading-8 text-[#174B81]'>
                TL;DR: {post.previewContent}
              </p>
            </section>

            <div className='mb-8 rounded-2xl border border-[#0156AC]/10 bg-white p-5 xl:hidden'>
              <div className='mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-400'>
                Contents
              </div>
              <div className='flex flex-wrap gap-2'>
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className='rounded-full border border-[#0156AC]/15 px-3 py-1 text-xs font-semibold text-[#0156AC]'
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div className='rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-10'>
              <PostMeta date={post.date} author={post.author} twitterUrl={TwitterShareUrl} githubUrl={GithubShareUrl} />
              <RoboCraftMarkdown
                content={parsed.preStageContent}
                activeCitation={activeCitation}
                setActiveCitation={setActiveCitation}
              />
              <PipelineShowcase />
              <StageExplorer
                stages={parsed.stages}
                activeStage={activeStage}
                setActiveStage={setActiveStage}
                activeCitation={activeCitation}
                setActiveCitation={setActiveCitation}
              />
              <RoboCraftMarkdown
                content={parsed.postStageContent}
                activeCitation={activeCitation}
                setActiveCitation={setActiveCitation}
              />
              {parsed.citationContent && (
                <section id='citation' className='mt-12 rounded-2xl border border-[#0156AC]/10 bg-[#f6f9ff] p-5'>
                  <RoboCraftMarkdown
                    content={parsed.citationContent}
                    activeCitation={activeCitation}
                    setActiveCitation={setActiveCitation}
                  />
                </section>
              )}
            </div>

            <section className='mt-8 rounded-2xl border border-slate-200 bg-white p-6 xl:hidden'>
              <h2 className='mb-4 text-lg font-semibold text-[#0156AC]'>References</h2>
              <ReferencesList references={parsed.references} activeCitation={activeCitation} idSuffix='-mobile' />
            </section>
          </main>

          <aside className='hidden xl:block'>
            <div className='sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm backdrop-blur'>
              <div className='mb-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400'>
                References
              </div>
              <ReferencesList references={parsed.references} activeCitation={activeCitation} />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

const BlogHead = ({ post, blogUrl }: { post: Post; blogUrl: string }) => (
  <Head>
    <title>XLANG Lab | {post.title}</title>
    <link
      rel='apple-touch-icon'
      sizes='180x180'
      href='/favicon/black-on-white/apple-touch-icon.png'
    />
    <link
      rel='icon'
      type='image/png'
      sizes='32x32'
      href='/favicon/black-on-white/favicon-32x32.png'
    />
    <link
      rel='icon'
      type='image/png'
      sizes='16x16'
      href='/favicon/black-on-white/favicon-16x16.png'
    />
    <link rel='manifest' href='/favicon/black-on-white/site.webmanifest' />
    <meta name="description" content={post.previewContent || post.title} />
    <meta property="og:title" content={post.title} />
    <meta property="og:type" content="website" />
    <meta property="og:image" content={post.onlineImage} />
    <meta property="og:description" content={post.previewContent} />
    <meta property="og:url" content={blogUrl} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={post.title} />
    <meta name="twitter:description" content={post.previewContent} />
    <meta name="twitter:image" content={post.onlineImage} />
  </Head>
);

const PipelineShowcase = () => (
  <section className='my-12 space-y-8'>
    <figure className='overflow-hidden rounded-[1.5rem] border border-[#0156AC]/10 bg-white shadow-sm'>
      <div className='relative aspect-video w-full bg-[#edf4ff]'>
        <Image
          src={publicFilePath('/blog/xgen/xgen_main.png')}
          alt='RoboCraft-preview pipeline overview'
          fill
          style={{ objectFit: 'contain', objectPosition: 'center' }}
        />
      </div>
      <figcaption className='border-t border-slate-100 px-5 py-4 text-sm leading-6 text-slate-500'>
        Figure 1. Overview of the RoboCraft-preview data generation pipeline. This placeholder figure uses the current XGen main image and can be replaced when the final pipeline diagram is ready.
      </figcaption>
    </figure>

    <figure className='overflow-hidden rounded-[1.5rem] border border-[#0156AC]/10 bg-[#031425] shadow-sm'>
      <video
        className='w-full'
        src={publicFilePath('/blog/xgen/demo.mp4')}
        controls
        muted
        loop
        playsInline
      />
      <figcaption className='border-t border-white/10 bg-white px-5 py-4 text-sm leading-6 text-slate-500'>
        Demo video. Nine generated task trajectories from RoboCraft-preview.
      </figcaption>
    </figure>
  </section>
);

const RoboCraftMarkdown = ({
  content,
  activeCitation,
  setActiveCitation,
}: {
  content: string;
  activeCitation?: string;
  setActiveCitation: (id: string) => void;
}) => (
  <ReactMarkdown
    className='robocraft-markdown tracking-wide'
    rehypePlugins={[rehypeRaw]}
    linkTarget="_blank"
    components={{
      h2(props) {
        const text = getMarkdownText(props.children);
        return (
          <h2 id={slugify(text)} className='scroll-mt-28 pt-8 text-3xl font-semibold leading-tight tracking-[-0.03em] text-[#031425]'>
            {props.children}
          </h2>
        );
      },
      h3(props) {
        return (
          <h3 className='mt-8 text-xl font-semibold leading-snug text-[#031425]'>{props.children}</h3>
        );
      },
      p(props) {
        return <p className='mt-5 text-[15px] leading-8 text-slate-700'>{props.children}</p>;
      },
      ul(props) {
        return <ul className='mt-4 list-disc space-y-2 pl-5 text-[15px] leading-8 text-slate-700'>{props.children}</ul>;
      },
      ol(props) {
        return <ol className='mt-4 list-decimal space-y-2 pl-5 text-[15px] leading-8 text-slate-700'>{props.children}</ol>;
      },
      li(props) {
        return <li className='pl-1'>{props.children}</li>;
      },
      strong(props) {
        return <strong className='font-semibold text-[#031425]'>{props.children}</strong>;
      },
      a(props) {
        const isRefCitation = props.href && props.href.match(/^#ref\d+$/);

        if (isRefCitation && props.href) {
          const citationId = props.href.replace('#', '');
          return (
            <a
              href={props.href}
              onClick={(event) => {
                event.preventDefault();
                setActiveCitation(citationId);
                const targetId =
                  window.innerWidth >= 1280 ? citationId : `${citationId}-mobile`;
                document.getElementById(targetId)?.scrollIntoView({
                  block: 'nearest',
                  behavior: 'smooth',
                });
              }}
              className={`mx-0.5 align-super text-[11px] font-semibold no-underline transition-colors ${
                activeCitation === citationId
                  ? 'text-[#6C4AAF]'
                  : 'text-[#0156AC] hover:text-[#6C4AAF]'
              }`}
            >
              {props.children}
            </a>
          );
        }

        return (
          <a
            href={props.href}
            target="_blank"
            className='font-medium text-[#0156AC] underline decoration-[#0156AC]/30 underline-offset-4 hover:text-[#6C4AAF]'
          >
            {props.children}
          </a>
        );
      },
      code(props) {
        if (!props.className) {
          return (
            <code className='rounded bg-[#edf4ff] px-1.5 py-0.5 font-mono text-[13px] text-[#0156AC]'>
              {props.children}
            </code>
          );
        }

        return (
          <code className='block whitespace-pre-wrap rounded-2xl bg-[#07182a] p-5 font-mono text-[13px] leading-7 text-[#d9f2ff]'>
            {props.children}
          </code>
        );
      },
      pre(props) {
        return <pre className='my-6 overflow-x-auto rounded-2xl bg-[#07182a]'>{props.children}</pre>;
      },
    }}
  >
    {content}
  </ReactMarkdown>
);

const StageExplorer = ({
  stages,
  activeStage,
  setActiveStage,
  activeCitation,
  setActiveCitation,
}: {
  stages: RoboCraftStage[];
  activeStage: number;
  setActiveStage: (stage: number) => void;
  activeCitation?: string;
  setActiveCitation: (id: string) => void;
}) => {
  if (!stages.length) return null;

  const stage = stages[activeStage];
  const go = (direction: -1 | 1) => {
    setActiveStage((activeStage + direction + stages.length) % stages.length);
  };

  return (
    <section id='pipeline-module' className='my-14 scroll-mt-28 overflow-hidden rounded-[2rem] border border-[#0156AC]/15 bg-gradient-to-br from-[#f7fbff] via-white to-[#f8f5ff] p-5 shadow-[0_24px_80px_rgba(1,86,172,0.08)] sm:p-7'>
      <div className='mb-6 flex items-center justify-between gap-4'>
        <div>
          <div className='text-xs font-semibold uppercase tracking-[0.28em] text-[#0156AC]'>
            Pipeline Explorer
          </div>
          <h2 className='mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#031425]'>
            From Scene Gen to Traj Gen
          </h2>
        </div>
        <div className='flex gap-2'>
          <button
            type='button'
            onClick={() => go(-1)}
            className='h-10 w-10 rounded-full border border-[#0156AC]/20 bg-white text-xl text-[#0156AC] shadow-sm transition hover:-translate-x-0.5 hover:border-[#0156AC]'
            aria-label='Previous pipeline stage'
          >
            ‹
          </button>
          <button
            type='button'
            onClick={() => go(1)}
            className='h-10 w-10 rounded-full border border-[#0156AC]/20 bg-white text-xl text-[#0156AC] shadow-sm transition hover:translate-x-0.5 hover:border-[#0156AC]'
            aria-label='Next pipeline stage'
          >
            ›
          </button>
        </div>
      </div>

      <div className='mb-8 grid grid-cols-2 gap-2 md:grid-cols-5'>
        {stages.map((item, index) => (
          <button
            key={item.id}
            type='button'
            onClick={() => setActiveStage(index)}
            className={`rounded-2xl border px-3 py-3 text-left transition ${
              index === activeStage
                ? 'border-[#0156AC] bg-[#0156AC] text-white shadow-lg shadow-[#0156AC]/20'
                : 'border-slate-200 bg-white text-slate-500 hover:border-[#0156AC]/40 hover:text-[#0156AC]'
            }`}
          >
            <div className='text-[11px] font-semibold uppercase tracking-[0.2em] opacity-75'>
              0{index + 1}
            </div>
            <div className='mt-1 text-sm font-semibold'>{item.shortTitle}</div>
          </button>
        ))}
      </div>

      <div>
        <div className='mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#6C4AAF]'>
          {stage.kicker}
        </div>
        <h3 className='text-2xl font-semibold leading-tight tracking-[-0.03em] text-[#031425]'>
          {stage.title}
        </h3>
        <RoboCraftMarkdown
          content={stage.content}
          activeCitation={activeCitation}
          setActiveCitation={setActiveCitation}
        />
        {stage.mediaKind !== 'none' && (
          <div className='mt-8'>
            <StageMedia stage={stage} />
          </div>
        )}
      </div>
    </section>
  );
};

const StageMedia = ({ stage }: { stage: RoboCraftStage }) => {
  if (stage.mediaKind === 'none') {
    return null;
  }

  if (stage.mediaKind === 'scene') {
    return (
      <figure className='overflow-hidden rounded-[1.5rem] border border-[#0156AC]/10 bg-white'>
        <div className='relative aspect-[16/9] w-full bg-[#ebe7e2]'>
          <Image
            src={publicFilePath('/blog/xgen/scene.png')}
            alt='Generated RoboCraft simulation scenes'
            fill
            style={{ objectFit: 'contain', objectPosition: 'center' }}
          />
        </div>
        <figcaption className='border-t border-slate-100 px-5 py-4 text-sm leading-6 text-slate-500'>
          Generated tabletop scenes from RoboCraft scene generation.
        </figcaption>
      </figure>
    );
  }

  if (stage.mediaKind === 'trajectoryVideo') {
    return (
      <figure className='overflow-hidden rounded-[1.5rem] border border-[#0156AC]/10 bg-[#031425]'>
        <video
          className='w-full'
          src={publicFilePath('/blog/xgen/traj_gen_demo_grid.mp4')}
          controls
          muted
          loop
          playsInline
        />
        <figcaption className='border-t border-white/10 bg-white px-5 py-4 text-sm leading-6 text-slate-500'>
          3x3 trajectory-generation demo for the same task under different augmentations, including background, table texture, object initial pose, lighting, camera pose, robot initial pose, and instruction variation.
        </figcaption>
      </figure>
    );
  }

  const placeholderCopy =
    stage.mediaKind === 'taskPlaceholder'
      ? {
          label: 'Task generation figure',
          text: 'Reserved for an image showing scene-conditioned instruction generation, object segmentation, or scene graph prompting.',
        }
      : stage.mediaKind === 'rewardPlaceholder'
        ? {
            label: 'Reward generation figure',
            text: 'Reserved for a diagram showing how language goals become executable reward code.',
          }
        : {
            label: 'Media slot',
            text: 'Reserved for a stage figure or video.',
          };

  return (
    <div className='flex min-h-[260px] flex-col justify-between rounded-[1.5rem] border border-dashed border-[#0156AC]/30 bg-white p-5'>
      <div>
        <div className='text-[10px] font-semibold uppercase tracking-[0.25em] text-[#0156AC]'>
          {placeholderCopy.label}
        </div>
        <p className='mt-4 text-sm leading-7 text-slate-600'>
          {placeholderCopy.text}
        </p>
      </div>
      <div className='rounded-2xl bg-[#edf4ff] p-4 text-sm font-semibold text-[#0156AC]'>
        {stage.shortTitle}
      </div>
    </div>
  );
};

const ReferencesList = ({
  references,
  activeCitation,
  idSuffix = '',
}: {
  references: Reference[];
  activeCitation?: string;
  idSuffix?: string;
}) => (
  <div className='flex flex-col gap-3'>
    {references.map((reference) => (
      <div
        key={reference.id}
        id={`${reference.id}${idSuffix}`}
        className={`scroll-mt-28 rounded-xl border p-3 transition-colors ${
          activeCitation === reference.id
            ? 'border-[#6C4AAF]/40 bg-[#f8f5ff]'
            : 'border-transparent bg-slate-50'
        }`}
      >
        <div className='mb-1 text-xs font-semibold text-[#0156AC]'>[{reference.number}]</div>
        <div className='text-xs leading-5 text-slate-600'>{reference.text}</div>
      </div>
    ))}
  </div>
);

const PostImage = ({
  coverImage,
  title,
}: {
  coverImage?: string;
  title: string;
}) => (
  <div className='relative w-full aspect-video rounded-lg'>
    {coverImage ? (
      <Image
        src={publicFilePath(coverImage)}
        alt={title}
        fill
        style={{ objectFit: 'contain', objectPosition: 'center top' }}
      />
    ) : (
      <div className='bg-[#D9D9D9] w-full h-full' />
    )}
  </div>
);

const PostMeta = ({ date, author, twitterUrl, githubUrl }: { date: string; author: string; twitterUrl: string, githubUrl: string }) => (
  <div className='relative w-full font-[600] text-xs flex flex-wrap grid grid-cols-3 mb-4'>
    <div className='flex flex-col justify-center items-center'>
      <div className='text-[#666666] mb-2'>Author</div>
      <div>{author}</div>
    </div>

    <div className='flex flex-col justify-center items-center'>
      <div className='text-[#666666] mb-2'>Date</div>
      <div>{parseDateString(date)}</div>
    </div>

    <div className='flex flex-col justify-center items-center'>
      <div className='text-[#666666] mb-2'>Share</div>
      <PostShare twitterUrl={twitterUrl} githubUrl={githubUrl}/>
    </div>
  </div>
);

const PostShare = ({ twitterUrl, githubUrl }: { twitterUrl: string, githubUrl: string }) => (
  <ul className='flex gap-4'>
    <li className='cursor-pointer'>
      <Link href='https://join.slack.com/t/xlanggroup/shared_invite/zt-20zb8hxas-eKSGJrbzHiPmrADCDX3_rQ'>
        <Image
          src={publicFilePath('/icons/slack-black.svg')}
          alt='Xlang'
          width={20}
          height={20}
          className='rounded-md'
        />
      </Link>
    </li>
    <li className='cursor-pointer'>
      <Link href={githubUrl}>
        <Image
          src={publicFilePath('/icons/github-black.svg')}
          alt='Xlang'
          width={20}
          height={20}
          className='rounded-md'
        />
      </Link>
    </li>
    <li className='cursor-pointer'>
      <Link href={twitterUrl}>
        <Image
          src={publicFilePath('/icons/twitter-black.svg')}
          alt='Xlang'
          width={20}
          height={20}
          className='rounded-md'
        />
      </Link>
    </li>
  </ul>
);

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug);

  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts();

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}

export default BlogPost;
