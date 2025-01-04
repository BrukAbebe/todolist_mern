import axios from 'axios';


const API_URL = `${import.meta.env.VITE_API_URL}/api/categories`;


// Fetch all categories
export const getCategories = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching categories');
  }
};

// Create a new category
export const createCategory = async (name) => {
  try {
    const response = await axios.post(API_URL, { name });
    return response.data;
  } catch (error) {
    throw new Error('Error creating category');
  }
};

// Update an existing category
export const updateCategory = async (categoryId, name) => {
  try {
    const response = await axios.put(`${API_URL}/${categoryId}`, { name});
    return response.data;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};

// Delete a category
export const deleteCategory = async (categoryId) => {
  try {
    await axios.delete(`${API_URL}/${categoryId}`);
    return { message: 'Category deleted' };
  } catch (error) {
    console.error('Error deleting category:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to delete category');
 
  }
};
