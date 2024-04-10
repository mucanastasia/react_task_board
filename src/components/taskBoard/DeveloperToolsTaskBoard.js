import React from 'react';
import { useTasks } from '../../contexts/TasksContext';
import taskHelpers from '../../helpers/taskHelpers';
import { exampleTasks } from '../../helpers/exampleTasks';
import './developerToolsTaskBoard.css';
import { useTheme } from '../../contexts/ThemeContext';

export default function DeveloperToolsTaskBoard() {
    const { tasks, setTasks } = useTasks();
    const { theme } = useTheme();
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
                    ? <button className={`btnSecond autoFill ${theme}`} onClick={handleAutoFill}>Auto fill task board</button>
                    : <button className={`btnSecond deleteAll ${theme}`} onClick={handleDeleteAll}>Delete all tasks</button>
            }
        </div>
    );
};