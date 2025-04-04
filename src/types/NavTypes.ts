import { icons } from "lucide-react";

export interface NavCompType {
    label: string,
    href: string,
    icon: keyof typeof icons,
    highlight?: boolean,
}