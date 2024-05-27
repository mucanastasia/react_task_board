import React, { createContext, useContext, useEffect, useState } from 'react';
import { getThemeFromLocalStorage, setThemeInLocalStorage } from '../services/localStorageService';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(getThemeFromLocalStorage);

    useEffect(() => {
        setThemeInLocalStorage(theme);
        document.body.className = theme;
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);