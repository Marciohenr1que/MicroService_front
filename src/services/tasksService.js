import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Substitua pelo URL da sua API

// Obtém o token armazenado no localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const getTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks`, { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch tasks');
  }
};

const getTask = async (taskId) => {
  try {
    const response = await axios.get(`${API_URL}/tasks/${taskId}`, { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch task');
  }
};

const createTask = async (taskData) => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, { task: taskData }, { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to create task');
  }
};

const updateTask = async (taskId, taskData) => {
  try {
    const response = await axios.put(`${API_URL}/tasks/${taskId}`, { task: taskData }, { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to update task');
  }
};

const deleteTask = async (taskId) => {
  try {
    await axios.delete(`${API_URL}/tasks/${taskId}`, { headers: getAuthHeader() });
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to delete task');
  }
};

export default {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};