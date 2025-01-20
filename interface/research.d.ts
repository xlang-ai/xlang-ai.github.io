import { list } from 'postcss';

export type PaperCategory =
  // | 'CodeGeneration'
  | 'CodeGeneration'
  | 'DigitalAIAgents'
  | 'PhysicalAIAgents'
  | 'Others';

export interface Paper {
  image?: string;
  category?: Array<PaperCategory>;
  title: string;
  authors: string;
  publication?: string;
  paperLink?: string;
  codeLink?: string;
  dataLink?: string;
  blogLink?: string;
  twitterLink?: string;
  huggingfaceModel?: string[];
}

export interface Talk {
  title: string;
  startDate: Date;
  endDate: Date;
  desc: string;
  link?: string;
}
