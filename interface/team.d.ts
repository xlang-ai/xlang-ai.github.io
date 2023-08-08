export interface TeamMember {
  image?: string;
  name: string;
  title: string;
  link?: string;
}

export interface Collaborator {
  institution: string;
  members: string[];
}
