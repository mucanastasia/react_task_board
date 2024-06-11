import React, { useState, useRef, useEffect } from 'react';
import Modal from '../modal/Modal';
import DeleteBoardModalContent from '../modal/DeleteBoardModal';
import DeveloperToolsTaskBoard from '../taskBoard/DeveloperToolsTaskBoard';
import { motion, AnimatePresence } from 'framer-motion';
import './breadcrumbMenu.css';

export default function BreadcrumbMenu({ board }) {
    const [showOptions, setShowOptions] = useState(false);
    const optionsRef = useRef(null);

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (showOptions) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showOptions]);

    const handleToggleOptions = () => {
        setShowOptions(!showOptions);
    };

    const handleClickOutside = (event) => {
        if (optionsRef.current && !optionsRef.current.contains(event.target)) {
            setShowOptions(false);
        }
    };

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false)
    };

    return (
        <div className='breadcrumb' onClick={handleToggleOptions} ref={optionsRef}>
            <span>...</span>
            <AnimatePresence>
                {showOptions &&
                    (<motion.div
                        className='breadcrumb-options'
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                    >
                        <DeveloperToolsTaskBoard />
                        <div className='breadcrumb-option' onClick={handleOpenModal} >Delete board</div>
                    </motion.div>)}
            </AnimatePresence>


            <AnimatePresence>
                {showModal && (
                    <Modal key='Delete_modal' show={showModal} onClose={handleCloseModal} modalName='Delete board?' >
                        <DeleteBoardModalContent setShow={setShowModal} close={handleCloseModal} />
                    </Modal>
                )}
            </AnimatePresence>
        </div>
    );
};