import React from 'react';
import { useTasks } from '../../../../TasksContext.js';
import taskHelpers from '../../../../helpers/taskHelpers.js';
import Task from './task/Task.js';

export default function ListOfTasks({ sectionId }) {
    const { tasks, setTasks } = useTasks();
    const { getFilteredAndSortedList } = taskHelpers(tasks, setTasks);

    const renderList = (sectionId) => {
        const list = getFilteredAndSortedList(sectionId)
            .map((task) => (
                <Task
                    key={task.id}
                    task={task}
                    id={task.id}
                />
            ));
        return list;
    };

    return (
        <>
            {/* {showColorGap.top && showColorGap.section === 'toDo' && <div className='colorGap' />} */}
            {renderList(sectionId)}
            {/* {showColorGap.bottom && showColorGap.section === 'toDo' && <div className='colorGap' />} */}
        </>
    );
}