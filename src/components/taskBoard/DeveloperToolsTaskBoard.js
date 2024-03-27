import React from 'react';
import { useTasks } from '../../TasksContext';
import { updateLocalstorage } from '../../services/localStorageService';
import { exampleTasks } from '../../helpers/exampleTasks';

export default function DeveloperToolsTaskBoard() {
    const { tasks, setTasks } = useTasks();

    const handleAutoFillTasks = () => {
        const autoFillTasks = exampleTasks;
        setTasks(autoFillTasks);
        updateLocalstorage(autoFillTasks);
    };

    const handleDeleteAll = () => {
        setTasks([]);
        updateLocalstorage([]);
    };

    return (
        <div className='containerButtons'>
            {
                tasks.length === 0
                    ? <button className='btnScnd autoFill' onClick={handleAutoFillTasks}>Auto fill task board</button>
                    : <button className='btnScnd deleteAll' onClick={handleDeleteAll}>Delete all tasks</button>
            }
        </div>
    );
};