import React, { useState } from "react";
import { useBoard } from "../../contexts/BoardContext";
import { useNavigate } from 'react-router-dom';
import boardHelpers from '../../helpers/boardHelpers';
import './modalContent.css';

export default function AddBoardModalContent({ setShow, name, setName }) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { boards, setBoards } = useBoard();
    const { addBoard } = boardHelpers(boards, setBoards);

    const handleClick = () => {
        setLoading(true);
        const newBoard = addBoard(name);
        console.log(newBoard.path);
        setTimeout(() => {
            navigate(newBoard.path);
            setName('');
            setShow(false);
            setLoading(false);
        }, 700);
    };

    const handleChange = (e) => {
        setName(e.target.value);
    };

    return (
        <>
            <input className='boardName light'
                // className={`boardName ${theme}`}
                type='text'
                defaultValue={name}
                onChange={handleChange}
                placeholder='Name your task board'
                autoFocus />
            <button className={`essential ${loading && 'loading'}`} onClick={handleClick} disabled={!name?.trim().length > 0 || loading}>
                {loading ? <span className='spinner'></span> : 'Confirm'}</button>
        </>
    );
};