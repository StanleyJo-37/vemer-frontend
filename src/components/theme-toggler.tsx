"use client";

import useTheme from "@/hooks/useTheme";
import { Switch } from "./ui/switch";

export default function ThemeToggler() {
    const { theme, toggleTheme } = useTheme();

    return (
        <Switch
            checked={theme === "light"}
            onCheckedChange={toggleTheme}
        />
    );
}