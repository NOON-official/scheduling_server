const { LocalStorage } = require('node-localstorage');
const { nanoid } = require('nanoid');

const localStorage = new LocalStorage('data/db');

const createProject = async (project) => {
  const projects = await getProjects();
  const newProject = {
    ...project,
    id: nanoid(),
    intro: '',
    created_at: new Date(),
    updated_at: new Date(),
    is_deleted: false,
  };
  projects.push(newProject);
  await saveProjects(projects);

  return newProject;
};

const getProjects = async () => {
  const raw = localStorage.getItem('projects');
  if (!raw) {
    return [];
  }
  return JSON.parse(raw);
};

const saveProjects = async (projects) => {
  localStorage.setItem('projects', JSON.stringify(projects));
};

module.exports = {
  getProjects,
  createProject,
  saveProjects,
};
