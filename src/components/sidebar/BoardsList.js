import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function BoardsList({ isOpen, boards }) {

    const renderBoardsList = () => {
        const boardsList = boards.map((board, index) => (
            <NavLink to={board.path} activeclassname='active' key={board.id}>
                <motion.li
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                >
                    <span className='icon icon_board'></span>
                    <span className='span_id'>{index + 1}</span>
                    {!isOpen && <span className='tooltip'>{board.name}</span>}
                    <span className={`text ${isOpen ? 'visible' : ''}`}>{board.name}</span>
                </motion.li>
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