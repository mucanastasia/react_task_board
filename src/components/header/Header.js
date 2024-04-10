import React from 'react';
import './header.css';
import { useTheme } from '../../contexts/ThemeContext';
import { ToggleTheme } from './ToggleTheme';


export default function Header() {
    const { theme } = useTheme();

    return (
        <header className={theme}>
            <div className='boardName'>
                <h1 className={theme}>Please name your task board</h1>
                <button className={`btnEditBoardName ${theme}`} />
            </div>
            <ToggleTheme />
        </header>
    );
}