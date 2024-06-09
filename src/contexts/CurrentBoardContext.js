import React, { createContext, useContext } from 'react';

const CurrentBoardContext = createContext();

export const CurrentBoardProvider = ({ children, board }) => {
    return (
        <CurrentBoardContext.Provider value={{ board }}>
            {children}
        </CurrentBoardContext.Provider>
    );
};

export const useCurrentBoard = () => useContext(CurrentBoardContext);