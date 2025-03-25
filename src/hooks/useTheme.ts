export default function useTheme() {
    let theme: "light" | "dark" = localStorage.getItem('theme') as "light" | "dark"; // light / dark

    if (!theme) {
        localStorage.setItem('theme', 'light');
        theme = 'light';
    }

    return {
        theme,
    };
}