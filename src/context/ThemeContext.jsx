'use client';

import {useState, useEffect, createContext} from 'react';
export const ThemeContext = createContext()

export const ThemeProvider = ({initialTheme, children}) => {
    const [theme, setTheme] = useState('light');

    const rawSetTheme = (theme) => {
        const root = window.document.documentElement;
        const isDark  = theme === 'dark';

        root.classList.remove(isDark ? 'light' : 'dark');
        root.classList.add(theme);

        localStorage.setItem('color-theme', theme)
    }
    useEffect (() => {
        rawSetTheme(theme)
    }, [theme])
    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'))
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}