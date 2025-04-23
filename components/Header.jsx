import React, { useContext } from 'react'
import { useContext } from 'react'
import { ThemeContext } from '../contexts/themecontex'
export default function Header() {
  const [isDark, setIsDark] = useContext(ThemeContext)
  return (
    <header className={isDark ? "dark" : ""}>
      <h2>Where in the world?</h2>
      <p onClick={() => {setIsDark(!isDark)}}><i className={`fa-solid fa-${isDark ? "sun" : "moon"}`}></i> {isDark ? "Light" : "DarkMode"}</p>
    </header>
  )
}
