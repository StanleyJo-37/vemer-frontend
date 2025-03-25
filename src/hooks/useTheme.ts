export default function useTheme() {
    let theme: "light" | "dark" = localStorage.getItem('theme') as "light" | "dark"; // light / dark

    if (!theme) { // if not set yet
        localStorage.setItem('theme', 'light'); // default will be light
        theme = 'light';
    }

    return {
        theme,
    };
}