import React from 'react';
import { useTasks } from '../../../../TasksContext.js';
import taskHelpers from '../../../../helpers/taskHelpers.js';
import Task from './task/Task.js';

export default function ListOfTasks({ sectionId }) {
    const { tasks, setTasks } = useTasks();
    const { getSectionTasks } = taskHelpers(tasks, setTasks);

    const renderList = (sectionId) => {
        const list = getSectionTasks(sectionId)
            .map((task) => (
                <Task
                    key={task.id}
                    task={task}
                />
            ));
        return list;
    };

    return (
        <>
            {renderList(sectionId)}
        </>
    );
}