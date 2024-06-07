import React from 'react';
import { NavLink } from 'react-router-dom';

export default function BoardsList({ isOpen }) {
    const boardsList = [
        {
            name: 'Research Project Management',
            id: '1',
            active: true,
            src: './board_1',
        },
        {
            name: 'Task board 2',
            id: '2',
            active: false,
            src: './board_2',
        },
        {
            name: 'Task board 3',
            id: '3',
            active: false,
            src: './board_3',
        },
    ];

    const renderBoardsList = () => {
        const list = boardsList.map((board) => (
            <NavLink to={board.src} activeclassname='active' key={board.id}>
                <li>
                    <span className='icon icon_board'></span>
                    <span className='span_id'>{board.id}</span>
                    {!isOpen && <span className='tooltip'>{board.name}</span>}
                    <span className={`text ${isOpen ? 'visible' : ''}`}>{board.name}</span>
                </li>
            </NavLink>
        ));
        return list;
    };

    return (
        <div className='boardsNav'>
            {renderBoardsList()}
        </div>
    );
};