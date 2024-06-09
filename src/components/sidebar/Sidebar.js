import React, { useEffect, useState } from 'react';
import { useBoard } from '../../contexts/BoardContext';
import { getSidebarStatusFromLocalStorage, setSidebarStatusInLocalStorage } from '../../services/localStorageService';
import { NavLink } from 'react-router-dom';
import boardHelpers from '../../helpers/boardHelpers';
import BoardsList from './BoardsList';
import './sidebar.css';

export default function Sidebar() {
    const { boards, setBoards } = useBoard();
    const { addBoard } = boardHelpers(boards, setBoards);
    const [isOpen, setIsOpen] = useState(getSidebarStatusFromLocalStorage);

    useEffect(() => {
        setSidebarStatusInLocalStorage(isOpen);
        //TODO: sidebarContext >> use isOpen to shrink a page
        // isOpen ? document.body.childNodes[3].childNodes[1].style.margin = '0 0 0 240px' : document.body.childNodes[3].childNodes[1].style.margin = '0 0 0 64px';
        isOpen ? document.body.style.margin = '0 0 0 240px' : document.body.style.margin = '0 0 0 64px';
    }, [isOpen]);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleClick = () => {
        addBoard();
    };

    return (
        <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
            <ul>
                <div className='upperNav'>
                    <NavLink to='/' exact='true' activeclassname='active' >
                        <li className='homeNav'>
                            <span className='icon icon_home'></span>
                            {!isOpen && <span className='tooltip'>Home</span>}
                            <span className={`text ${isOpen ? 'visible' : ''}`}>Home</span>
                        </li>
                    </NavLink>
                    <NavLink to='/stats' activeclassname='active' >
                        <li>
                            <i className='icon icon_stats'></i>
                            {!isOpen && <span className='tooltip'>Statistics</span>}
                            <span className={`text ${isOpen ? 'visible' : ''}`}>Statistics</span>
                        </li>
                    </NavLink>
                    <BoardsList isOpen={isOpen} boards={boards} />
                </div>
                <div className='lowerNav'>
                    <li onClick={handleClick} >
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