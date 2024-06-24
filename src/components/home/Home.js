import React, { useState } from 'react';
import { useBoard } from '../../contexts/BoardContext';
import { useTheme } from '../../contexts/ThemeContext';
import boardHelpers from '../../helpers/boardHelpers';
import { Link } from 'react-router-dom';
import PageTransition from '../pageTransition/PageTransition';
import Header from '../header/Header';
import './home.css';

export default function Home() {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const { boards, setBoards } = useBoard();
    const { addBoard } = boardHelpers(boards, setBoards);
    const { theme } = useTheme();

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
                    <p>{board.name}</p>
                </div>
            </Link>
        ));
        return boardsList;
    };

    //TODO: Divide into components + DARK THEME!!!

    return (
        <>
            <Header name='Welcome to the Task Board Application' />
            <PageTransition className='container-home' keyProp='home'>
                <div className='home-content'>
                    <div className='navigation'>
                        <div className={`newBoardSection ${theme}`}>
                            <h1>Add a new board</h1>
                            <div>
                                <input className={`boardName ${theme}`}
                                    type='text'
                                    value={name}
                                    onChange={handleChange}
                                    placeholder='Name your task board'
                                    autoFocus />
                                <button className={`essential ${loading && 'loading'}`} onClick={handleClick} disabled={!name?.trim().length > 0 || loading}>
                                    {loading ? <span className='spinner'></span> : 'Confirm'}</button>
                            </div>
                        </div>
                        {<div className='boardsList'>
                            <h1>Your boards</h1>
                            {boards.length > 0 ? renderBoardsList() : <p>It looks like you don't have any boards yet. Start by creating your first board!</p>}
                        </div>}
                    </div>
                    <div className='copyright'>
                        <p>© 2024 <a href='https://github.com/mucanastasia'>mucanastasia</a></p>
                    </div>
                </div>
            </PageTransition>
        </>
    );
};