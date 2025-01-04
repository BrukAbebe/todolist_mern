import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Button,
  useDisclosure,
  VStack,
  useToast,
  Text,
  Flex,
} from "@chakra-ui/react";
import CategoryList from "../components/categories/CategoryList";
import CategoryFormModal from "../components/categories/CategoryFormModal";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/categoryservice";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [error, setError] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      if (response.status === "success") {
        setCategories(response.data);
      } else {
        throw new Error(response.error.message);
      }
    } catch (err) {
      setError("Failed to fetch categories");
      toast({
        title: "Error",
        description: err.message || "Failed to fetch categories",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleAdd = () => {
    setSelectedCategory(null);
    onOpen();
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    onOpen();
  };

  const handleDelete = async (categoryId) => {
    try {
      const response = await deleteCategory(categoryId);
      toast({
        title: "Category Deleted",
        description: response.message,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      fetchCategories();
    } catch (err) {
      toast({
        title: "Error",
        description: err.message || "Failed to delete category",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleSave = async (name) => {
    try {
      let response;
      if (selectedCategory) {
        response = await updateCategory(selectedCategory._id, name);
        toast({
          title: "Category Updated",
          description: "Category updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } else {
        response = await createCategory(name);
        toast({
          title: "Category Created",
          description: "Category created successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
      if (response.status === "success") {
        fetchCategories();
        onClose();
      } else {
        throw new Error(response.error.message);
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to save category",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Box p={[4, 8]} maxW="3xl" mx="auto">
      <Flex
        mb={[4, 8]}
        justifyContent="space-between"
        alignItems="center"
        bg="gray.50"
        p={[2, 4]}
        borderRadius="md"
        boxShadow="md"
      >
        <Heading
          textAlign="center"
          color="teal.600"
          fontSize={["lg", "2xl"]}
          fontWeight="bold"
        >
          Categories
        </Heading>
        <Button
          colorScheme="teal"
          size={["sm", "md"]}
          variant="solid"
          _hover={{ bg: "teal.500" }}
          shadow="sm"
          onClick={handleAdd}
        >
          Add Category
        </Button>
      </Flex>
      {error ? (
        <Text color="red.500">{error}</Text>
      ) : (
        <VStack spacing={4} align="stretch">
          <CategoryList
            categories={categories}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </VStack>
      )}
      <CategoryFormModal
        isOpen={isOpen}
        onClose={onClose}
        onSave={handleSave}
        category={selectedCategory}
      />
    </Box>
  );
};

export default CategoriesPage;
