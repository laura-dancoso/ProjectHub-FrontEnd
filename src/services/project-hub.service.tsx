
import axios from 'axios';
import { Project } from '../models/project.model';
import { ProjectDetail } from '../models/projectDetail.model';

const API_URL = import.meta.env.VITE_API_URL;
const PROJECTS_ENDPOINT = '/projects';

export const getProjects = async () => {
  try {
    const endpoint = `${API_URL}${PROJECTS_ENDPOINT}`;
    const response = await axios.get(endpoint);

    let projects: Project[] = response.data;
    return projects;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};


export const getProjectById = async (id: number) => {
  try {
    const endpoint = `${API_URL}/${PROJECTS_ENDPOINT}/${id}`;
    const response = await axios.get(endpoint);

    let project: ProjectDetail | null = response.data ?? null;
    return project;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};
