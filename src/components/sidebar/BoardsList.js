import React from 'react';
import { Link } from 'react-router-dom';

export default function BoardsList({ isOpen }) {
    const boardsList = [
        {
            name: 'Research Project Management',
            id: '1',
            active: true,
            src: '/board_1',
        },
        {
            name: 'Task board 2',
            id: '2',
            active: false,
            src: '/board_1',
        },
        {
            name: 'Task board 3',
            id: '3',
            active: false,
            src: '/board_1',
        },
    ];

    const renderBoardsList = () => {
        const list = boardsList.map((board) => (
            <Link to={board.src}>
                <li className={`${board.active && 'active'}`} key={board.id}>
                    <span className='icon icon_board'></span>
                    <span className='span_id'>{board.id}</span>
                    {!isOpen && <span className='tooltip'>{board.name}</span>}
                    <span className={`text ${isOpen ? 'visible' : ''}`}>{board.name}</span>
                </li>
            </Link>
        ));
        return list;
    };

    return (
        <div className='boardsNav'>
            {renderBoardsList()}
        </div>
    );
};