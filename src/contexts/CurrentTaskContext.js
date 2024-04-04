import React, { createContext, useContext } from 'react';

const CurrentTaskContext = createContext();

export const CurrentTaskProvider = ({ children, task }) => {
    return (
        <CurrentTaskContext.Provider value={{ task }}>
            {children}
        </CurrentTaskContext.Provider>
    );
};

export const useCurrentTask = () => useContext(CurrentTaskContext);