import React, { useState, useEffect } from "react";
import { Box, Button, useToast, Flex, Heading, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import TaskList from "../components/tasks/TaskList";
import Navbar from "../components/tasks/Navbar";
import { getCategories } from "../services/categoryservice";

const TasksPage = () => {
  const toast = useToast();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        const categoriesData = response.data;
       
        setCategories(categoriesData || []);
      } catch (error) {
        toast({
          title: "Error fetching categories",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchCategories();
  }, [toast]);

  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <Box
      p={6}
      bgGradient="linear(to-r, blue.50, purple.50)"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
    >
      <Box width="100%" overflowX="auto">
        <Navbar
          categories={categories}
          onSelectCategory={handleSelectCategory}
          selectedCategory={selectedCategory}
        />
      </Box>
      <Box>
        <Flex
          direction={{ base: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          mb={6}
          borderRadius="lg"
          p={4}
          bg="white"
          boxShadow="lg"
          borderWidth="1px"
          borderColor="gray.200"
        >
          <Heading
            size="lg"
            color="gray.800"
            fontSize={{ base: "xl", sm: "2xl", md: "2xl", lg: "3xl" }}
          >
            Tasks
          </Heading>
          <Button
            colorScheme="teal"
            size="md"
            fontSize={{ base: "sm", sm: "md", md: "lg", lg: "md" }}
            _hover={{ bg: "teal.500" }}
          >
            <Link
              to="/tasks/form"
              style={{ textDecoration: "none", color: "white" }}
            >
              Add New Task
            </Link>
          </Button>
        </Flex>

        <Flex>
          <Box width="100%" pt="4">
            <Stack spacing={4}>
              <TaskList selectedCategory={selectedCategory} />
            </Stack>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default TasksPage;
