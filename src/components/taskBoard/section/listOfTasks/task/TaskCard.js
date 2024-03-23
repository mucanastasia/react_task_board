import React, { useState } from 'react';
import { createDragImage } from '../../../../../helpers/dragHelpers';

export default function TaskCard({ task, handleDropOverTask, id, children }) {
    const [showColorGap, setShowColorGap] = useState({ top: false, bottom: false });

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

    const handleDrop = (e) => {
        handleDropOverTask(task.sortId, task.status, showColorGap);
        handleDragLeaveOrDrop(e);
    };

    return (
        <>
            {showColorGap.top && <div className='gap colorGap' />}
            <div className='task'
                draggable={!task.isEditingName && !task.isEditingDescription}
                onDragStart={(e) => handleDragStart(e, task.id)}
                onDragEnd={handleDragEnd}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeaveOrDrop} >

                {children}

            </div>
            {showColorGap.bottom && <div className='gap colorGap' />}
        </>
    );
}