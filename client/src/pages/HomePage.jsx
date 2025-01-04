import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Spinner,
  HStack,
  Badge,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { getTasks } from "../services/taskservice"; 

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completedCount, setCompletedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [recentTasks, setRecentTasks] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks();
        if (Array.isArray(response)) {
          setTasks(response);

          
          const completed = response.filter((task) => task.completed).length;
          const pending = response.length - completed;
          setCompletedCount(completed);
          setPendingCount(pending);

          
          const sortedTasks = [...response].sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          );
          setRecentTasks(sortedTasks.slice(0, 4)); 
        } 
      } catch (err) {
        toast({
          title: "Error",
          description: err.message || "Failed to fetch tasks",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [toast]);

  return (
    <Box p={6} maxW="container.xl" mx="auto">
      <Flex direction="column" align="center" mb={8}>
        <Heading
          mb={4}
          color="teal.600"
          fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
        >
          Welcome to Task Manager
        </Heading>
        <Text fontSize={{ base: "md", sm: "lg", md: "xl" }} mb={4}>
          Here’s an overview of your tasks:
        </Text>
      </Flex>

      {loading ? (
        <Flex justify="center" align="center" h="200px">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <VStack spacing={6}>
          <Flex justify="center" w="full" mb={6}>
            <Box
              p={6}
              borderWidth={1}
              borderRadius="lg"
              shadow="lg"
              bgGradient="linear(to-br, teal.50, teal.100)"
              borderColor="teal.200"
              w={{ base: "full", md: "auto" }}
              maxW="md"
            >
              <Heading
                size="md"
                mb={4}
                fontSize={{ base: "lg", sm: "xl" }}
                color="teal.800"
                textAlign="center"
              >
                Task Summary
              </Heading>
              <Text
                fontSize={{ base: "md", sm: "lg", md: "xl" }}
                textAlign="center"
                color="gray.700"
              >
                <Badge
                  colorScheme="green"
                  mr={2}
                  fontSize={{ base: "sm", sm: "md" }}
                >
                  Completed: {completedCount}
                </Badge>
                <Badge colorScheme="yellow" fontSize={{ base: "sm", sm: "md" }}>
                  Pending: {pendingCount}
                </Badge>
              </Text>
            </Box>
          </Flex>

          <Box
            p={4}
            borderWidth={1}
            borderRadius="md"
            shadow="md"
            bg="gray.50"
            w="full"
          >
            <Heading
              size="md"
              mb={4}
              fontSize={{ base: "lg", sm: "xl", md: "2xl" }}
            >
              Recent Tasks
            </Heading>
            {recentTasks.length > 0 ? (
              <VStack spacing={4} align="stretch">
                {recentTasks.map((task) => (
                  <Box
                    key={task._id}
                    p={4}
                    borderWidth={1}
                    borderRadius="md"
                    shadow="md"
                    bg="white"
                  >
                    <Heading
                      size="sm"
                      mb={2}
                      fontSize={{ base: "md", sm: "lg" }}
                    >
                      {task.title}
                    </Heading>
                    <Text fontSize={{ base: "sm", sm: "md" }}>
                      {task.description || "No description"}
                    </Text>
                    <Text
                      mt={2}
                      fontSize={{ base: "xs", sm: "sm" }}
                      color="gray.500"
                    >
                      Updated on {new Date(task.updatedAt).toLocaleDateString()}
                    </Text>
                  </Box>
                ))}
              </VStack>
            ) : (
              <Text>No recent tasks available.</Text>
            )}
          </Box>
        </VStack>
      )}
    </Box>
  );
};

export default HomePage;
