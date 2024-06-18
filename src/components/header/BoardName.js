import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useBoard } from '../../contexts/BoardContext';
import { useCurrentBoard } from '../../contexts/CurrentBoardContext';
import boardHelpers from '../../helpers/boardHelpers';
import './boardName.css';

export default function BoardName() {
    const { theme } = useTheme();
    const { boards, setBoards } = useBoard();
    const { updateBoardName } = boardHelpers(boards, setBoards);
    const { board } = useCurrentBoard();

    const handleBlur = (e) => {
        const name = e.target.value;
        if ((name?.trim() || '').length > 0) {
            updateBoardName(board.id, { name: name, isEditing: false });
        }
    };

    const handleKeyEnter = (e) => {
        const name = e.target.value;
        if (e.key === 'Enter' && (name?.trim() || '').length > 0) {
            updateBoardName(board.id, { name: name, isEditing: false });
        }
    };

    const handleClick = () => {
        updateBoardName(board.id, { ...board, isEditing: true });
    };

    return (
        <div className='boardName'>
            <span className={`doubleSlash ${theme}`} data-testid='double-slash' />
            {!board.isEditing && <h1 className={theme}>{board.name}</h1>}

            {board.isEditing && <input
                className={`boardName ${theme}`}
                type='text'
                defaultValue={board.name}
                onBlur={handleBlur}
                onKeyDown={handleKeyEnter}
                placeholder='Name your task board'
                autoFocus />}

            {!board.isEditing && <button className={`btnEditBoardName ${theme}`} onClick={handleClick}><span className={`tooltip ${theme}`}>Edit board name</span></button>}
        </div>
    );
}
