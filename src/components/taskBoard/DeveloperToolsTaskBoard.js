import React from 'react';
import { useTasks } from '../../TasksContext';
import taskHelpers from '../../helpers/taskHelpers';
import { exampleTasks } from '../../helpers/exampleTasks';

export default function DeveloperToolsTaskBoard() {
    const { tasks, setTasks } = useTasks();
    const { saveTasks } = taskHelpers(tasks, setTasks);

    const handleAutoFill = () => {
        const autoFillTasks = exampleTasks;
        saveTasks(autoFillTasks);
    };

    const handleDeleteAll = () => {
        saveTasks([]);
    };

    return (
        <div className='containerButtons'>
            {
                tasks.length === 0
                    ? <button className='btnScnd autoFill' onClick={handleAutoFill}>Auto fill task board</button>
                    : <button className='btnScnd deleteAll' onClick={handleDeleteAll}>Delete all tasks</button>
            }
        </div>
    );
};