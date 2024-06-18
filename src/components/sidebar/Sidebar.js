import React, { useState } from 'react';
import { useBoard } from '../../contexts/BoardContext';
import { useSidebar } from '../../contexts/SidebarContext';
import { useTheme } from '../../contexts/ThemeContext';
import { NavLink } from 'react-router-dom';
import BoardsList from './BoardsList';
import Modal from '../modal/Modal';
import AddBoardModalContent from '../modal/AddBoardModalContent';
import './sidebar.css';
import { AnimatePresence, motion } from 'framer-motion';

export default function Sidebar() {
    const { boards } = useBoard();
    const { isOpen, setIsOpen } = useSidebar();
    const { theme } = useTheme();
    const [name, setName] = useState('');
    const [showModal, setShowModal] = useState(false);

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
        <motion.nav className={`sidebar ${isOpen ? 'open' : ''}`}
            key='sidebar'
            initial={false}
            animate={{ width: isOpen ? 240 : 64 }}
            transition={{ type: "linear", duration: 0.25 }}
        >
            <ul>
                <div className='upperNav'>
                    <NavLink to='/' exact='true' activeclassname='active' >
                        <li className='homeNav'>
                            <span className='icon icon_home'></span>
                            {!isOpen && <span className={`tooltip ${theme}`}>Home</span>}
                            <span className={`text ${isOpen ? 'visible' : ''}`}>Home</span>
                        </li>
                    </NavLink>
                    <NavLink to='/stats' activeclassname='active' >
                        <li>
                            <i className='icon icon_stats'></i>
                            {!isOpen && <span className={`tooltip ${theme}`}>Statistics</span>}
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
                        {!isOpen && <span className={`tooltip ${theme}`}>Add a board</span>}
                        <span className={`text ${isOpen ? 'visible' : ''}`}>Add a board</span>
                    </li>
                    <li onClick={toggleSidebar} className='sidebar_toggle'>
                        <span className={`icon icon_${isOpen ? 'close' : 'open'}`} />
                        {!isOpen && <span className={`tooltip ${theme}`}>Open sidebar</span>}
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
        </motion.nav>
    );
};