import React from 'react';
import { useBoard } from '../../contexts/BoardContext';
import { useCurrentBoard } from '../../contexts/CurrentBoardContext';
import taskHelpers from '../../helpers/taskHelpers';
import boardHelpers from '../../helpers/boardHelpers';
import { exampleTasks, exampleBoardName } from '../../helpers/exampleTasks';
import './developerToolsTaskBoard.css';
import { useTheme } from '../../contexts/ThemeContext';

export default function DeveloperToolsTaskBoard() {
    const { tasks, setTasks, boards, setBoards, currentBoardId } = useBoard();
    const { updateBoardName } = boardHelpers(boards, setBoards);
    const { board } = useCurrentBoard();
    const { theme } = useTheme();
    const { saveTasks } = taskHelpers(tasks, setTasks, currentBoardId);

    const handleAutoFill = () => {
        const autoFillTasks = exampleTasks;
        saveTasks(autoFillTasks);
        updateBoardName(board.id, { name: exampleBoardName });
    };

    const handleDeleteAll = () => {
        saveTasks([]);
        updateBoardName(board.id, { name: 'Untitled task board' });
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