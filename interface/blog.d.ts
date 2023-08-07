export interface BlogPost {
  title: string;
  slug: string;
  shortTitle?: string;
  date: string;
  author: string;
  coverImage?: string;
  content: string;
  previewContent: string;
}
