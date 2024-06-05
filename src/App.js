import React from 'react';
import { TasksProvider } from './contexts/TasksContext';
import { ThemeProvider } from './contexts/ThemeContext';
import TaskBoard from './components/taskBoard/TaskBoard';
import Header from './components/header/Header';
import './App.css';
import { BoardNameProvider } from './contexts/BoardNameContext';
import Sidebar from './components/sidebar/Sidebar';

function App() {
  return (
    <ThemeProvider>
      <BoardNameProvider>
        <Sidebar />
        <Header />
        <TasksProvider>
          <TaskBoard />
        </TasksProvider>
      </BoardNameProvider>
    </ThemeProvider>
  );
}

export default App;