import Papa from 'papaparse';
import { join } from 'path';
import fs from 'fs';

const DATA_DIR = join(process.cwd(), '/data');
const TEAM_DIR = join(DATA_DIR, '/team');

export const getCoreTeamMembers = () => {
  const fileContents = fs.readFileSync(
    join(TEAM_DIR, '/core_members.csv'),
    'utf8'
  );
  return Papa.parse(fileContents, { header: true }).data;
};

export const getFacultyMembers = () => {
  const fileContents = fs.readFileSync(
    join(TEAM_DIR, 'faculty_members.csv'),
    'utf8'
  );
  return Papa.parse(fileContents, { header: true }).data;
};

export const getCollaborators = () => {
  const fileContents = fs.readFileSync(
    join(TEAM_DIR, 'collaborators.csv'),
    'utf8'
  );
  const collaborators: { [key: string]: string[] } = {};

  Papa.parse(fileContents, {
    header: true,
    complete: (results) => {
      results.data.forEach((row: { name: string; institution: string }) => {
        const { name, institution } = row;
        if (!collaborators[institution]) {
          collaborators[institution] = [];
        }
        collaborators[institution].push(name);
      });
    },
  });

  const order: string[] = [
    'Salesforce Research',
    'Google Research',
    'Amazon AWS',
    'DB',
    'HCI/VIS',
    'Other',
  ];

  return order.map((institution) => ({
    institution,
    members: collaborators[institution] || [],
  }));
};
