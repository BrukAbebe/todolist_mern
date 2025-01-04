import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Stack,
  Box,
  Checkbox,
  Select,
  useToast,
  Flex,
  Text,
  IconButton,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createTask,
  updateTask,
  getTaskById,
} from "../../services/taskservice";
import { getCategories } from "../../services/categoryservice";
import { CloseIcon } from "@chakra-ui/icons";

const TaskForm = ({ mode = "add" }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    category: "",
    notes: "",
    attachments: [],
    completed: false,
  });
  const [files, setFiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const toast = useToast();
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryData = await getCategories();
        setCategories(categoryData.data);
      } catch (error) {
        toast({
          title: "Error fetching categories",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    };

    fetchCategories();

    if (mode === "edit" && id) {
      const fetchTask = async () => {
        try {
          const taskData = await getTaskById(id);
          setTask({
            title: taskData.title || "",
            description: taskData.description || "",
            priority: taskData.priority || "medium",
            dueDate: taskData.dueDate
              ? new Date(taskData.dueDate).toISOString().split("T")[0]
              : "",
            category: taskData.category?._id || "",
            notes: taskData.notes || "",
            attachments: taskData.attachments || [],
            completed: taskData.completed || false,
          });
        } catch (error) {
          toast({
            title: "Error fetching task",
            description: error.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }
      };

      fetchTask();
    }
  }, [id, mode, toast]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedDueDate = task.dueDate
      ? new Date(task.dueDate).toISOString()
      : "";

    const formData = new FormData();
    formData.append("title", task.title);
    formData.append("description", task.description);
    formData.append("priority", task.priority);
    formData.append("dueDate", formattedDueDate || null);
    formData.append("category", task.category || "");
    formData.append("notes", task.notes);
    formData.append("completed", task.completed);
    files.forEach((file) => formData.append("attachments", file));

    try {
      if (mode === "add") {
        await createTask(formData);
        toast({
          title: "Task Created",
          description: "Your task has been created successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      } else {
        await updateTask(id, formData);
        toast({
          title: "Task Updated",
          description: "Your task has been updated successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
      navigate("/tasks");
    } catch (error) {
      toast({
        title: "Error",
        description: `Error ${mode === "add" ? "creating" : "updating"} task: ${
          error.message
        }`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const headingFontSize = useBreakpointValue({
    base: "xl",
    md: "2xl",
    lg: "2xl",
  });
  const formControlFontSize = useBreakpointValue({
    base: "sm",
    md: "md",
    lg: "lg",
  });

  return (
    <Box
      p={8}
      borderWidth={1}
      borderRadius="lg"
      bg="white"
      shadow="md"
      maxW="4xl"
      mx="auto"
    >
      <Flex justify="space-between" mb={4}>
        <Text fontSize={headingFontSize} fontWeight="bold" color="teal.600">
          {mode === "add" ? "Create Task" : "Edit Task"}
        </Text>
        <IconButton
          aria-label="Close"
          icon={<CloseIcon />}
          colorScheme="gray"
          variant="outline"
          onClick={() => navigate("/tasks")}
        />
      </Flex>
      <form onSubmit={handleSubmit}>
        <Stack spacing={5}>
          <FormControl isRequired>
            <FormLabel
              fontWeight="bold"
              color="gray.700"
              fontSize={formControlFontSize}
            >
              Title
            </FormLabel>
            <Input
              type="text"
              name="title"
              value={task.title}
              onChange={handleInputChange}
              placeholder="Enter task title"
              borderColor="gray.300"
              _focus={{
                borderColor: "teal.500",
                boxShadow: "0 0 0 1px teal.500",
              }}
              size="md"
              _placeholder={{ color: "gray.500" }}
            />
          </FormControl>

          <FormControl>
            <FormLabel
              fontWeight="bold"
              color="gray.700"
              fontSize={formControlFontSize}
            >
              Description
            </FormLabel>
            <Textarea
              name="description"
              value={task.description}
              onChange={handleInputChange}
              placeholder="Enter task description"
              borderColor="gray.300"
              _focus={{
                borderColor: "teal.500",
                boxShadow: "0 0 0 1px teal.500",
              }}
              size="md"
              _placeholder={{ color: "gray.500" }}
            />
          </FormControl>

          <FormControl>
            <FormLabel
              fontWeight="bold"
              color="gray.700"
              fontSize={formControlFontSize}
            >
              Priority
            </FormLabel>
            <Select
              name="priority"
              value={task.priority}
              onChange={handleInputChange}
              borderColor="gray.300"
              _focus={{
                borderColor: "teal.500",
                boxShadow: "0 0 0 1px teal.500",
              }}
              size="md"
              _placeholder={{ color: "gray.500" }}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel
              fontWeight="bold"
              color="gray.700"
              fontSize={formControlFontSize}
            >
              Due Date
            </FormLabel>
            <Input
              type="date"
              name="dueDate"
              value={task.dueDate}
              onChange={handleInputChange}
              borderColor="gray.300"
              _focus={{
                borderColor: "teal.500",
                boxShadow: "0 0 0 1px teal.500",
              }}
              size="md"
              _placeholder={{ color: "gray.500" }}
            />
          </FormControl>

          <FormControl>
            <FormLabel
              fontWeight="bold"
              color="gray.700"
              fontSize={formControlFontSize}
            >
              Category
            </FormLabel>
            <Select
              name="category"
              value={task.category}
              onChange={handleInputChange}
              borderColor="gray.300"
              _focus={{
                borderColor: "teal.500",
                boxShadow: "0 0 0 1px teal.500",
              }}
              size="md"
              _placeholder={{ color: "gray.500" }}
            >
              <option value="">None</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel
              fontWeight="bold"
              color="gray.700"
              fontSize={formControlFontSize}
            >
              Notes
            </FormLabel>
            <Textarea
              name="notes"
              value={task.notes}
              onChange={handleInputChange}
              placeholder="Enter additional notes"
              borderColor="gray.300"
              _focus={{
                borderColor: "teal.500",
                boxShadow: "0 0 0 1px teal.500",
              }}
              size="md"
              _placeholder={{ color: "gray.500" }}
            />
          </FormControl>

          <FormControl
            id="attachments"
            mt={4}
            p={4}
            borderWidth={1}
            borderRadius="md"
            bg="white"
            boxShadow="sm"
            _hover={{ boxShadow: "md" }}
            transition="all 0.2s"
          >
            <FormLabel
              fontWeight="bold"
              color="gray.700"
              fontSize={formControlFontSize}
              mb={2}
            >
              Attachments
            </FormLabel>
            <Input
              type="file"
              multiple
              onChange={handleFileChange}
              borderColor="gray.300"
              _focus={{
                borderColor: "teal.500",
                boxShadow: "0 0 0 1px teal.500",
              }}
              size="md"
              p={2}
              bg="gray.50"
              _hover={{ bg: "gray.100" }}
              transition="background-color 0.2s"
            />
          </FormControl>

          <FormControl>
            <Checkbox
              name="completed"
              isChecked={task.completed}
              onChange={handleCheckboxChange}
              colorScheme="teal"
              size="lg"
            >
              Completed
            </Checkbox>
          </FormControl>

          <Stack direction="row" spacing={4} mt={6}>
            <Button type="submit" colorScheme="blue" size="md" flex="1">
              {mode === "add" ? "Create Task" : "Update Task"}
            </Button>
            <Button
              onClick={() => navigate("/tasks")}
              colorScheme="gray"
              size="md"
              flex="1"
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

export default TaskForm;
