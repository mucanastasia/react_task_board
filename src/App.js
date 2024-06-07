import React from 'react';
import { TasksProvider } from './contexts/TasksContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { BoardNameProvider } from './contexts/BoardNameContext';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './components/sidebar/Sidebar';
import Home from './components/home/Home';
import Statistics from './components/statistics/Statistics';
import TaskBoard from './components/taskBoard/TaskBoard';
import './App.css';

const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
  },
};

const pageTransition = {
  duration: 0.25,
};

function App() {
  const location = useLocation();

  return (
    <ThemeProvider>
      <BoardNameProvider>
        <Sidebar />
        <TasksProvider>

          <div className='page'>
            <AnimatePresence mode='wait'>
              <Routes location={location} key={location.pathname}>
                <Route path='/' element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Home />
                  </motion.div>
                } />
                <Route path='/stats' element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Statistics />
                  </motion.div>
                } />
                <Route path='/board_1' element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <TaskBoard />
                  </motion.div>
                } />
              </Routes>
            </AnimatePresence>
          </div>
        </TasksProvider>
      </BoardNameProvider>
    </ThemeProvider>
  );
}

export default App;