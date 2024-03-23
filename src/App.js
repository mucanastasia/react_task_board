import React from 'react';
import { TasksProvider } from './TasksContext';
import TaskBoard from './components/taskBoard/TaskBoard';
import './App.css';

function App() {
  return (
    <TasksProvider>
      <TaskBoard />
    </TasksProvider>
  );
}

export default App;
