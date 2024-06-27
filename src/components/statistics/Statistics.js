import React, { useState } from 'react';
import { useBoard } from '../../contexts/BoardContext';
import { getTasksFromLocalStorage } from '../../services/localStorageService';
import { useTheme } from '../../contexts/ThemeContext';
import boardHelpers from '../../helpers/boardHelpers';
import Header from '../header/Header';
import PageTransition from '../pageTransition/PageTransition';
import BarChart from './BarChart';
import './statistics.css';

export default function Statistics() {
    const { boards } = useBoard();
    const { theme } = useTheme();
    const { countTasksInBoard, countTasksInAllBoards } = boardHelpers(boards);
    const [activeBoard, setActiveBoard] = useState({
        id: 'all',
        name: 'for All boards',
        data: countTasksInAllBoards(),
    });

    const getBoardTaskCounts = (board) => {
        const boardTasks = getTasksFromLocalStorage(board.id);
        setActiveBoard({
            id: board.id,
            name: `for ${board.name}`,
            data: countTasksInBoard(boardTasks),
        });
    };

    const handleClick = () => {
        setActiveBoard({
            id: 'all',
            name: 'for All boards',
            data: countTasksInAllBoards(),
        });
    };

    const renderBoardsList = () => {
        const boardsList = boards.map((board) => (
            <button className={activeBoard.id === board.id ? 'active' : ''}
                key={board.id}
                onClick={() => { getBoardTaskCounts(board) }}>
                {board.name}
            </button>
        ));
        return boardsList;
    };

    //TODO: Divide into components

    return (
        <PageTransition keyProp='stats'>
            <Header name={`Statistics ${activeBoard.name}`} />
            <div className='container-stats-page'>
                <div className='container'>
                    <div className={`boardsNavigation ${theme}`}>
                        <button className={activeBoard.id === 'all' ? 'active' : ''}
                            onClick={handleClick}>
                            All boards
                        </button>
                        {renderBoardsList()}
                    </div>
                    <div className='container-stats'>
                        <section className={`tabs ${theme}`}>
                            <div className='total'>
                                <p>Total tasks</p>
                                <span>{activeBoard.data['Total']}</span>
                            </div>
                            <div className='done'>
                                <p>Completed tasks</p>
                                <span>{activeBoard.data['Done']}</span>
                            </div>
                            <div className='toDo'>
                                <p>To do tasks</p>
                                <span>{activeBoard.data['To do']}</span>
                            </div>
                            <div className='inProgress'>
                                <p>In progress tasks</p>
                                <span>{activeBoard.data['In progress']}</span>
                            </div>
                        </section>
                        <section className='bar'>
                            <BarChart dataStats={activeBoard.data} theme={theme} />
                        </section>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};