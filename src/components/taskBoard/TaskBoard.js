import React, { useState, useEffect } from 'react';
import Task from './task/Task';

export default function TaskBoard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('taskList') || '[]');
    setTasks(storedTasks);
  }, []);

  const handleAddTask = (sectionId) => {
    const newTask = {
                      id: tasks.length > 0 ? tasks[tasks.length-1].id + 1000000 : 1000000,
                      name: '',
                      description: '',
                      status: sectionId,
                      isEditingName: true,
                      isEditingDescription: true,
                      done: sectionId === 'done',
                    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (taskId, updatedTaskData) => {
    let shouldUpdateLocalStorage = false;
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        const hasValidNameAndDescription = (updatedTaskData.name?.trim() || '').length > 0 && (updatedTaskData.description?.trim() || '').length > 0;
        const updatedTask = { ...task, ...updatedTaskData };
        if (hasValidNameAndDescription) {
          shouldUpdateLocalStorage = true;
        }
        return updatedTask;
      }
      return task;
    });
    setTasks(updatedTasks);
    if (shouldUpdateLocalStorage) {
      localStorage.setItem('taskList', JSON.stringify(updatedTasks));
    }
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem('taskList', JSON.stringify(updatedTasks));
  };

  const renderList = (sectionId) => {
    const list = tasks.filter((task) => task.status === sectionId).map((task) => (
      <Task key = {task.id} task={task} updateTask = {updateTask} deleteTask={deleteTask} index = {task.id} />
    ));
    return list;
  };

  const renderCounter = (sectionId) => {
    let counter = 0;
    const filteredTasks = tasks.filter((task) => task.status === sectionId);
    counter = filteredTasks.length;
    return counter;
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    const updatedTasks = tasks.map((task) => {
      if (task.id === +taskId) {
        return { ...task, status: newStatus, done: newStatus === 'done' };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem('taskList', JSON.stringify(updatedTasks));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('highlighted');
  };

  const handleDragLeaveOrDrop = (e) => {
    e.currentTarget.classList.remove('highlighted');
  };

  return (
    <>
      <div className='container'>
        <div className='containerToDo'
             id='toDo'
             onDrop={(e) => {handleDrop(e, 'toDo'); handleDragLeaveOrDrop(e);}}
             onDragOver={handleDragOver}
             onDragLeave={handleDragLeaveOrDrop}>
          <div className='title titleToDo'>To do <span>{renderCounter('toDo')}</span></div>
          <div>
            {renderList('toDo')}
          </div>
          <button className="btnEssential" onClick={() => handleAddTask('toDo')}>Add a task</button>
        </div>
        <div className='containerInProgress'
             id='inProgress'
             onDrop={(e) => {handleDrop(e, 'inProgress'); handleDragLeaveOrDrop(e);}}
             onDragOver={handleDragOver}
             onDragLeave={handleDragLeaveOrDrop}>
          <div className='title titleInProgress'>In progress <span>{renderCounter('inProgress')}</span></div>
          <div>
            {renderList('inProgress')}
          </div>
          <button className="btnEssential" onClick={() => handleAddTask('inProgress')}>Add a task</button>
        </div>
        <div className='containerDone'
             id='done'
             onDrop={(e) => {handleDrop(e, 'done'); handleDragLeaveOrDrop(e);}}
             onDragOver={handleDragOver}
             onDragLeave={handleDragLeaveOrDrop}>
          <div className='title titleDone'>Done <span>{renderCounter('done')}</span></div>
          <div>
            {renderList('done')}
          </div>
          <button className="btnEssential" onClick={() => handleAddTask('done')}>Add a task</button>
        </div>
      </div>
  </>
  );
}