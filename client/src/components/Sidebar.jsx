import React from 'react';
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Link,
  VStack,
  useDisclosure,
  Divider,
  Text,
  Flex,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {/* Sidebar for large screens */}
      <Box
        display={{ base: 'none', md: 'block' }}
        width="250px"
        position="fixed"
        height="100%"
        bg="gray.800"
        color="white"
        p={4}
        boxShadow="md"
        borderRightWidth="1px"
        borderRightColor="gray.700"
      >
        <Flex direction="column" height="full">
          <Text fontSize="2xl" fontWeight="bold" mb={6} textAlign="center">
            Task Manager
          </Text>
          <VStack align="start" spacing={4}>
            <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none', color: 'teal.400' }}>
              Home
            </Link>
            <Link as={RouterLink} to="/tasks" _hover={{ textDecoration: 'none', color: 'teal.400' }}>
              Tasks
            </Link>
            <Link as={RouterLink} to="/categories" _hover={{ textDecoration: 'none', color: 'teal.400' }}>
              Categories
            </Link>
          </VStack>
        </Flex>
      </Box>

      {/* Mobile menu button */}
      <IconButton
        aria-label="Open Menu"
        icon={<HamburgerIcon />}
        display={{ base: 'block', md: 'none' }}
        onClick={onOpen}
        position="fixed"
        top={4}
        left={4}
        zIndex={20}
        colorScheme="teal"
      />

      {/* Mobile drawer */}
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent bg="gray.800" color="white">
          <DrawerHeader>
            <Flex justify="space-between" align="center">
              <Text fontSize="2xl" fontWeight="bold">
                Task Manager
              </Text>
              <IconButton
                aria-label="Close Menu"
                icon={<CloseIcon />}
                onClick={onClose}
                colorScheme="teal"
              />
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            <VStack align="start" spacing={4}>
              <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none', color: 'teal.400' }} onClick={onClose}>
                Home
              </Link>
              <Link as={RouterLink} to="/tasks" _hover={{ textDecoration: 'none', color: 'teal.400' }} onClick={onClose}>
                Tasks
              </Link>
              <Link as={RouterLink} to="/categories" _hover={{ textDecoration: 'none', color: 'teal.400' }} onClick={onClose}>
                Categories
              </Link>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;
