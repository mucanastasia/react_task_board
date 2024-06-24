import React from 'react';
import { useBoard } from '../../contexts/BoardContext';
import taskHelpers from '../../helpers/taskHelpers';
import { exampleTasks } from '../../helpers/exampleTasks';
import './developerToolsTaskBoard.css';
import { useTheme } from '../../contexts/ThemeContext';

export default function DeveloperToolsTaskBoard() {
    const { tasks, setTasks, currentBoardId } = useBoard();
    const { theme } = useTheme();
    const { saveTasks } = taskHelpers(tasks, setTasks, currentBoardId);

    const handleAutoFill = () => {
        const autoFillTasks = exampleTasks;
        saveTasks(autoFillTasks);
    };

    const handleDeleteAll = () => {
        saveTasks([]);
    };

    return (
        <>
            {
                tasks.length === 0
                    ? <div className={`breadcrumb-option ${theme}`} onClick={handleAutoFill}>Auto fill tasks</div>
                    : <div className={`breadcrumb-option ${theme}`} onClick={handleDeleteAll}>Delete all tasks</div>
            }
        </>
    );
};