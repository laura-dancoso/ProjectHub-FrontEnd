
import axios from 'axios';
import { Subject } from '../models/subject.model';

const API_URL = import.meta.env.VITE_API_URL;
const SubjectS_ENDPOINT = '/subjects';

export const getSubjects = async () => {
  try {
    const endpoint = `${API_URL}${SubjectS_ENDPOINT}`;
    const response = await axios.get(endpoint);

    let Subjects: Subject[] = response.data;
    return Subjects;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};
