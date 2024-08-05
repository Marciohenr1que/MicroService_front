import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, { auth: {email, password} });
      return response.data;
    } catch (error) {
      console.error('Login error', error);
      throw error;
    }
  },

  register: async (name, email, password, passwordConfirmation) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/signup`, { user: { name, email, password, password_confirmation: passwordConfirmation }});
      return response.data;
    } catch (error) {
      console.error('Registration error', error);
      throw error;
    }
  },

  
};

export default authService;
