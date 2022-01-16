import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    onClick: React.MouseEventHandler;
    type?: 'submit' | 'button';
    addClassNames?: string;
    disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, onClick, type, addClassNames, disabled }) => {
    return (
        <button onClick={onClick} type={type ? type : 'button'} disabled={disabled} className={`btn ${addClassNames}`}>
            {children}
        </button>
    );
}
export default Button;
