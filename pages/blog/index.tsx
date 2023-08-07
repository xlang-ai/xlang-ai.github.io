import React from 'react';
import Head from 'next/head';

import Image from 'next/image';
import Link from 'next/link';

import { getAllPosts } from '@/utils/post';
import { parseDateString } from '@/utils/date';

import { BlogPost } from '@/interface/blog';

const Blog = ({ posts }: { posts: BlogPost[] }) => {
  return (
    <>
      <Head>
        <title>XLanG | Blogs</title>
      </Head>
      <div className='max-sm:py-20 pt-36 w-full bg-[#D9D9D9]/20 min-h-[95vh]'>
        <div className='page-x-width pb-10'>
          <h1 className='text-2xl font-[500] mb-4'>Blog</h1>
          <div className='flex flex-col gap-4'>
            {posts.map((post) => (
              <BlogBlock post={post} key={post.title} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const BlogBlock = ({ post }: { post: BlogPost }) => {
  return (
    <div className='w-full grid grid-cols-5 gap-4'>
      <div className='max-sm:pb-4 col-span-5 sm:col-span-3 flex flex-col max-sm:gap-2 gap-6 justify-center border-b border-black/30'>
        <BlogBlockImage post={post} className='sm:hidden h-[300px]' />
        <BlogBlockDate date={post.date} className='max-sm:hidden' />
        <Link
          href={`blog/${post.slug}`}
          className='text-[#0156AC] text-lg font-[500] tracking-wide leading-5 my-0 hover:underline'
        >
          {post.title}
        </Link>
        <BlogBlockDate date={post.date} className='sm:hidden' />
        <p className='text-sm tracking-wide leading-5 my-0 overflow-hidden h-36'>
          {post.previewContent}
        </p>
      </div>
      <BlogBlockImage post={post} className='max-sm:hidden h-full' />
    </div>
  );
};

const BlogBlockDate = ({
  date,
  className,
}: {
  date: string;
  className?: string;
}) => (
  <div className={`text-xs text-[#666666] font-bold ${className}`}>
    {parseDateString(date)}
  </div>
);

const BlogBlockImage = ({
  post,
  className,
}: {
  post: BlogPost;
  className?: string;
}) => {
  return (
    <Link
      href={`blog/${post.slug}`}
      className={`col-span-2 relative w-full rounded-lg overflow-hidden ${className} `}
    >
      {post.coverImage ? (
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          style={{ objectFit: 'contain', objectPosition: 'center' }}
        />
      ) : (
        <div className='bg-[#D9D9D9] w-full h-full' />
      )}
    </Link>
  );
};

export async function getStaticProps() {
  const posts = getAllPosts();

  return {
    props: {
      posts,
    },
  };
}

export default Blog;
