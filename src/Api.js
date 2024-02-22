import axios from 'axios';
import { API_BASE_URL } from './config';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const createUser = async (userData) => {
  try {
    const response = await api.post('/users/sign_up', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const login = async (userData) => {
  try {
    const response = await api.post('/login', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const fetchTasks = async () => {
  try {
    const response = await api.get('/tasks');
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const createTask = async (newTask) => {
  try {
    const response = await api.post('/tasks', newTask);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTaskStatus = async (taskId, newStatus) => {
  try {
    const response = await api.put(`/tasks/${taskId}`, { status: newStatus });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
