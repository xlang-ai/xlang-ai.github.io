import React from 'react';
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
          <div className='flex flex-col gap-8 mb-4'>
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
            className='tracking-wide leading-7 mb-24'
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
                return (
                  <a href={props.href} target="_blank" className='underline cursor-pointer hover:text-brand-primary2 text-justify'>
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
        src={coverImage}
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
