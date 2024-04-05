import React from 'react';
import './dropPointer.css';
import { useTheme } from '../../contexts/ThemeContext';

export default function DropPointer({ show }) {
    const { theme } = useTheme();

    return (
        <>
            {show && <div className={`gap colorGap ${theme === 'dark' ? 'dark' : 'light'}`} />}
        </>
    );
}