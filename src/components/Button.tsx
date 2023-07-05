import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import classnames from 'classnames';

const Button: React.FC<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>> = ({ children, disabled, type = 'button', className, ...props }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={classnames("btn", className, { "btn-disabled": disabled })} {...props}
    >
      {children}
    </button>
  );
}
export default Button;
