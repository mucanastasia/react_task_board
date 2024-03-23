import React from "react";
import { useTasks } from "../../../../TasksContext";
import taskHelper from "../../../../helpers/taskHelpers";

export default function Container({ sectionId, setIsOverContainer, processDrop, children }) {
    const { tasks, setTasks } = useTasks();
    const { addTask } = taskHelper(tasks, setTasks);

    const handleDragOverContainer = (e, sectionId) => {
        e.preventDefault();
        const containerRect = e.currentTarget.getBoundingClientRect();
        const isNearTop = (e.clientY - containerRect.top) < 60; // 60px from the top of the container
        //console.log(isNearTop, ' : ', e.clientY);
        if (isNearTop) {
            // setShowColorGap({ ...showColorGap, top: true, bottom: false, section: sectionId });
            setIsOverContainer({ yes: false, section: '', });
            //console.log(isOverContainer);
            return;
        }
        setIsOverContainer({ yes: true, section: sectionId, });
        // setShowColorGap({ ...showColorGap, bottom: true, top: false, section: sectionId });
        //console.log('container ', sectionId, ':', isOverContainer);
    };

    const handleDragLeaveContainer = () => {
        setIsOverContainer({ yes: false, section: '', });
        // setShowColorGap({ ...showColorGap, bottom: false, top: false, section: '' });
        // console.log('container Leave:', isOverContainer);
    };

    return (
        <div className={`container_${sectionId}`}
            onDrop={(e) => { processDrop(e, sectionId) }}
            onDragOver={(e) => handleDragOverContainer(e, sectionId)}
            onDragLeave={handleDragLeaveContainer}>

            {children}

            <div className='gap' />
            <button className='btnEssential' onClick={() => addTask(sectionId)}>Add a task</button>
        </div>
    );
};