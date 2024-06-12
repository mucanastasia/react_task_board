import React, { createContext, useState, useContext, useEffect } from 'react';
import { getSidebarStatusFromLocalStorage, setSidebarStatusInLocalStorage } from '../services/localStorageService';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(getSidebarStatusFromLocalStorage());

    useEffect(() => {
        setSidebarStatusInLocalStorage(isOpen);
    }, [isOpen]);

    return (
        <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => useContext(SidebarContext);