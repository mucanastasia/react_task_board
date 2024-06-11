import React, { useState } from "react";
import { useBoard } from "../../contexts/BoardContext";
import { useNavigate } from 'react-router-dom';
import boardHelpers from '../../helpers/boardHelpers';
import './modalContent.css';

export default function DeleteBoardModalContent({ setShow }) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { boards, setBoards, currentBoardId } = useBoard();
    const { deleteBoard } = boardHelpers(boards, setBoards);

    const handleClick = () => {
        setLoading(true);
        setTimeout(() => {
            deleteBoard(currentBoardId);
            navigate('/');
            setShow(false);
            setLoading(false);
        }, 700);
    };

    return (
        <>
            <p>Are you sure you want to delete this board?</p>
            <button className='deleteButton' onClick={handleClick} disabled={loading}>
                {loading ? <span className='spinner'></span> : 'Yes, delete'}</button>
        </>
    );
};