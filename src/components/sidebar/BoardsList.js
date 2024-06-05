import React from 'react';

export default function BoardsList({ isOpen }) {
    const boardsList = [
        {
            name: 'Research Project Management',
            id: '1',
            active: true,
        },
        {
            name: 'Task board 2',
            id: '2',
            active: false,
        },
        {
            name: 'Task board 3',
            id: '3',
            active: false,
        },
    ];

    const renderBoardsList = () => {
        const list = boardsList.map((board) => (
            <li className={`${board.active && 'active'}`} key={board.id}>
                <span className='icon icon_board'></span>
                <span className='span_id'>{board.id}</span>
                {!isOpen && <span className='tooltip'>{board.name}</span>}
                <span className={`text ${isOpen ? 'visible' : ''}`}>{board.name}</span>
            </li>
        ));
        return list;
    };

    return (
        <div className='boardsNav'>
            {renderBoardsList()}
        </div>
    );
};