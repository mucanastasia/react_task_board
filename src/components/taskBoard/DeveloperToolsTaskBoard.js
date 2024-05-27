import React from 'react';
import { useTasks } from '../../contexts/TasksContext';
import taskHelpers from '../../helpers/taskHelpers';
import { exampleTasks, exampleBoardName } from '../../helpers/exampleTasks';
import './developerToolsTaskBoard.css';
import { useTheme } from '../../contexts/ThemeContext';
import { useBoardName } from '../../contexts/BoardNameContext';

export default function DeveloperToolsTaskBoard() {
    const { tasks, setTasks } = useTasks();
    const { theme } = useTheme();
    const { setBoardName } = useBoardName();
    const { saveTasks } = taskHelpers(tasks, setTasks);

    const handleAutoFill = () => {
        const autoFillTasks = exampleTasks;
        saveTasks(autoFillTasks);
        setBoardName(exampleBoardName);
    };

    const handleDeleteAll = () => {
        saveTasks([]);
        setBoardName({ name: 'Untitled task board', isEditing: false });
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