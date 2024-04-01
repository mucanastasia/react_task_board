import React, { useState } from 'react';
import { createDragImage } from '../../../../../helpers/dragHelpers';
import { useTasks } from '../../../../../TasksContext';
import taskHelpers from '../../../../../helpers/taskHelpers';
import TaskContent from './TaskContent';
import DropPointer from '../../DropPointer';

export default function Task({ task, id }) {
    const [showColorGap, setShowColorGap] = useState({ top: false, bottom: false });
    let sortIdAbove = 0;
    const { tasks, setTasks } = useTasks();
    const { getSortIdAbove, processDropBetween } = taskHelpers(tasks, setTasks);

    const handleDragStart = (e) => {
        setTimeout(() => {
            e.target.classList.add('grabbing', 'taskMoving');
        }, 50);
        e.dataTransfer.setData('text/plain', task.id.toString());
        // console.log('Task that im dragging {taskId}: ', task.id);
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

    const handleDragLeaveOrDrop = () => {
        setShowColorGap({ top: false, bottom: false });
    };

    const handleDrop = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const draggedTaskId = +e.dataTransfer.getData('text/plain');
        if (task.id !== draggedTaskId) {
            sortIdAbove = getSortIdAbove(draggedTaskId, task.sortId, task.status, showColorGap);
            processDropBetween(draggedTaskId, task.status, sortIdAbove);
        }
        handleDragLeaveOrDrop();
    };

    return (
        <>
            <DropPointer show={showColorGap.top} />
            <div className='task'
                draggable={!task.isEditingName && !task.isEditingDescription}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeaveOrDrop} >

                <TaskContent task={task} id={id} />

            </div>
            <DropPointer show={showColorGap.bottom} />
        </>
    );
}