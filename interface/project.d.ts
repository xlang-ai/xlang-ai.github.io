export interface Project {
  title: string;
  desc: string;
  image?: string;
  link?: string;
}

export interface HighlightProject {
  title: string;
  desc: string;
  image: string;
  link: string;
}

export interface HighlightSubProject {
  icon: string;
  title: string;
  desc: string;
  shortDesc: string;
  image?: string;
  slidesLink?: string;
  productLink?: string;
  videoLink?: string;
  useCaseLink?: string;
}
