import React from 'react';
import { useBoard } from './contexts/BoardContext';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useSidebar } from './contexts/SidebarContext';
import Sidebar from './components/sidebar/Sidebar';
import Home from './components/home/Home';
import Statistics from './components/statistics/Statistics';
import TaskBoard from './components/taskBoard/TaskBoard';
import './App.css';

export default function App() {
  const location = useLocation();
  const { boards } = useBoard();
  const { isOpen } = useSidebar();

  const renderBoardsRoute = () => {
    const list = boards.map((board) => (<Route key={board.id} path={board.path} element={<TaskBoard board={board} />} />));
    return list;
  }

  return (
    <>
      <Sidebar />
      <AnimatePresence mode='wait'>
        <motion.div
          key='content-page'
          className='content'
          initial={false}
          animate={{ marginLeft: isOpen ? 240 : 64 }}
          transition={{ type: 'linear', duration: 0.25 }}
        >
          <AnimatePresence mode='wait'>
            <Routes location={location} key={location.pathname}>
              <Route path='/' element={<Home />} />
              <Route path='/stats' element={<Statistics />} />
              {renderBoardsRoute()}
            </Routes>
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </>
  );
};