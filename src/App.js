import React from 'react';
import { TasksProvider } from './contexts/TasksContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { BoardNameProvider } from './contexts/BoardNameContext';
import TaskBoard from './components/taskBoard/TaskBoard';
import Sidebar from './components/sidebar/Sidebar';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Statistics from './components/statistics/Statistics';
import Home from './components/home/Home';

function App() {
  return (
    <ThemeProvider>
      <BoardNameProvider>
        <Sidebar />
        <TasksProvider>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/stats' element={<Statistics />} />
            <Route path='/board_1' element={<TaskBoard />} />
          </Routes>
        </TasksProvider>
      </BoardNameProvider>
    </ThemeProvider>
  );
}

export default App;