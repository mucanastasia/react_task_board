import React, { useState, useEffect } from 'react';
import { getTasksFromLocalstorage, updateLocalstorage } from '../../services/localStorageService';
import Task from './task/Task';
import DeveloperToolsTaskBoard from './DeveloperToolsTaskBoard';

export default function TaskBoard() {
  const [tasks, setTasks] = useState([]);
  const [showColorGap, setShowColorGap] = useState({ section: '', top: false, bottom: false, });
  const [isOverContainer, setIsOverContainer] = useState({ yes: false, section: '', });
  let sortIdAbove = 0;

  useEffect(() => {
    const storedTasks = getTasksFromLocalstorage('storedTasks');
    setTasks(storedTasks);
  }, []);

  const handleAddTask = (sectionId) => {
    const filteredAndSortedList = tasks.filter((task) => task.status === sectionId).sort((a, b) => a.sortId - b.sortId);
    const newTask = {
      id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
      sortId: tasks.length > 0 ? filteredAndSortedList.at([filteredAndSortedList.length - 1]).sortId + 1000000 : 1000000,
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
    const updatedTasks = tasks.map(task => task.id === taskId ? { ...task, ...updatedTaskData } : task);
    setTasks(updatedTasks);
    updateLocalstorage('storedTasks', updatedTasks);
  };

  const handleDelete = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    updateLocalstorage('storedTasks', updatedTasks);
  };

  const handleCheck = (taskId, sectionId) => {
    let lastSortId = 0;
    let newStatus = '';
    (sectionId === 'inProgress' || sectionId === 'toDo') ? newStatus = 'done' : newStatus = 'toDo';
    const filteredAndSortedList = tasks.filter((task) => task.status === newStatus).sort((a, b) => a.sortId - b.sortId);
    lastSortId = filteredAndSortedList.length > 0 ? filteredAndSortedList.at([filteredAndSortedList.length - 1]).sortId : 0;
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId && !task.done) {
        return { ...task, done: true, status: 'done', sortId: lastSortId + 1000000, };
      } else if (task.id === taskId && task.done) {
        return { ...task, done: false, status: 'toDo', sortId: lastSortId + 1000000, };
      }
      return task;
    });
    setTasks(updatedTasks);
    updateLocalstorage('storedTasks', updatedTasks);
  };

  const renderList = (sectionId) => {
    const list = tasks.filter((task) => task.status === sectionId)
      .sort((a, b) => a.sortId - b.sortId)
      .map((task) => (
        <Task
          key={task.id}
          task={task}
          updateTask={updateTask}
          handleDelete={handleDelete}
          handleCheck={handleCheck}
          id={task.id}
          handleDropOverTask={handleDropOverTask}
        />
      ));
    return list;
  };

  const renderCounter = (sectionId) => {
    let counter = 0;
    const filteredTasks = tasks.filter((task) => task.name && task.description && task.status === sectionId);
    counter = filteredTasks.length;
    return counter;
  };
  const handleDropOverTask = (overSortId, sectionId, position) => {
    //console.log('Task, where the task were droped {sortId}: ', overSortId);
    if (position.bottom && !position.top) {
      sortIdAbove = overSortId;
      //console.log('bottom');
    } else if (position.top && !position.bottom) {
      const tasksAbove = tasks.filter((task) => task.status === sectionId && task.sortId < overSortId)
        .sort((a, b) => a.sortId - b.sortId);
      //console.log(tasksAbove);
      sortIdAbove = tasksAbove.length > 0 ? tasksAbove.at([tasksAbove.length - 1]).sortId : 0;
      //console.log('top');
    }
    //console.log(sortIdAbove);
  };

  const handleDragOver = (e, sectionId) => {
    e.preventDefault();
    e.stopPropagation();
    setShowColorGap({ ...showColorGap, top: true, bottom: false, section: sectionId });
  };

  const handleDragLeaveOrDrop = () => {
    setShowColorGap({ ...showColorGap, top: false, bottom: false, section: '' });
  };

  const handleDragOverContainer = (e, sectionId) => {
    e.preventDefault();
    const containerRect = e.currentTarget.getBoundingClientRect();
    const isNearTop = (e.clientY - containerRect.top) < 60; // 60px from the top of the container
    //console.log(isNearTop, ' : ', e.clientY);
    if (isNearTop) {
      setShowColorGap({ ...showColorGap, top: true, bottom: false, section: sectionId });
      setIsOverContainer({ yes: false, section: '', });
      //console.log(isOverContainer);
      return;
    }
    setIsOverContainer({ yes: true, section: sectionId, });
    setShowColorGap({ ...showColorGap, bottom: true, top: false, section: sectionId });
    //console.log('container ', sectionId, ':', isOverContainer);
  };

  const handleDragLeaveContainer = () => {
    setIsOverContainer({ yes: false, section: '', });
    setShowColorGap({ ...showColorGap, bottom: false, top: false, section: '' });
    // console.log('container Leave:', isOverContainer);
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    let sortIdBelow = 0;
    const tasksBelow = tasks.filter((task) => task.status === newStatus && task.sortId > sortIdAbove)
      .sort((a, b) => a.sortId - b.sortId);

    if (isOverContainer.yes && isOverContainer.section === newStatus && sortIdAbove === 0) {
      sortIdBelow = tasksBelow.length > 0 ? tasksBelow[tasksBelow.length - 1].sortId * 2 + 2000000 : 2000000;
    } else {
      sortIdBelow = tasksBelow.length > 0 ? tasksBelow.at(0).sortId : sortIdAbove + 2000000;
    }
    const updatedTasks = tasks.map((task) => {
      if (task.id === +taskId) {
        if (sortIdAbove === task.sortId && task.status === newStatus) {
          return task;
        } else {
          return { ...task, sortId: (sortIdAbove + sortIdBelow) / 2, status: newStatus, done: newStatus === 'done' };
        }
      }
      return task;
    });
    setTasks(updatedTasks);
    updateLocalstorage('storedTasks', updatedTasks);
  };

  return (
    <>
      <div className='container'>
        {/*TODO: Extract to a component and pass only sectionId and name */}

        <div className='containerToDo'
          id='toDo'
          onDrop={(e) => { handleDrop(e, 'toDo'); handleDragLeaveContainer(); }}
          onDragOver={(e) => handleDragOverContainer(e, 'toDo')}
          onDragLeave={handleDragLeaveContainer}>
          <div className='title titleToDo'
            onDrop={(e) => { handleDrop(e, 'toDo'); handleDragLeaveOrDrop(); }}
            onDragOver={(e) => handleDragOver(e, 'toDo')}
            onDragLeave={handleDragLeaveOrDrop} >To do <span>{renderCounter('toDo')}</span></div>
          <div onDragOver={(e) => e.stopPropagation()}>
            {showColorGap.top && showColorGap.section === 'toDo' && <div className='colorGap' />}
            {renderList('toDo')}
            {showColorGap.bottom && showColorGap.section === 'toDo' && <div className='colorGap' />}
          </div>
          <div className='gap' />
          <button className='btnEssential' onClick={() => handleAddTask('toDo')}>Add a task</button>
        </div>
        <div className='containerInProgress'
          id='inProgress'
          onDrop={(e) => { handleDrop(e, 'inProgress'); handleDragLeaveContainer(); }}
          onDragOver={(e) => handleDragOverContainer(e, 'inProgress')}
          onDragLeave={handleDragLeaveContainer}>
          <div className='title titleInProgress'
            onDrop={(e) => { handleDrop(e, 'inProgress'); handleDragLeaveOrDrop(); }}
            onDragOver={(e) => handleDragOver(e, 'inProgress')}
            onDragLeave={handleDragLeaveOrDrop}>In progress <span>{renderCounter('inProgress')}</span></div>
          <div onDragOver={(e) => e.stopPropagation()}>
            {showColorGap.top && showColorGap.section === 'inProgress' && <div className='colorGap' />}
            {renderList('inProgress')}
            {showColorGap.bottom && showColorGap.section === 'inProgress' && <div className='colorGap' />}
          </div>
          <div className='gap' />
          <button className='btnEssential' onClick={() => handleAddTask('inProgress')}>Add a task</button>
        </div>
        <div className='containerDone'
          id='done'
          onDrop={(e) => { handleDrop(e, 'done'); handleDragLeaveContainer(); }}
          onDragOver={(e) => handleDragOverContainer(e, 'done')}
          onDragLeave={handleDragLeaveContainer}>
          <div className='title titleDone'
            onDrop={(e) => { handleDrop(e, 'done'); handleDragLeaveOrDrop(); }}
            onDragOver={(e) => handleDragOver(e, 'done')}
            onDragLeave={handleDragLeaveOrDrop}>Done <span>{renderCounter('done')}</span></div>
          <div onDragOver={(e) => e.stopPropagation()}>
            {showColorGap.top && showColorGap.section === 'done' && <div className='colorGap' />}
            {renderList('done')}
            {showColorGap.bottom && showColorGap.section === 'done' && <div className='colorGap' />}
          </div>
          <div className='gap' />
          <button className='btnEssential' onClick={() => handleAddTask('done')}>Add a task</button>
        </div>
      </div>
      <DeveloperToolsTaskBoard tasks={tasks} setTasks={setTasks} />
    </>
  );
}