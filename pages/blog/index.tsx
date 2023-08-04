import React from 'react';

import { BlogPost, getAllPosts } from '@/utils/post';
import Image from 'next/image';
import { parseBlogPostDate, parseDate } from '@/utils/date';
import Link from 'next/link';

const Blog = ({ posts }: { posts: BlogPost[] }) => {
  return (
    <div className='pt-36 w-full bg-[#D9D9D9]/20'>
      <div className='page-x-width pb-10'>
        <h1 className='text-2xl font-[500] mb-4'>Blog</h1>
        <div className='flex flex-col gap-4'>
          {posts.map((post) => (
            <BlogBlock post={post} key={post.title} />
          ))}
        </div>
      </div>
    </div>
  );
};

const BlogBlock = ({ post }: { post: BlogPost }) => {
  return (
    <div className='w-full grid grid-cols-5 h-60 gap-4'>
      <div className='col-span-3 flex flex-col gap-6 justify-center border-b border-black/30'>
        <div className='text-xs text-[#666666] font-bold'>
          {parseBlogPostDate(post.date)}
        </div>
        <Link
          href={`blog/${post.slug}`}
          className='text-[#0156AC] text-lg font-[500] tracking-wide leading-5 my-0 hover:underline'
        >
          {post.title}
        </Link>
        <p className='text-sm tracking-wide leading-5 my-0 overflow-hidden h-36'>
          {post.previewContent}
        </p>
      </div>

      <Link
        href={`blog/${post.slug}`}
        className='col-span-2 relative w-full h-full rounded-lg overflow-hidden'
      >
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        ) : (
          <div className='bg-[#D9D9D9] w-full h-full' />
        )}
      </Link>
    </div>
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
