import React from 'react';
import { NavLink } from 'react-router-dom';

export default function BoardsList({ isOpen, boards }) {

    const renderBoardsList = () => {
        const boardsList = boards.map((board, index) => (
            <NavLink to={board.path} activeclassname='active' key={board.id}>
                <li>
                    <span className='icon icon_board'></span>
                    <span className='span_id'>{index + 1}</span>
                    {!isOpen && <span className='tooltip'>{board.name}</span>}
                    <span className={`text ${isOpen ? 'visible' : ''}`}>{board.name}</span>
                </li>
            </NavLink>
        ));
        return boardsList;
    };

    return (
        <div className='boardsNav'>
            {renderBoardsList()}
        </div>
    );
};