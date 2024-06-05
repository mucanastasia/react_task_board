import React, { useEffect, useState } from 'react';
import './sidebar.css';
import BoardsList from './BoardsList';

export default function Sidebar() {
    const storedIsOpen = localStorage.getItem('isSidebarOpen');
    const initialIsOpen = storedIsOpen ? JSON.parse(storedIsOpen) : false;
    const [isOpen, setIsOpen] = useState(initialIsOpen);

    useEffect(() => {
        localStorage.setItem('isSidebarOpen', JSON.stringify(isOpen));
        isOpen ? document.body.style.margin = '0 0 0 240px' : document.body.style.margin = '0 0 0 64px';
    }, [isOpen]);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
            <ul>
                <div className='upperNav'>
                    <li className='homeNav'>
                        <span className='icon icon_home'></span>
                        {!isOpen && <span className='tooltip'>Home</span>}
                        <span className={`text ${isOpen ? 'visible' : ''}`}>Home</span>
                    </li>
                    <li>
                        <i className='icon icon_stats'></i>
                        {!isOpen && <span className='tooltip'>Statistics</span>}
                        <span className={`text ${isOpen ? 'visible' : ''}`}>Statistics</span>
                    </li>
                    <BoardsList isOpen={isOpen} />
                </div>
                <div className='lowerNav'>
                    <li>
                        <span className='icon icon_add_board'></span>
                        {!isOpen && <span className='tooltip'>Add a board</span>}
                        <span className={`text ${isOpen ? 'visible' : ''}`}>Add a board</span>
                    </li>
                    <li onClick={toggleSidebar} className='sidebar_toggle'>
                        <span className={`icon icon_${isOpen ? 'close' : 'open'}`} />
                        {!isOpen && <span className='tooltip'>Open sidebar</span>}
                        <span className={`text ${isOpen ? 'visible' : ''}`}>Close sidebar</span>
                    </li>
                </div>
            </ul>
        </nav>
    );
};



// const navItems = [{
//     name: 'home',
//     icon: 'home'
// },
// {
//     name: 'statistics',
//     icon: 'stats'
// },
// {
//     name: 'research project management',
//     icon: 'board'
// },
// {
//     name: 'board number 2',
//     icon: 'board'
// },
// {
//     name: 'board number 3',
//     icon: 'board'
// },
// {
//     name: 'add a board',
//     icon: 'add_board'
// },
// ];