import { createContext } from "react";
import { useState } from "react";
export const ThemeContext = createContext()
import React from 'react'

export default function ThemeProvider({ children }) {
    const [isDark, setIsDark] = useState(JSON.parse(localStorage.getItem("isDarkMode")));
    localStorage.setItem("isDarkMode", isDark)
    return <ThemeContext.Provider value={[isDark, setIsDark]}>
            {children}
        </ThemeContext.Provider>
}
