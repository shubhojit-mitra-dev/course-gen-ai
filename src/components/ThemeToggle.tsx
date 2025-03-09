"use client"

import React, { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [isDarkMode, setIsDarkMode] = useState(false)

    useEffect(() => {
        setIsDarkMode(theme === "dark")
    }, [theme])

    const toggleTheme = () => {
        if (isDarkMode) {
            setTheme("light")
        } else {
            setTheme("dark")
        }
        setIsDarkMode(!isDarkMode)
    }

    return (
        <Button variant="outline" size="icon" onClick={toggleTheme}>
            {isDarkMode ? (
                <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
            ) : (
                <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}