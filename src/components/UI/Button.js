import React from "react";

const Button = ({ color, textColor, children, cursor, ...props }) => {
    return <button {...props} className={`border-0 rounded-2xl bg-${color} text-${textColor} font-mono px-4 py-2 cursor-${cursor}`}>{children}</button>
}

export default Button;