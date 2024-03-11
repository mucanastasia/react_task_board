import React, { useState, useEffect } from 'react';
import Task from './task/Task';

export default function TaskBoard() {
  const [tasks, setTasks] = useState([]);
  const [showColorGap, setShowColorGap] = useState({ section: '', top: false, bottom: false, });
  const [isOverContainer, setIsOverContainer] = useState({ status: false, section: '', });
  let sortIdAbove = 0;

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('storedTasks') || '[]');
    setTasks(storedTasks);
  }, []);

  const handleAddTask = (sectionId) => {
    const newTask = {
      id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
      sortId: tasks.length > 0 ? (tasks[tasks.length - 1].id + 1) * 1000000 : 1000000,
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
    const filteredUpdatedTasks = updatedTasks.filter((task) => (task.name?.trim() || '').length > 0 && (task.description?.trim() || '').length > 0);
    localStorage.setItem('storedTasks', JSON.stringify(filteredUpdatedTasks));
  };

  const handleDelete = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem('storedTasks', JSON.stringify(updatedTasks));
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
          id={task.id}
          sortId={task.sortId}
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
  const handleDropOverTask = (sortId) => {
    console.log('Task, where the task were droped {sortId}: ', sortId);
    sortIdAbove = sortId;
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
    setIsOverContainer({ status: true, section: sectionId, });
    setShowColorGap({ ...showColorGap, bottom: true, top: false, section: sectionId });
    console.log('container ', sectionId, ':', isOverContainer);
  };

  const handleDragLeaveContainer = () => {
    setIsOverContainer({ status: false, section: '', });
    setShowColorGap({ ...showColorGap, bottom: false, top: false, section: '' });
    console.log('container Leave:', isOverContainer);
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    console.log('transferData', +taskId);
    let sortIdBelow = 0;
    const tasksBelow = tasks.filter((task) => task.status === newStatus && task.sortId > sortIdAbove)
      .sort((a, b) => a.sortId - b.sortId);

    if (isOverContainer.status && isOverContainer.section === newStatus && sortIdAbove === 0) {
      sortIdBelow = tasksBelow.length > 0 ? tasksBelow[tasksBelow.length - 1].sortId * 2 + 2000000 : 2000000;
    } else {
      sortIdBelow = tasksBelow.length > 0 ? tasksBelow.at(0).sortId : sortIdAbove + 2000000;
    }

    console.log('sortIdBelow', sortIdBelow);
    console.log('sortIdAbove', sortIdAbove);

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
    localStorage.setItem('storedTasks', JSON.stringify(updatedTasks));
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


          <div>
            {showColorGap.top && showColorGap.section === 'toDo' && <div className='colorGap' />}
            {renderList('toDo')}
            {showColorGap.bottom && showColorGap.section === 'toDo' && <div className='colorGap' />}
          </div>
          <div className='gap' />
          <button className="btnEssential" onClick={() => handleAddTask('toDo')}>Add a task</button>
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
          <div>
            {showColorGap.top && showColorGap.section === 'inProgress' && <div className='colorGap' />}
            {renderList('inProgress')}
            {showColorGap.bottom && showColorGap.section === 'inProgress' && <div className='colorGap' />}
          </div>
          <div className='gap' />
          <button className="btnEssential" onClick={() => handleAddTask('inProgress')}>Add a task</button>
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
          <div>
            {showColorGap.top && showColorGap.section === 'done' && <div className='colorGap' />}
            {renderList('done')}
            {showColorGap.bottom && showColorGap.section === 'done' && <div className='colorGap' />}
          </div>
          <div className='gap' />
          <button className="btnEssential" onClick={() => handleAddTask('done')}>Add a task</button>
        </div>
      </div>
    </>
  );
}