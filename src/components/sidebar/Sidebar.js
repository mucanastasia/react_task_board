import React, { useEffect, useState } from 'react';
import { useBoard } from '../../contexts/BoardContext';
import { getSidebarStatusFromLocalStorage, setSidebarStatusInLocalStorage } from '../../services/localStorageService';
import { NavLink } from 'react-router-dom';
import BoardsList from './BoardsList';
import Modal from '../modal/Modal';
import AddBoardModalContent from '../modal/AddBoardModalContent';
import './sidebar.css';
import { AnimatePresence } from 'framer-motion';

export default function Sidebar() {
    const { boards } = useBoard();
    const [isOpen, setIsOpen] = useState(getSidebarStatusFromLocalStorage);
    const [name, setName] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setSidebarStatusInLocalStorage(isOpen);
        //TODO: sidebarContext >> use isOpen to shrink a page
        // isOpen ? document.body.childNodes[3].childNodes[1].style.margin = '0 0 0 240px' : document.body.childNodes[3].childNodes[1].style.margin = '0 0 0 64px';
        isOpen ? document.body.style.margin = '0 0 0 240px' : document.body.style.margin = '0 0 0 64px';
    }, [isOpen]);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setName('');
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
                    <AnimatePresence>
                        <BoardsList isOpen={isOpen} boards={boards} />
                    </AnimatePresence>
                </div>
                <div className='lowerNav'>
                    <li onClick={handleOpenModal} >
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
            <AnimatePresence>
                {
                    showModal &&
                    <Modal key="Add_modal" show={showModal} onClose={handleCloseModal} modalName='Add a new board'>
                        <AddBoardModalContent setShow={setShowModal} name={name} setName={setName} close={handleCloseModal} />
                    </Modal>
                }
            </AnimatePresence>
        </nav>
    );
};