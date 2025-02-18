// adapted from https://github.com/vercel/next.js/blob/canary/examples/blog-starter/lib/api.ts

import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { BlogPost } from '@/interface/blog';

const postsDirectory = join(process.cwd(), 'data/blog_posts');

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    content,
    ...data,
  } as BlogPost;
}

export function getAllPosts() {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((post1, post2) => new Date(post2.date).getTime() - new Date(post1.date).getTime());
  return posts;
}
