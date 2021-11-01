import React, { FC, MouseEventHandler } from 'react';

interface ButtonProps {
    children: React.ReactNode;
    onClick: MouseEventHandler;
    type?: string;
    addClassNames?: string;
};

const Button: FC<ButtonProps> = ({ children, onClick, type, addClassNames }) => {
    let color = 'purple';
    if (type === 'error') color = 'red';
    return (
        <button onClick={onClick} className={`bg-${color}-500 hover: bg-${color}-700 focus:outline-none py-3 px-6 text-white shadow rounded ${addClassNames}`}>
            {children}
        </button>
    );
}
export default Button;
