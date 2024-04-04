import React, { createContext, useContext } from 'react';

const SectionContext = createContext({ sectionId: '', name: '' });

export const SectionProvider = ({ children, sectionId, name }) => {
    return (
        <SectionContext.Provider value={{ sectionId, name }}>
            {children}
        </SectionContext.Provider>
    );
};

export const useSection = () => useContext(SectionContext);