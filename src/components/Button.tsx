import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import classnames from 'classnames';

const Button: React.FC<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>> = ({ children, onClick, type, className, disabled }) => {
  return (
    <button onClick={onClick} type={type} disabled={disabled} className={classnames("btn", className, { "btn-disabled": disabled })}>
      {children}
    </button>
  );
}
export default Button;
