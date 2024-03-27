import React, { useState } from 'react';
import { useTasks } from '../../../TasksContext.js';
import taskHelpers from '../../../helpers/taskHelpers.js';
import SectionHeader from './sectionHeader/SectionHeader.js';
import ListOfTasks from './listOfTasks/ListOfTasks.js';

export default function Section({ sectionId, name }) {
    const { tasks, setTasks } = useTasks();
    const { addTask, processDropOnSection } = taskHelpers(tasks, setTasks);
    //
    // const [showColorGap, setShowColorGap] = useState({ section: '', top: false, bottom: false, });
    //
    const [isOverContainer, setIsOverContainer] = useState({ top: false, bottom: false, section: '', });
    // const [sortIdAbove, setSortIdAbove] = useState(0);

    //TODO: rename
    const handleDragOverContainer = (e, sectionId) => {
        e.preventDefault();
        const containerRect = e.currentTarget.getBoundingClientRect();
        const isNearTop = (e.clientY - containerRect.top) < 60; // 60px from the top of the container
        //console.log(isNearTop, ' : ', e.clientY);
        if (isNearTop) {
            // setShowColorGap({ ...showColorGap, top: true, bottom: false, section: sectionId });
            setIsOverContainer({ top: true, bottom: false, section: sectionId, });
            //console.log(isOverContainer);
            return;
        }
        setIsOverContainer({ top: false, bottom: true, section: sectionId, });
        // setShowColorGap({ ...showColorGap, bottom: true, top: false, section: sectionId });
        //console.log('container ', sectionId, ':', isOverContainer);
    };

    const handleDrop = (e) => {
        console.log('Drop over a section');
        e.preventDefault();
        processDropOnSection(e, sectionId, isOverContainer);
    };

    //TODO: rename
    const handleDragLeaveContainer = () => {
        setIsOverContainer({ top: false, bottom: false, section: '', });
        // setShowColorGap({ ...showColorGap, bottom: false, top: false, section: '' });
        // console.log('container Leave:', isOverContainer);
    };

    const handleClick = () => {
        addTask(sectionId);
    };

    return (
        <div className={`container_${sectionId}`}
            onDrop={handleDrop}
            onDragOver={(e) => handleDragOverContainer(e, sectionId)} //TODO: handler
            onDragLeave={handleDragLeaveContainer}>

            <SectionHeader sectionId={sectionId} name={name} />
            <ListOfTasks sectionId={sectionId} />

            <div className='gap' />
            <button className='btnEssential' onClick={handleClick}>Add a task</button>
        </div>
    );
};