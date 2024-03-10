import React, { useState, useEffect } from 'react';
import Task from './task/Task';

export default function TaskBoard() {
  const [tasks, setTasks] = useState([]);
  let taskBelow = 0;

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

  const handleDelete = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem('taskList', JSON.stringify(updatedTasks));
  };

  const handleDropOverTask = (taskId) => {
    console.log('Task, where the task were droped: ', taskId);
    taskBelow = taskId;
  };

  const renderList = (sectionId) => {
    const list = tasks.filter((task) => task.status === sectionId).sort((a, b) => a.id - b.id).map((task) => (
      <Task key = {task.id} task={task} updateTask = {updateTask} handleDelete={handleDelete} index = {task.id} handleDropOverTask={handleDropOverTask} />
    ));
    return list;
  };

  const renderCounter = (sectionId) => {
    let counter = 0;
    const filteredTasks = tasks.filter((task) => task.name && task.description && task.status === sectionId);
    counter = filteredTasks.length;
    return counter;
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    console.log(taskBelow);
    const updatedTasks = tasks.map((task) => {
      // Change the logic for updating task.id
      // refactoring...
      if (task.id === +taskId && taskBelow > 0 && taskBelow !== task.id) {
        return { ...task, id: taskBelow + 10, status: newStatus, done: newStatus === 'done' };
      }
      if (task.id === +taskId && taskBelow === 0) {
        return { ...task, id: tasks[tasks.length-1].id + 10, status: newStatus, done: newStatus === 'done' };
      }
      if (task.id === +taskId && taskBelow === task.id) {
        return { ...task, status: newStatus, done: newStatus === 'done' };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem('taskList', JSON.stringify(updatedTasks));
  };

  return (
    <>
      <div className='container'>
        <div className='containerToDo'
             id='toDo'
             onDrop={(e) => handleDrop(e, 'toDo')}>
          <div className='title titleToDo'>To do <span>{renderCounter('toDo')}</span></div>
          <div>
            {renderList('toDo')}
          </div>
          <div className='gap'/>
          <button className="btnEssential" onClick={() => handleAddTask('toDo')}>Add a task</button>
        </div>
        <div className='containerInProgress'
             id='inProgress'
             onDrop={(e) => handleDrop(e, 'inProgress')}>
          <div className='title titleInProgress'>In progress <span>{renderCounter('inProgress')}</span></div>
          <div>
            {renderList('inProgress')}
          </div>
          <div className='gap'/>
          <button className="btnEssential" onClick={() => handleAddTask('inProgress')}>Add a task</button>
        </div>
        <div className='containerDone'
             id='done'
             onDrop={(e) => handleDrop(e, 'done')}>
          <div className='title titleDone'>Done <span>{renderCounter('done')}</span></div>
          <div>
            {renderList('done')}
          </div>
          <div className='gap'/>
          <button className="btnEssential" onClick={() => handleAddTask('done')}>Add a task</button>
        </div>
      </div>
  </>
  );
}