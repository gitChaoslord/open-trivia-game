import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    onClick: React.MouseEventHandler;
    type?: string;
    addClassNames?: string;
};

const Button: React.FC<ButtonProps> = ({ children, onClick, type, addClassNames }) => {
    let color = 'indigo';
    if (type === 'error') color = 'red';
    return (
        <button onClick={onClick} className={`bg-${color}-500 hover:bg-${color}-700 focus:outline-none py-3 px-6 text-white shadow rounded ${addClassNames}`}>
            {children}
        </button>
    );
}
export default Button;
