import React, { useState } from 'react';

export default function Task({ task, updateTask, handleCheck, handleDelete, handleDropOverTask, id }) {
    const [showColorGap, setShowColorGap] = useState({ top: false, bottom: false });

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

    const handleEdit = () => {
        updateTask(id, { ...task, isEditingName: true, isEditingDescription: true });
    };

    const createDragImage = (e) => {
        // Styles for the custom ghost drag image
        const dragImage = e.target.cloneNode(true);
        dragImage.style.width = `${e.target.offsetWidth}px`;
        dragImage.style.height = `${e.target.offsetHeight}px`;
        dragImage.style.backgroundColor = 'rgb(255, 255, 255, 0.7)';
        dragImage.style.color = 'rgb(0, 0, 0, 0.5)';
        dragImage.style.position = 'absolute';
        dragImage.style.border = '1px dashed #dddddd';
        dragImage.style.top = '-99999px';
        dragImage.firstElementChild.style.opacity = '0.5';
        document.body.appendChild(dragImage);
        const rect = e.target.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;
        e.dataTransfer.setDragImage(dragImage, offsetX, offsetY);
        // Removing the clone image
        setTimeout(() => document.body.removeChild(dragImage), 0);
    };

    const handleDragStart = (e, taskId) => {
        setTimeout(() => {
            e.target.classList.add('grabbing', 'taskMoving');
        }, 50);
        e.dataTransfer.setData('text/plain', taskId.toString());
        //console.log('Task that im dragging {taskId}: ', taskId);
        createDragImage(e);
    };

    const handleDragEnd = (e) => {
        e.target.classList.remove('grabbing', 'taskMoving');
        e.dataTransfer.clearData();
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const containerRect = e.currentTarget.getBoundingClientRect();
        const positionPercentage = ((e.clientY - containerRect.top) / containerRect.height) * 100;
        positionPercentage <= 50 ? setShowColorGap({ top: true, bottom: false }) : setShowColorGap({ top: false, bottom: true });
    };

    const handleDragLeaveOrDrop = (e) => {
        setShowColorGap({ top: false, bottom: false });
    };

    return (
        <>
            {showColorGap.top && <div className='gap colorGap' />}
            <div className='task'
                draggable={!task.isEditingName && !task.isEditingDescription}
                onDragStart={(e) => handleDragStart(e, task.id)}
                onDragEnd={handleDragEnd}
                onDrop={(e) => { handleDropOverTask(task.sortId, task.status, showColorGap); handleDragLeaveOrDrop(e); }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeaveOrDrop} >

                {task.isEditingName ? (
                    <div className='taskTitle'>
                        <button className={`btnIco ${task.done ? 'btnDone' : 'btnCheck'}`} onClick={() => handleCheck(task.id, task.status)} />
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
                        <button className={`btnIco ${task.done ? 'btnDone' : 'btnCheck'}`} onClick={() => handleCheck(task.id, task.status)} />
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
            {showColorGap.bottom && <div className='gap colorGap' />}
        </>
    );
}