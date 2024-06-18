import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { motion } from 'framer-motion';
import './modal.css';

export default function Modal({ onClose, modalName, children }) {
    const { theme } = useTheme();

    return (
        <>
            <motion.div
                className='modal-overlay'
                onClick={onClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                <motion.div
                    className={`modal-content ${theme}`}
                    onClick={(e) => e.stopPropagation()}
                    initial={{ opacity: 0, y: 0, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
                >
                    <div className='modal-header'>
                        <h1>{modalName}</h1>
                        <button onClick={onClose} className='close-button'>&times;</button>
                    </div>
                    <div className='modal-body'>
                        {children}
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
};