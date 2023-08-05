import React from 'react';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import Link from 'next/link';

import { BlogPost, getAllPosts, getPostBySlug } from '@/utils/post';
import { parseBlogPostDate } from '@/utils/date';
import { publicFilePath } from '@/utils';

const BlogPost = ({ post }: { post: BlogPost }) => {
  return (
    <div className='pt-36 w-full min-h-screen bg-[#D9D9D9]/20'>
      <div className='page-x-width'>
        <div className='flex flex-col gap-8 mb-4'>
          <div className='text-xs text-[#545454] font-[500] tracking-widest'>
            <Link href='/blog'>Blog</Link> / {post.shortTitle || post.title}
          </div>

          <div className='text-[#0156AC] font-[500] text-2xl'>{post.title}</div>

          <div className='flex flex-wrap w-full max-sm:gap-2 gap-8'>
            <PostImage coverImage={post.coverImage} title={post.title} />
            <PostMeta date={post.date} author={post.author} />
          </div>
        </div>

        <ReactMarkdown
          className='tracking-wide leading-7 mb-24'
          components={{
            h2(props) {
              return (
                <h2 className='text-xl font-[600] my-6'>{props.children}</h2>
              );
            },
            p(props) {
              return <p className='mb-4 text-sm leading-7'>{props.children}</p>;
            },
            ul(props) {
              return <ul className='list-disc pl-4'>{props.children}</ul>;
            },
            a(props) {
              return (
                <a className='underline cursor-pointer hover:text-brand-primary2'>
                  {props.children}
                </a>
              );
            },
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

const PostImage = ({
  coverImage,
  title,
}: {
  coverImage?: string;
  title: string;
}) => (
  <div className='relative max-sm:w-full max-sm:h-[300px] h-[400px] w-[60%] min-w-[300px] rounded-lg overflow-hidden'>
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

const PostMeta = ({ date, author }: { date: string; author: string }) => (
  <div className='font-[600] text-xs flex flex-col max-sm:gap-4 gap-12 mt-4'>
    <div>
      <div className='text-[#666666] mb-2'>Share</div>
      <PostShare />
    </div>

    <div>
      <div className='text-[#666666] mb-2'>Date</div>
      <div>{parseBlogPostDate(date)}</div>
    </div>

    <div>
      <div className='text-[#666666] mb-2'>Author</div>
      <div>{author}</div>
    </div>
  </div>
);

const PostShare = () => (
  <ul className='flex gap-4'>
    <li className='cursor-pointer'>
      <Link href='https://github.com/xlang-ai'>
        <Image
          src={publicFilePath('/slack-black.svg')}
          alt='Xlang'
          width={20}
          height={20}
          className='rounded-md'
        />
      </Link>
    </li>
    <li className='cursor-pointer'>
      <Link href='https://github.com/xlang-ai'>
        <Image
          src={publicFilePath('/discord-black.svg')}
          alt='Xlang'
          width={20}
          height={20}
          className='rounded-md'
        />
      </Link>
    </li>
    <li className='cursor-pointer'>
      <Link href='https://github.com/xlang-ai'>
        <Image
          src={publicFilePath('/github-black.svg')}
          alt='Xlang'
          width={20}
          height={20}
          className='rounded-md'
        />
      </Link>
    </li>
    <li className='cursor-pointer'>
      <Link href='https://github.com/xlang-ai'>
        <Image
          src={publicFilePath('/twitter-black.svg')}
          alt='Xlang'
          width={20}
          height={20}
          className='rounded-md'
        />
      </Link>
    </li>
    <li className='cursor-pointer'>
      <Link href='https://github.com/xlang-ai'>
        <Image
          src={publicFilePath('/threads-black.svg')}
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
