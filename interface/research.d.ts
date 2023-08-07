export type PaperCategory =
  | 'CodeGeneration'
  | 'ToolUse'
  | 'PoweredAgents'
  | 'EfficientLLMs'
  | 'InteractiveSystems'
  | 'Robotics';

export interface Paper {
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

export interface Talk {
  title: string;
  startDate: Date;
  endDate: Date;
  desc: string;
  link?: string;
}
