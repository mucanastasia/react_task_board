import React, { createContext, useContext, useState, useEffect } from 'react';
import { getBoardsFromLocalStorage, getTasksFromLocalStorage } from "../services/localStorageService";

const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
    const [boards, setBoards] = useState([]);
    const [currentBoardId, setCurrentBoardId] = useState(null);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const storedBoards = getBoardsFromLocalStorage();
        setBoards(storedBoards);
    }, []);

    useEffect(() => {
        if (currentBoardId) {
            const boardTasks = getTasksFromLocalStorage(currentBoardId);
            setTasks(boardTasks);
            console.log(currentBoardId);
        }
    }, [currentBoardId]);

    return (
        <BoardContext.Provider
            value={{
                boards,
                setBoards,
                currentBoardId,
                setCurrentBoardId,
                tasks,
                setTasks
            }}
        >
            {children}
        </BoardContext.Provider>
    );
};

export const useBoard = () => useContext(BoardContext);