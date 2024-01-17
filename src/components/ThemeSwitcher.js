import { useState, useEffect } from 'react';
import {DarkModeSwitch} from "react-toggle-dark-mode";

function ThemeSwitcher() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const rootElement = document.documentElement;
    const isDarkMode = theme === 'dark';

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        rootElement.classList.toggle('dark', newTheme === 'dark');
    };

    useEffect(() => {
        rootElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    return (
        <>
            <DarkModeSwitch
                style={{}}
                checked={isDarkMode}
                onChange={toggleTheme}
                size={20}
                moonColor={'#a3a3a3'}
                sunColor={'#ca8a04'}
            />
        </>
    );
}

export default ThemeSwitcher;