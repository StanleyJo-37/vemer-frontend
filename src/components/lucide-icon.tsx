import { icons, LucideProps } from "lucide-react";

export default function LucideIcon({ icon, ...props}: { icon: keyof typeof icons } & LucideProps) {
    const SelectedIcon = icons[icon]
    
    if (!SelectedIcon) return null;

    return (
        <SelectedIcon {...props} />
    );
}