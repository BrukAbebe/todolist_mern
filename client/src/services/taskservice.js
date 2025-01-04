
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api/tasks`;

export const getTasks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching tasks: ${error.response?.data?.message || error.message}`);
  }
};

export const getTaskById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching task by ID: ${error.response?.data?.message || error.message}`);
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await axios.post(API_URL, taskData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error creating task: ${error.response?.data?.message || error.message}`);
  }
};

export const updateTask = async (id, taskData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, taskData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error updating task: ${error.response?.data?.message || error.message}`);
  }
};

export const deleteTask = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    throw new Error(`Error deleting task: ${error.response?.data?.message || error.message}`);
  }
};
