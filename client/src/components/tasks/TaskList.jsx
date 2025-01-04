import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Text,
  useToast,
  Flex,
  Divider,
  VStack,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { getTasks, deleteTask } from "../../services/taskservice";
import { ViewIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";

const TaskList = ({ selectedCategory }) => {
  const [tasks, setTasks] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await getTasks();
        setTasks(tasksData);
      } catch (error) {
        toast({
          title: "Error fetching tasks",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchTasks();
  }, [toast]);

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task._id !== taskId));
      toast({
        title: "Task Deleted",
        description: "The task has been deleted successfully.",
        status: "success",
        duration: 5000,
        position:"top",
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error deleting task",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const getCategoryId = (category) => {
    return category ? category._id : null;
  };

  const filteredTasks = selectedCategory
    ? tasks.filter((task) => getCategoryId(task.category) === selectedCategory)
    : tasks;

  return (
    <Box p={6} bg="gray.50" borderRadius="md">
      <Stack spacing={4}>
        {filteredTasks.length === 0 ? (
          <Text>No tasks found for this category.</Text>
        ) : (
          filteredTasks.map((task) => (
            <Box
              key={task._id}
              borderWidth="1px"
              borderRadius="md"
              p={4}
              bg="white"
            >
              <Text
                fontSize={{ base: "md", sm: "lg", md: "lg" }}
                fontWeight="bold"
                color="teal.600"
              >
                {task.title || "No Title"}
              </Text>
              <Divider borderColor="teal.200" my={2} />
              <VStack spacing={2} align="start">
                <Text
                  fontSize={{ base: "sm", sm: "md", md: "md" }}
                  color="gray.700"
                >
                  <strong>Priority:</strong>{" "}
                  {task.priority
                    ? task.priority.charAt(0).toUpperCase() +
                      task.priority.slice(1)
                    : "No Priority"}
                </Text>
                <Text
                  fontSize={{ base: "sm", sm: "md", md: "md" }}
                  color="gray.700"
                >
                  <strong>Due Date:</strong>{" "}
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "No Due Date"}
                </Text>
              </VStack>
              <Flex
                mt={4}
                justifyContent={{ base: "flex-start", md: "flex-end" }}
                direction={{ base: "column", md: "row" }}
                wrap="wrap"
                align={{ base: "flex-start", md: "center" }}
              >
                <HStack
                  spacing={3}
                  mb={{ base: 4, md: 0 }}
                  display={{ base: "flex", md: "flex" }}
                >
                  <Link to={`/tasks/${task._id}`}>
                    <IconButton
                      aria-label="View Details"
                      icon={<ViewIcon />}
                      colorScheme="blue"
                      size="sm"
                      fontSize={{ base: "sm", sm: "md", md: "lg" }}
                    />
                  </Link>
                  <Link to={`/tasks/form/${task._id}`}>
                    <IconButton
                      aria-label="Edit Task"
                      icon={<EditIcon />}
                      colorScheme="yellow"
                      size="sm"
                      fontSize={{ base: "sm", sm: "md", md: "lg" }}
                    />
                  </Link>
                  <IconButton
                    aria-label="Delete Task"
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    size="sm"
                    fontSize={{ base: "sm", sm: "md", md: "lg" }}
                    onClick={() => handleDelete(task._id)}
                  />
                </HStack>
              </Flex>
            </Box>
          ))
        )}
      </Stack>
    </Box>
  );
};

export default TaskList;
