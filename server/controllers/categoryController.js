const categoryService = require("../services/categoryService");


const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        status: 'error',
        error: { message: 'Name is required' },
      });
    }
    const category = await categoryService.createCategory(name);
    res.status(201).json({ status: 'success', data: category });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error: { message: error.message },
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        status: 'error',
        error: { message: 'Name is required' },
      });
    }
    const updatedCategory = await categoryService.updateCategory(id, name);
    if (!updatedCategory) {
      return res.status(404).json({
        status: 'error',
        error: { message: 'Category not found' },
      });
    }
    res.status(200).json({ status: 'success', data: updatedCategory });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error: { message: error.message },
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryService.deleteCategory(id);
    res.status(200).json({ status: 'success', data: { message: 'Category deleted' } });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error: { message: error.message },
    });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json({ status: 'success', data: categories });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error: { message: error.message },
    });
  }
};

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories,
};

