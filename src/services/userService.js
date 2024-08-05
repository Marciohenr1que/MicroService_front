import axios from 'axios';

const API_BASE_URL = 'https://localhost:3000';

const userService = {
  getUserTasks: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user details', error);
      throw error;
    }
  },

  updateUserTasks: async (userTasksId) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/tasks/${userTasksId}`);
      return response.data;
    } catch (error) {
      console.error('Error updating user details', error);
      throw error;
    }
  },

 
};

export default userService;
