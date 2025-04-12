"use client";

import React from "react";
import { Button } from "./ui/button";
import LoadingSpinner from "./loading-spinner";
import LucideIcon from "./lucide-icon";
import { icons } from "lucide-react";
import { cn } from "@/lib/utils";

type AnimatedButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    loading?: boolean;
    loadingNode?: React.ReactNode;
    icon?: keyof typeof icons;
};

export default function AnimatedButton({
    children,
    loading = false,
    icon,
    loadingNode = <p>Loading...</p>,
    ...props
}: AnimatedButtonProps) {
    return (
        <Button {...props} disabled={loading || props.disabled} className={cn(
            "flex items-center gap-2",
            props.className,
        )}>
            {loading ? (
                <LoadingSpinner />
            ) : icon ? (
                <LucideIcon className="w-4 h-4" icon={icon} />
            ) : null}
            {loading ? loadingNode : children}
        </Button>
    );
}
