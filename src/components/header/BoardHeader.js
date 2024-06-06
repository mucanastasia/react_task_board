import React from 'react';
import './header.css';
import { useTheme } from '../../contexts/ThemeContext';
import ToggleTheme from './ToggleTheme';
import BoardName from './BoardName';


export default function BoardHeader() {
    const { theme } = useTheme();

    return (
        <header className={theme}>
            <BoardName />
            <ToggleTheme />
        </header>
    );
}