"use client";

import LucideIcon from "./lucide-icon";
import Link from "next/link";
import { NavCompType } from "@/types/NavTypes";
import { cn } from "@/lib/utils";
import navs from "@/constants/main-nav";
import { usePathname } from "next/navigation";
import useTheme from "@/hooks/useTheme";
import { Switch } from "./ui/switch";
import { useEffect, useState } from "react";
import ThemeToggler from "./theme-toggler";

function NavComp({
    label,
    href,
    icon,
    highlight,
    active,
}: NavCompType & { active: boolean }) {

    return (
        <Link
            href={href}
            className={cn(
                "relative flex flex-row space-x-4 text-xl items-center",
                highlight && "bg-green-400 hover:bg-green-400/50 p-2 rounded-lg",
                highlight ? "" : active ? "after:w-full" : "after:w-0 hover:after:w-full",
                !highlight && "after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-green-400/50 after:transition-all after:duration-300"
            )}
        >
            <LucideIcon icon={icon} />
            <div>{label}</div>
        </Link>
    );
}

export default function Navbar() {
    const pathname = usePathname();

    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, []); 

    return (
        <nav
            className={cn(
                "md:flex md:flex-row md:justify-between md:items-center md:w-screen md:px-12 md:py-8 sticky top-0",
                isScrolled ? "bg-background/95 backdrop-blur-sm shadow-sm py-2" : "bg-background py-4",
            )}
        >
            <Link href="/">
                LOGO
            </Link>
            <div className="flex flex-row w-fit justify-center items-center space-x-24">
                {navs.map(nav => <NavComp key={nav.href} {...nav} active={pathname === nav.href} />)}
            </div>
            <ThemeToggler />
        </nav>
    );
}