import Papa from 'papaparse';
import { join } from 'path';
import fs from 'fs';

import { News } from '@/interface/news';
import { Alumni, Collaborator, TeamMember } from '@/interface/team';
import { Paper, Talk } from '@/interface/research';
import {
  HighlightProject,
  HighlightSubProject,
  Project,
} from '@/interface/project';

const DATA_DIR = join(process.cwd(), '/data');
const TEAM_DIR = join(DATA_DIR, '/team');
const RESEARCH_DIR = join(DATA_DIR, '/research');
const NEWS_DIR = join(DATA_DIR, '/news');
const PROJECTS_DIR = join(DATA_DIR, '/projects');

export const getFacultyMembers = (): TeamMember[] => {
  const fileContents = fs.readFileSync(
    join(TEAM_DIR, '/faculty_members.csv'),
    'utf8'
  );
  return Papa.parse(fileContents, { header: true }).data as TeamMember[];
};

export const getGraduates = (): TeamMember[] => {
  const fileContents = fs.readFileSync(
    join(TEAM_DIR, 'graduates.csv'),
    'utf8'
  );
  return Papa.parse(fileContents, { header: true }).data as TeamMember[];
};

export const getUndergraduates = (): TeamMember[] => {
  const fileContents = fs.readFileSync(
    join(TEAM_DIR, 'undergraduates.csv'),
    'utf8'
  );
  return Papa.parse(fileContents, { header: true }).data as TeamMember[];
};

export const getAlumni = (): Alumni[] => {
  const fileContents = fs.readFileSync(
    join(TEAM_DIR, 'alumni.csv'),
    'utf8'
  );
  return Papa.parse(fileContents, { header: true }).data as Alumni[];
};

export const getCollaborators = (): Collaborator[] => {
  const fileContents = fs.readFileSync(
    join(TEAM_DIR, 'collaborators.csv'),
    'utf8'
  );
  return Papa.parse(fileContents, { header: true }).data as Collaborator[];
  // const collaborators: { [key: string]: string[] } = {};

  // Papa.parse(fileContents, {
  //   header: true,
  //   complete: (results) => {
  //     results.data.forEach((row: { name: string; institution: string }) => {
  //       const { name, institution } = row;
  //       if (!collaborators[institution]) {
  //         collaborators[institution] = [];
  //       }
  //       collaborators[institution].push(name);
  //     });
  //   },
  // });

  // const order: string[] = [
  //   'Salesforce Research',
  //   'Google Research',
  //   'Amazon AWS',
  //   'DB',
  //   'HCI/VIS',
  //   'Other',
  // ];

  // return order.map((institution) => ({
  //   institution,
  //   members: collaborators[institution] || [],
  // }));
};

export const getPapers = (): Paper[] => {
  const fileContents = fs.readFileSync(
    join(RESEARCH_DIR, 'papers.json'),
    'utf8'
  );
  const papers: Paper[] = JSON.parse(fileContents);
  return papers;
};

export const getTalks = (): Talk[] => {
  const fileContents = fs.readFileSync(
    join(RESEARCH_DIR, 'talks.json'),
    'utf8'
  );
  const talks: Talk[] = JSON.parse(fileContents);
  return talks;
};

export const getNews = (): News[] => {
  const fileContents = fs.readFileSync(join(NEWS_DIR, 'news.json'), 'utf8');
  const news: News[] = JSON.parse(fileContents);
  return news;
};

export const getRecentProjects = (): Project[] => {
  const fileContents = fs.readFileSync(
    join(PROJECTS_DIR, 'recent_projects.json'),
    'utf8'
  );
  const projects: Project[] = JSON.parse(fileContents);
  return projects;
};

export const getHighlightProject = (): HighlightProject => {
  const fileContents = fs.readFileSync(
    join(PROJECTS_DIR, 'highlight_project.json'),
    'utf8'
  );
  const highlightProject: HighlightProject = JSON.parse(fileContents);
  return highlightProject;
};

export const getHighlightSubProjects = (): HighlightSubProject[] => {
  const fileContents = fs.readFileSync(
    join(PROJECTS_DIR, 'highlight_sub_projects.json'),
    'utf8'
  );
  const highlightSubProject: HighlightSubProject[] = JSON.parse(fileContents);
  return highlightSubProject;
};
