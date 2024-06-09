import React from 'react';
import { useBoard } from './contexts/BoardContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { BoardNameProvider } from './contexts/BoardNameContext';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/pageTransition/PageTransition';
import Sidebar from './components/sidebar/Sidebar';
import Home from './components/home/Home';
import Statistics from './components/statistics/Statistics';
import TaskBoard from './components/taskBoard/TaskBoard';
import './App.css';

export default function App() {
  const location = useLocation();
  const { boards } = useBoard();

  const renderBoardsRoute = () => {
    const list = boards.map(({ id, path, name }) => (<Route key={id} path={path} element={<PageTransition><TaskBoard boardId={id} /></PageTransition>} />));
    return list;
  }

  return (
    <ThemeProvider>
      <BoardNameProvider>
        <Sidebar />
        <div className='page'>
          <AnimatePresence mode='wait'>
            <Routes location={location} key={location.pathname}>
              <Route path='/' element={<PageTransition><Home /></PageTransition>} />
              <Route path='/stats' element={<PageTransition><Statistics /></PageTransition>} />
              {renderBoardsRoute()}
            </Routes>
          </AnimatePresence>
        </div>
      </BoardNameProvider>
    </ThemeProvider>
  );
};