import React, { useState } from 'react';
import { createDragImage } from '../../../../../helpers/dragHelpers';
import { useTasks } from '../../../../../contexts/TasksContext';
import { useCurrentTask } from '../../../../../contexts/CurrentTaskContext';
import { useTheme } from '../../../../../contexts/ThemeContext';
import taskHelpers from '../../../../../helpers/taskHelpers';
import TaskContent from './TaskContent';
import DropPointer from '../../../DropPointer';
import './task.css';

export default function Task() {
    const [showPointer, setShowPointer] = useState({ top: false, bottom: false });
    let sortIdAbove = 0;
    const { tasks, setTasks } = useTasks();
    const { getSortIdAbove, processDropBetween } = taskHelpers(tasks, setTasks);
    const { task } = useCurrentTask();
    const { theme } = useTheme();

    const handleDragStart = (e) => {
        setTimeout(() => {
            e.target.classList.add('grabbing', 'taskMoving');
        }, 50);
        e.dataTransfer.setData('text/plain', task.id.toString());
        createDragImage(e, theme);
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
        positionPercentage <= 50 ? setShowPointer({ top: true, bottom: false }) : setShowPointer({ top: false, bottom: true });
    };

    const handleDragLeaveOrDrop = () => {
        setShowPointer({ top: false, bottom: false });
    };

    const handleDrop = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const draggedTaskId = +e.dataTransfer.getData('text/plain');
        if (task.id !== draggedTaskId) {
            sortIdAbove = getSortIdAbove(draggedTaskId, task.sortId, task.status, showPointer);
            processDropBetween(draggedTaskId, task.status, sortIdAbove);
        }
        handleDragLeaveOrDrop();
    };

    return (
        <>
            <DropPointer show={showPointer.top} />
            <div className={`task ${theme === 'dark' ? 'dark' : 'light'}`}
                draggable={!task.isEditingName && !task.isEditingDescription}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeaveOrDrop} >

                <TaskContent />

            </div>
            <DropPointer show={showPointer.bottom} />
        </>
    );
}