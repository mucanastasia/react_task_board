import React, { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { getBoardNameFromLocalStorage, setBoardNameInLocalStorage } from "../../services/localStorageService";
import './boardName.css';

export default function BoardName() {
    const { theme } = useTheme();
    const [boardName, setBoardName] = useState(getBoardNameFromLocalStorage);

    useEffect(() => {
        setBoardNameInLocalStorage(boardName);
    }, [boardName]);

    const handleBlur = (e) => {
        const name = e.target.value;
        if ((name?.trim() || '').length > 0) {
            setBoardName({ name: name, isEditing: false });
        }
    };

    const handleKeyEnter = (e) => {
        const name = e.target.value;
        if (e.key === 'Enter' && (name?.trim() || '').length > 0) {
            setBoardName({ name: name, isEditing: false });
        }
    };

    const handleClick = () => {
        setBoardName({ ...boardName, isEditing: true });
    };

    return (
        <div className='boardName'>
            <span className={`boardName ${theme}`} />
            {!boardName.isEditing && <h1 className={theme}>{boardName.name}</h1>}

            {boardName.isEditing && <input
                className={`boardName ${theme}`}
                type='text'
                defaultValue={boardName.name}
                onBlur={handleBlur}
                onKeyDown={handleKeyEnter}
                placeholder='Name your task board'
                autoFocus />}


            {!boardName.isEditing && <button className={`btnEditBoardName ${theme}`} onClick={handleClick} />}
        </div>
    );
}
