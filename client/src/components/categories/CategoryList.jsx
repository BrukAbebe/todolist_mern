import React from "react";
import {
  Box,
  Text,
  HStack,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

const CategoryList = ({ categories, onEdit, onDelete }) => (
  <Box>
    {categories.map((category) => (
      <HStack
        key={category._id}
        p={4}
        borderWidth={1}
        borderRadius="md"
        justifyContent="space-between"
        bg={useColorModeValue("white", "gray.800")}
        _hover={{ bg: useColorModeValue("gray.50", "gray.700") }}
        transition="background-color 0.2s"
      >
        <Text fontSize="lg" color="gray.700">
          {category.name}
        </Text>
        <HStack spacing={1}>
          <IconButton
            icon={<EditIcon />}
            aria-label="Edit category"
            size="sm"
            onClick={() => onEdit(category)}
            colorScheme="yellow"
          />
          <IconButton
            icon={<DeleteIcon />}
            aria-label="Delete category"
            size="sm"
            onClick={() => onDelete(category._id)}
            colorScheme="red"
          />
        </HStack>
      </HStack>
    ))}
  </Box>
);

export default CategoryList;
