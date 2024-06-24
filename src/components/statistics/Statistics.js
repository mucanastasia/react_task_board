import React, { useState } from 'react';
import { useBoard } from '../../contexts/BoardContext';
import { getTasksFromLocalStorage } from '../../services/localStorageService';
import boardHelpers from '../../helpers/boardHelpers';
import Header from '../header/Header';
import PageTransition from '../pageTransition/PageTransition';
import BarChart from './BarChart';
import './statistics.css';

export default function Statistics() {
    const { boards } = useBoard();
    const [headerName, setHeaderName] = useState('of All boards');
    const [activeBoardId, setActiveBoardId] = useState('all');
    const { countTasksInBoard, countTasksInAllBoards } = boardHelpers(boards);
    const [data, setData] = useState(countTasksInAllBoards);

    const getBoardTaskCounts = (board) => {
        const boardTasks = getTasksFromLocalStorage(board.id);
        setData(countTasksInBoard(boardTasks));
        setHeaderName(`for ${board.name}`);
        setActiveBoardId(board.id);
    };

    const handleClick = () => {
        setData(countTasksInAllBoards);
        setHeaderName('for All boards');
        setActiveBoardId('all');
    };

    const renderBoardsList = () => {
        const boardsList = boards.map((board) => (
            <button className={activeBoardId === board.id ? 'active' : ''}
                key={board.id}
                onClick={() => { getBoardTaskCounts(board) }}>
                {board.name}
            </button>
        ));
        return boardsList;
    };

    //TODO: Divide into components + DARK THEME!!!

    return (
        <PageTransition keyProp='stats'>
            <Header name={`Statistics ${headerName}`} />
            <div className='container-stats-page'>
                <div className='container'>
                    <div className='boardsNavigation'>
                        <button className={activeBoardId === 'all' ? 'active' : ''}
                            onClick={handleClick}>
                            All boards
                        </button>
                        {renderBoardsList()}
                    </div>
                    <div className='container-stats'>
                        <section className='tabs'>
                            <div className='total'>
                                <p>Total tasks</p>
                                <span>{data['Total']}</span>
                            </div>
                            <div className='done'>
                                <p>Completed tasks</p>
                                <span>{data['Done']}</span>
                            </div>
                            <div className='toDo'>
                                <p>To do tasks</p>
                                <span>{data['To do']}</span>
                            </div>
                            <div className='inProgress'>
                                <p>In progress tasks</p>
                                <span>{data['In progress']}</span>
                            </div>
                        </section>
                        <section className='bar'>
                            <BarChart dataStats={data} />
                        </section>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};