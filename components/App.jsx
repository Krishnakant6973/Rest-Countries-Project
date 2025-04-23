import { useState } from "react"
import Header from "./Header"
import { Outlet } from "react-router"
import ThemeProvider from "../contexts/themecontex";
export default function App() {


    return (
        <ThemeProvider>
            <Header />
            <Outlet  />
        </ThemeProvider>
    )
}


