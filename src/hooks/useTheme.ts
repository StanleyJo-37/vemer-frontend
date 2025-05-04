"use client";

import { defaultTheme, themes } from "@/constants/theme";
import { useEffect, useState } from "react";

export default function useTheme() {
    const [theme, setTheme] = useState<themes>(defaultTheme);

    useEffect(() => {
        const currTheme = localStorage.getItem("theme") as themes | null;

        const initialTheme = currTheme || "light";
        document.documentElement.classList.toggle("dark", initialTheme === "dark");

        if (!currTheme) {
            localStorage.setItem("theme", initialTheme);
        }
        setTheme(initialTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme: "dark" | "light" = theme === "dark" ? "light" : "dark";

        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
    }

    return {
        theme,
        toggleTheme,
    };
}