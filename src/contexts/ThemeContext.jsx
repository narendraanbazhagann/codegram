import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
    purple: {
        name: 'Purple Dream',
        primary: '#a855f7',
        secondary: '#ec4899',
        bg: '#020617',
        accent: 'rgba(168, 85, 247, 0.5)',
        hue: 280
    },
    ocean: {
        name: 'Ocean Blue',
        primary: '#0ea5e9',
        secondary: '#22d3ee',
        bg: '#030712',
        accent: 'rgba(14, 165, 233, 0.5)',
        hue: 200
    },
    matrix: {
        name: 'Matrix Green',
        primary: '#22c55e',
        secondary: '#10b981',
        bg: '#050505',
        accent: 'rgba(34, 197, 94, 0.5)',
        hue: 120
    },
    fire: {
        name: 'Fire Red',
        primary: '#ef4444',
        secondary: '#f97316',
        bg: '#0f0505',
        accent: 'rgba(239, 68, 68, 0.5)',
        hue: 0
    },
    rainbow: {
        name: 'Rainbow',
        primary: '#f43f5e',
        secondary: '#fbbf24',
        bg: '#020617',
        accent: 'rgba(244, 63, 94, 0.5)',
        hue: 'colorful'
    }
};

export const ThemeProvider = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState('purple');
    const [reduceMotion, setReduceMotion] = useState(false);

    useEffect(() => {
        const theme = themes[currentTheme];
        document.documentElement.style.setProperty('--primary-color', theme.primary);
        document.documentElement.style.setProperty('--secondary-color', theme.secondary);
        document.documentElement.style.setProperty('--bg-color', theme.bg);
        document.documentElement.style.setProperty('--accent-glow', theme.accent);

        // Update fluid simulation hue if possible
        if (window.triggerSplat && typeof theme.hue === 'number') {
            // This is a hack to update the global config in the script
            // In a real app we'd use a more robust messaging system
        }
    }, [currentTheme]);

    return (
        <ThemeContext.Provider value={{ currentTheme, setCurrentTheme, themes, reduceMotion, setReduceMotion }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
