import React from 'react';

export default function Task({ task, updateTask, deleteTask, index }) {
    const handleNameChange = (e) => {
        updateTask(index, { ...task, name: e.target.value });
    };

    const handleDescriptionChange = (e) => {
        updateTask(index, { ...task, description: e.target.value });
    };

    const handleBlurName = () => {
        if ((task.name?.trim() || "").length > 0) {
            updateTask(index, { ...task, isEditingName: false});
        }
    };

    const handleBlurDescription = () => {
        if ((task.description?.trim() || "").length > 0) {
            updateTask(index, { ...task, isEditingDescription: false});
        }
    };

    const handleCheck = () => {
        if (!task.done) {
            updateTask(index, { ...task, done: true, status: 'done',});
        } else {
            updateTask(index, { ...task, done: false, status: 'toDo',});
        }
    };

    const handleEdit = () => {
        updateTask(index, { ...task, isEditingName: true, isEditingDescription: true});
    };

    const handleDragStart = (e, taskId) => {
        setTimeout(() => {
            e.target.classList.add('grabbing', 'taskMoving');
        }, 50);
        e.dataTransfer.setData('text/plain', taskId.toString());
    };

    const handleDragEnd = (e) => {
        e.target.classList.remove('grabbing', 'taskMoving');
        e.dataTransfer.clearData();
    };

    const handleDelete = () => {
        deleteTask(task.id);
    };

    return (
        <div className='task' draggable onDragStart={(e) => handleDragStart(e, task.id)} onDragEnd={handleDragEnd} >

            {task.isEditingName ? (
                <div className='taskTitle'>
                    <button className={`btnIco ${task.done ? 'btnDone' : 'btnCheck'}`} onClick={handleCheck} />
                    <input
                        className='name'
                        type='text'
                        value={task.name}
                        onChange={handleNameChange}
                        onBlur={handleBlurName}
                        placeholder='Add a task name here'
                        autoFocus
                    />
                    <button className='btnIco btnEdit' onClick={handleEdit} />
                    <button className='btnIco btnDelete' onClick={handleDelete}/>
                </div>
            ) : (
                <div className='taskTitle'>
                    <button className={`btnIco ${task.done ? 'btnDone' : 'btnCheck'}`} onClick={handleCheck} />
                    <h5>{task.name}</h5>
                    {/* <button className='btnIco btnStar' onClick={handleStar}/> */}
                    <button className='btnIco btnEdit' onClick={handleEdit} />
                    <button className='btnIco btnDelete' onClick={handleDelete}/>
                </div>
            )}

            {task.isEditingDescription ? (
                <input
                    className='description'
                    type='text'
                    value={task.description}
                    onChange={handleDescriptionChange}
                    onBlur={handleBlurDescription}
                    placeholder='Add a description here'
                />
            ) : (
                <p>{task.description}</p>
            )}
        </div>
    );
}