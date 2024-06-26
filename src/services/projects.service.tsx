
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
    const endpoint = `${API_URL}${PROJECTS_ENDPOINT}/${id}`;
    const response = await axios.get(endpoint);

    let project: ProjectDetail | null = response.data ?? null;
    return project;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};


export const deleteProjectById = async (id: number) => {
  try {
    const endpoint = `${API_URL}${PROJECTS_ENDPOINT}/${id}`;
    await axios.delete(endpoint);
    return true;
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
};

export interface ProjectRequest {
  title: string,
  description: string
  creationDate: any,
  members: string,
  technologies: string[]
  professorName: string,
  repoUrl: string,
  projectUrl: string,
  subjectId?: number,
  degreeId?: number,
  // TODO: links
}
export const createNewProject = async (data: ProjectRequest, files: any) => {
  const formData = new FormData();

  try {
    for (let index = 0; index < files?.length; index++) {
      formData.append(index==0 ? "project" : "covers", files[index]);
    }
    Object.entries(data).forEach(([key, value]) => {
      if(key=="technologies"){
        formData.append(key, value.join(";"));
      } else{
        formData.append(key, value);
      }
    });
    const endpoint = `${API_URL}${PROJECTS_ENDPOINT}`;
    const result = await axios.post(endpoint, formData);
    return result.data?.id;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}