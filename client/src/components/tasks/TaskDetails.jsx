import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Button,
  Stack,
  useToast,
  Link,
  List,
  ListItem,
  Flex,
  Divider,
  VStack,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { getTaskById, deleteTask } from "../../services/taskservice";
import { EditIcon, DeleteIcon, ArrowBackIcon } from "@chakra-ui/icons";

const TaskDetails = () => {
  const [task, setTask] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const taskData = await getTaskById(id);
        setTask(taskData);
      } catch (error) {
        toast({
          title: "Error fetching task",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchTask();
  }, [id, toast]);

  const handleDelete = async () => {
    try {
      await deleteTask(id);
      toast({
        title: "Task Deleted",
        description: "The task has been deleted successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      navigate("/tasks");
    } catch (error) {
      toast({
        title: "Error deleting task",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top", 
        variant: "solid",
      });
    }
  };

  const handleEdit = () => {
    navigate(`/tasks/form/${id}`);
  };

  if (!task)
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Spinner size="xl" />
      </Flex>
    );

  return (
    <Box
      p={6}
      maxW="4xl"
      mx="auto"
      bg="gray.50"
      minH="100vh"
      display="flex"
      flexDirection="column"
    >
      <Box flex="1" mb={6}>
        <Flex align="center" justify="space-between" mb={6}>
          <Text
            fontSize={{ base: "xl", sm: "xl", md: "xl" }}
            fontWeight="bold"
            color="teal.700"
          >
            Task Details
          </Text>
        </Flex>
        <Box p={6} borderWidth="1px" borderRadius="lg" bg="white">
          <Stack spacing={4}>
            <Text
              fontSize={{ base: "xl", sm: "xl", md: "xl" }}
              fontWeight="bold"
              color="teal.800"
              textAlign="center"
            >
              {task.title}
            </Text>
            <Divider borderColor="teal.200" />
            <VStack spacing={4} align="start">
              <Text
                fontSize={{ base: "md", sm: "md", md: "md" }}
                color="gray.700"
              >
                <strong>Description:</strong>{" "}
                {task.description || "No description provided"}
              </Text>
              <Text
                fontSize={{ base: "md", sm: "md", md: "md" }}
                color="gray.700"
              >
                <strong>Priority:</strong>{" "}
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </Text>
              <Text
                fontSize={{ base: "md", sm: "md", md: "md" }}
                color="gray.700"
              >
                <strong>Due Date:</strong>{" "}
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : "No due date"}
              </Text>
              <Text
                fontSize={{ base: "md", sm: "md", md: "md" }}
                color="gray.700"
              >
                <strong>Notes:</strong> {task.notes || "No notes provided"}
              </Text>

              {task.category && (
                <Text
                  fontSize={{ base: "md", sm: "md", md: "md" }}
                  color="gray.700"
                >
                  <strong>Category:</strong>{" "}
                  {task.category.name || "No category provided"}
                </Text>
              )}

              {task.attachments.length > 0 && (
                <Box>
                  <Text
                    fontWeight="bold"
                    fontSize={{ base: "md", sm: "md", md: "md" }}
                    color="teal.600"
                    mb={2}
                  >
                    Attachments:
                  </Text>
                  <List spacing={2}>
                    {task.attachments.map((file, index) => (
                      <ListItem key={index}>
                        <Link
                          href={`${import.meta.env.VITE_API_URL}/uploads/${file}`}
                          isExternal
                          color="teal.500"
                        >
                          View File {index + 1}
                        </Link>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}

              <Stack direction="row" spacing={4} mt={6} justify="center">
                <IconButton
                  aria-label="Edit Task"
                  icon={<EditIcon />}
                  colorScheme="yellow"
                  size="sm"
                  onClick={handleEdit}
                />
                <IconButton
                  aria-label="Delete Task"
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  size="sm"
                  onClick={handleDelete}
                />
                <IconButton
                  aria-label="Back"
                  icon={<ArrowBackIcon />}
                  colorScheme="teal"
                  size="sm"
                  onClick={() => navigate("/tasks")}
                />
              </Stack>
            </VStack>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default TaskDetails;
