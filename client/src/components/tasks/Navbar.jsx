import React from "react";
import { Box, Button, Stack } from "@chakra-ui/react";

const Navbar = ({ categories, onSelectCategory, selectedCategory }) => {
  return (
    <Box
      p={4}
      bg="gray.100"
      top="0"
      left="0"
      right="0"
      overflowX="auto" 
      boxShadow="md"
      zIndex="docked"
    >
      <Stack
        direction="row"
        spacing={4}
        alignItems="center"
        wrap="wrap" 
        minWidth="max-content" 
      >
        <Button
          variant={selectedCategory === "" ? "solid" : "outline"}
          colorScheme={selectedCategory === "" ? "teal" : "gray"}
          onClick={() => onSelectCategory("")}
          _hover={{ bg: selectedCategory === "" ? "teal.500" : "gray.200" }}
        >
          All Tasks
        </Button>
        {categories.map((category) => (
          <Button
            key={category._id}
            variant={selectedCategory === category._id ? "solid" : "outline"}
            colorScheme={selectedCategory === category._id ? "teal" : "gray"}
            onClick={() => onSelectCategory(category._id)}
            _hover={{
              bg: selectedCategory === category._id ? "teal.500" : "gray.200",
            }}
          >
            {category.name}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

export default Navbar;
