import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/auth';

export const signIn = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signin`, credentials);
    return response.data;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};