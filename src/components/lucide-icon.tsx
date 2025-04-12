"use client";

import React from "react";
import { icons, LucideProps } from "lucide-react";

export default function LucideIcon({ icon, ...props}: { icon: keyof typeof icons } & LucideProps): React.ReactNode | null {
    const SelectedIcon = icons[icon];
    
    if (!SelectedIcon) return null;

    return (
        <SelectedIcon {...props} />
    );
}