import React from 'react';
import { TasksProvider } from './contexts/TasksContext';
import { ThemeProvider } from './contexts/ThemeContext';
import TaskBoard from './components/taskBoard/TaskBoard';
import Header from './components/header/Header';
import './App.css';
import { BoardNameProvider } from './contexts/BoardNameContext';

function App() {
  return (
    <ThemeProvider>
      <BoardNameProvider>
        <Header />
        <TasksProvider>
          <TaskBoard />
        </TasksProvider>
      </BoardNameProvider>
    </ThemeProvider>
  );
}

export default App;