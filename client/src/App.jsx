import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box, Container } from '@chakra-ui/react';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import TasksPage from './pages/TasksPage';
import CategoriesPage from './pages/CategoriesPage';
import TaskDetails from './components/tasks/TaskDetails';
import TaskForm from './components/tasks/TaskForm';
import Loading from './components/Loading';
import NotFound from './components/NotFound'; // Import the NotFound component

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {loading ? (
        <Loading />
      ) : (
        <Box display="flex">
          <Sidebar />
          <Box ml={{ base: 0, md: '250px' }} width="100%">
            <Container maxW="container.md" p={4}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/tasks/form" element={<TaskForm mode="add" />} />
                <Route path="/tasks/form/:id" element={<TaskForm mode="edit" />} />
                <Route path="/tasks/:id" element={<TaskDetails />} />
                <Route path="/categories" element={<CategoriesPage />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Container>
          </Box>
        </Box>
      )}
    </Router>
  );
};

export default App;
