import React, { createContext, useContext, useState } from 'react'

const ThemeContext = createContext<any>(null)

export default function ThemeProvider({ children }: any) {
    const [isLight, setIsLight] = useState(true)

    return (
        <ThemeContext.Provider value={{ isLight, setIsLight }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    return useContext(ThemeContext)
}
