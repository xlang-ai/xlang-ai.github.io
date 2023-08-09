export interface TeamMember {
  image?: string;
  name: string;
  titles: string;
  link?: string;
}

// export interface Collaborator {
//   institution: string;
//   members: string[];
// }

export interface Alumni {
  name: string;
  institution: string;
  link?: string;
}

export interface Collaborator {
  name:string;
  institution: string;
  link?: string;
  category: string;
}