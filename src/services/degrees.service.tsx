
import axios from 'axios';
import { Degree } from '../models/degree.model';

const API_URL = import.meta.env.VITE_API_URL;
const DEGREES_ENDPOINT = '/degrees';

export const getDegrees = async () => {
  try {
    const endpoint = `${API_URL}${DEGREES_ENDPOINT}`;
    const response = await axios.get(endpoint);

    let degrees: Degree[] = response.data;
    return degrees;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};
