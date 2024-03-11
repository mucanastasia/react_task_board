import React, { useState } from 'react';

export default function Task({ task, updateTask, handleDelete, handleDropOverTask, id, sortId }) {
    const handleNameChange = (e) => {
        updateTask(id, { ...task, name: e.target.value });
    };

    const handleDescriptionChange = (e) => {
        updateTask(id, { ...task, description: e.target.value });
    };

    const handleBlurName = () => {
        if ((task.name?.trim() || '').length > 0) {
            updateTask(id, { ...task, isEditingName: false });
        }
    };

    const handleBlurDescription = () => {
        if ((task.description?.trim() || '').length > 0) {
            updateTask(id, { ...task, isEditingDescription: false });
        }
    };

    const handleKeyEnterName = (e) => {
        if (e.key === 'Enter' && (task.name?.trim() || '').length > 0) {
            updateTask(id, { ...task, isEditingName: false });
        }
    };

    const handleKeyEnterDescription = (e) => {
        if (e.key === 'Enter' && (task.description?.trim() || '').length > 0) {
            updateTask(id, { ...task, isEditingDescription: false });
        }
    };
    // TODO: Change the logic for (un)/checking the task. Should become the last in the list.
    const handleCheck = () => {
        if (!task.done) {
            updateTask(id, { ...task, done: true, status: 'done', });
        } else {
            updateTask(id, { ...task, done: false, status: 'toDo', });
        }
    };

    const handleEdit = () => {
        updateTask(id, { ...task, isEditingName: true, isEditingDescription: true });
    };

    const handleDragStart = (e, taskId) => {
        setTimeout(() => {
            e.target.classList.add('grabbing', 'taskMoving');
        }, 50);
        e.dataTransfer.setData('text/plain', taskId.toString());
        console.log('Task that im dragging {taskId}: ', taskId);
    };

    const handleDragEnd = (e) => {
        e.target.classList.remove('grabbing', 'taskMoving');
        e.dataTransfer.clearData();
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setShowColorGap(true);
    };

    const handleDragLeaveOrDrop = (e) => {
        setShowColorGap(false);
    };

    const [showColorGap, setShowColorGap] = useState(false);

    return (
        <>
            <div className='task'
                draggable
                onDragStart={(e) => handleDragStart(e, task.id)}
                onDragEnd={handleDragEnd}
                onDrop={(e) => { handleDropOverTask(task.sortId); handleDragLeaveOrDrop(e); }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeaveOrDrop} >

                {task.isEditingName ? (
                    <div className='taskTitle'>
                        <button className={`btnIco ${task.done ? 'btnDone' : 'btnCheck'}`} onClick={handleCheck} />
                        <input
                            className='name'
                            type='text'
                            value={task.name}
                            onChange={handleNameChange}
                            onBlur={handleBlurName}
                            onKeyDown={handleKeyEnterName}
                            placeholder='Add a task name here'
                            autoFocus
                        />
                        <button className='btnIco btnEdit' onClick={handleEdit} />
                        <button className='btnIco btnDelete' onClick={() => handleDelete(task.id)} />
                    </div>
                ) : (
                    <div className='taskTitle'>
                        <button className={`btnIco ${task.done ? 'btnDone' : 'btnCheck'}`} onClick={handleCheck} />
                        <h5>{task.name}</h5>
                        {/* NOTE: note sure about pin-feature >,>
                        <button className='btnIco btnStar' onClick={handleStar}/> */}
                        <button className='btnIco btnEdit' onClick={handleEdit} />
                        <button className='btnIco btnDelete' onClick={() => handleDelete(task.id)} />
                    </div>
                )}

                {task.isEditingDescription ? (
                    <input
                        className='description'
                        type='text'
                        value={task.description}
                        onChange={handleDescriptionChange}
                        onBlur={handleBlurDescription}
                        onKeyDown={handleKeyEnterDescription}
                        placeholder='Add a description here'
                    />
                ) : (
                    <p>{task.description}</p>
                )}
            </div>
            {showColorGap && <div className='gap colorGap' />}
        </>
    );
}