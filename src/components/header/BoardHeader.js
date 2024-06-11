import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import ToggleTheme from './ToggleTheme';
import BoardName from './BoardName';
import './header.css';
import BreadcrumbMenu from './BreadcrumbMenu';

export default function BoardHeader({ board }) {
    const { theme } = useTheme();

    return (
        <header className={theme}>
            <BoardName />
            <div className='board-header-container'>
                <BreadcrumbMenu />
                <ToggleTheme />
            </div>
        </header>
    );
}