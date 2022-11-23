import React from "react";
import useDarkMode from "./hooks/useDarkMode";

export default function ToggleTheme() {
    const [colorTheme, setTheme] = useDarkMode();
    return (
        <button className="border-0 cursor-pointer p-0 bg-transparent" onClick={()=> setTheme(colorTheme)}>
            {colorTheme === 'light' ?
                <i className="fas fa-sun text-lg text-yellow-400"></i>
                :
                <i className="fas fa-moon text-lg text-yellow-400"></i>
            }
        </button>
    )
}