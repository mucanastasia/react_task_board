import React, { useState } from 'react';
import { useTasks } from '../../../contexts/TasksContext.js';
import { useSection } from '../../../contexts/SectionContext.js';
import taskHelpers from '../../../helpers/taskHelpers.js';
import SectionHeader from './sectionHeader/SectionHeader.js';
import TasksList from './tasksList/TasksList.js';
import DropPointer from './DropPointer.js';

export default function Section() {
    const { tasks, setTasks } = useTasks();
    const { sectionId } = useSection();
    const { addTask, processDropOnSection } = taskHelpers(tasks, setTasks);
    const [positionOverSection, setPositionOverSection] = useState({ top: false, bottom: false, sectionId: '', });

    const handleDragOver = (e) => {
        e.preventDefault();
        const containerRect = e.currentTarget.getBoundingClientRect();
        const isNearTop = (e.clientY - containerRect.top) < 60; // 60px from the top of the container
        if (isNearTop) {
            setPositionOverSection({ top: true, bottom: false, sectionId: sectionId, });
            return;
        }
        setPositionOverSection({ top: false, bottom: true, sectionId: sectionId, });
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const draggedTaskId = +e.dataTransfer.getData('text/plain');
        processDropOnSection(draggedTaskId, positionOverSection);
        handleDragLeave();
    };

    const handleDragLeave = () => {
        setPositionOverSection({ top: false, bottom: false, sectionId: '', });
    };

    const handleClick = () => {
        addTask(sectionId);
    };

    return (
        <div className={`container_${sectionId}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}>

            <SectionHeader />
            <DropPointer show={positionOverSection.top} />
            <TasksList />
            <DropPointer show={positionOverSection.bottom} />

            <div className='gap' />
            <button className='btnEssential' onClick={handleClick}>Add a task</button>
        </div>
    );
};