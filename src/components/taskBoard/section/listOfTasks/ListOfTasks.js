import React from 'react';
import { useTasks } from '../../../../TasksContext';
// import taskHelper from '../../../../helpers/taskHelper';
import Task from './task/Task.js';

export default function ListOfTasks({ sectionId, sortIdAbove }) {
    const { tasks } = useTasks();
    // const { updateTask, deleteTask } = taskHelper(tasks, setTasks);

    const handleDropOverTask = (overSortId, sectionId, position) => {
        //console.log('Task, where the task were droped {sortId}: ', overSortId);
        if (position.bottom && !position.top) {
            sortIdAbove = overSortId;
            //console.log('bottom');
        } else if (position.top && !position.bottom) {
            const tasksAbove = tasks.filter((task) => task.status === sectionId && task.sortId < overSortId)
                .sort((a, b) => a.sortId - b.sortId);
            //console.log(tasksAbove);
            sortIdAbove = tasksAbove.length > 0 ? tasksAbove.at([tasksAbove.length - 1]).sortId : 0;
            //console.log('top');
        }
        //console.log(sortIdAbove);
    };

    const renderList = (sectionId) => {
        const list = tasks.filter((task) => task.status === sectionId)
            .sort((a, b) => a.sortId - b.sortId)
            .map((task) => (
                <Task
                    key={task.id}
                    task={task}
                    id={task.id}
                    handleDropOverTask={handleDropOverTask}
                />
            ));
        return list;
    };

    return (
        <div onDragOver={(e) => e.stopPropagation()}>
            {/* {showColorGap.top && showColorGap.section === 'toDo' && <div className='colorGap' />} */}
            {renderList(sectionId)}
            {/* {showColorGap.bottom && showColorGap.section === 'toDo' && <div className='colorGap' />} */}
        </div>
    );
}