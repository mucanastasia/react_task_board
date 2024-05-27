import React, { createContext, useContext, useEffect, useState } from 'react';
import { getBoardNameFromLocalStorage, setBoardNameInLocalStorage } from "../services/localStorageService";

const BoardNameContext = createContext();

export const BoardNameProvider = ({ children }) => {
    const [boardName, setBoardName] = useState(getBoardNameFromLocalStorage);

    useEffect(() => {
        setBoardNameInLocalStorage(boardName);
    }, [boardName]);

    return (
        <BoardNameContext.Provider value={{ boardName, setBoardName }}>
            {children}
        </BoardNameContext.Provider>
    );
};

export const useBoardName = () => useContext(BoardNameContext);