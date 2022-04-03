import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick: React.MouseEventHandler;
  type?: 'submit' | 'button';
  className?: string;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, onClick, type, className, disabled }) => {
  return (
    <button onClick={onClick} type={type ? type : 'button'} disabled={disabled} className={`btn ${className}`}>
      {children}
    </button>
  );
}
export default Button;
