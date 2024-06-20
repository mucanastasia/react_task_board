import React, { useEffect, useState } from 'react';
import { useBoard } from '../../contexts/BoardContext';
import { useTheme } from '../../contexts/ThemeContext';
import boardHelpers from '../../helpers/boardHelpers';
import { Link } from 'react-router-dom';
import PageTransition from '../pageTransition/PageTransition';
import './home.css';

export default function Home() {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const { boards, setBoards } = useBoard();
    const { addBoard } = boardHelpers(boards, setBoards);
    const { theme } = useTheme();

    useEffect(() => {
        const h2Element = document.querySelector('.textContainer');
        const h3Element = document.querySelector('.textCopyright');

        const handleTransition = () => {
            h2Element.classList.add('shrink-and-move-up');
            h3Element.classList.add('move-down');
        };

        // Trigger the transition after the initial fade-in
        setTimeout(handleTransition, 3500);
    }, []);

    const handleClick = () => {
        setLoading(true);
        addBoard(name);
        setTimeout(() => {
            setName('');
            setLoading(false);
        }, 700);
    };

    const handleChange = (e) => {
        setName(e.target.value);
    };

    const renderBoardsList = () => {
        const boardsList = boards.map((board, index) => (
            <Link to={board.path} key={board.id}>
                <div className='boardsListItem'>
                    <span className='icon icon_board'></span>
                    <span className='span_id'>{index + 1}</span>
                    <p>{board.name}</p>
                </div>
            </Link>
        ));
        return boardsList;
    };

    //TODO: Divide into components

    return (
        <PageTransition className='wave-header' keyProp='home'>
            <div className='inner-header flex'>
                <h2 className='textContainer'>Welcome to the Task Board Application</h2>
                <h3 className='textCopyright'>© 2024 <a href='https://github.com/mucanastasia'>mucanastasia</a></h3>
                <div className='navigation'>
                    <div className={`newBoardSection ${theme}`}>
                        <h5>Create a new board</h5>
                        <input className={`boardName ${theme}`}
                            type='text'
                            value={name}
                            onChange={handleChange}
                            placeholder='Name your task board'
                            autoFocus />
                        <button className={`essential ${loading && 'loading'}`} onClick={handleClick} disabled={!name?.trim().length > 0 || loading}>
                            {loading ? <span className='spinner'></span> : 'Confirm'}</button>
                    </div>
                    {boards.length > 0 && <div className='boardsList'>
                        <h5>Navigate to the existing one</h5>
                        {renderBoardsList()}
                    </div>}
                </div>
            </div>

            <div>
                <svg
                    className='waves'
                    xmlns='http://www.w3.org/2000/svg'
                    xmlnsXlink='http://www.w3.org/1999/xlink'
                    viewBox='0 24 150 28'
                    preserveAspectRatio='none'
                    shapeRendering='auto'
                >
                    <defs>
                        <path id='gentle-wave' d='M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z' />
                    </defs>
                    <g className='parallax'>
                        <use xlinkHref='#gentle-wave' x='48' y='0' fill='rgba(255,255,255,0.5)' />
                        <use xlinkHref='#gentle-wave' x='48' y='3' fill='rgba(255,255,255,0.3)' />
                        <use xlinkHref='#gentle-wave' x='48' y='5' fill='rgba(255,255,255,0.1)' />
                        <use xlinkHref='#gentle-wave' x='48' y='7' fill='rgba(255,255,255,0.7)' />
                    </g>
                </svg>
            </div>
        </PageTransition>
    );
};