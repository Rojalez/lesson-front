import {useEffect} from 'react';
import {useLocalStorage} from "./useLocalStorage";


export default function useDarkMode() {
    const [theme, setTheme] = useLocalStorage("theme", "dark");
    const colorTheme = theme === 'light' ? 'dark' : 'light';
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(colorTheme);
        root.classList.add(theme);
    }, [theme, colorTheme], useLocalStorage('theme', colorTheme));
    return [colorTheme, setTheme];

}