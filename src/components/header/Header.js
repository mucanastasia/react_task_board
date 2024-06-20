import React from 'react';
import './header.css';
import { useTheme } from '../../contexts/ThemeContext';
import ToggleTheme from './ToggleTheme';


export default function Header({ name }) {
    const { theme } = useTheme();

    return (
        <header className={theme}>
            <div className='headerName'>
                <span className={`doubleSlash ${theme}`} data-testid='double-slash' />
                <h1 className={theme}>{name}</h1>
            </div>
            <ToggleTheme />
        </header>
    );
}