import React from 'react';
import './header.css';
import { ToggleTheme } from './ToggleTheme';


export default function Header() {
    return (
        <header>
            <div className='boardName'>
                <h1>Please name your task board</h1>
                <button className='btnEditBoardName' />
            </div>
            <ToggleTheme />
        </header>
    );
}