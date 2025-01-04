const Category = require("../models/categoryModel");

const getAllCategories = async () => {
  return await Category.find();
};

const createCategory = async (name) => {
  const category = new Category({ name });
  return await category.save();
};

// Update an existing category
const updateCategory = async (id, name) => {
  const category = await Category.findById(id);
  if (!category) {
    return null; 
  }
  category.name = name;
  return await category.save();
};

const deleteCategory = async (categoryId) => {
  const result = await Category.findByIdAndDelete(categoryId);
  if (!result) throw new Error("Category not found");

  return { message: "Category deleted" };
};

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
