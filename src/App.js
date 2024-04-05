import React from 'react';
import { TasksProvider } from './contexts/TasksContext';
import { ThemeProvider } from './contexts/ThemeContext';
import TaskBoard from './components/taskBoard/TaskBoard';
import Header from './components/header/Header';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Header />
      <TasksProvider>
        <TaskBoard />
      </TasksProvider>
    </ThemeProvider>
  );
}

export default App;