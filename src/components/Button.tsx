import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import classnames from 'classnames';

interface PropTypes extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> { }

const Button: React.FC<PropTypes> = ({ children, onClick, type, className, disabled }) => {
  return (
    <button onClick={onClick} type={type} disabled={disabled} className={classnames("btn", className, { "btn-disabled": disabled })}>
      {children}
    </button>
  );
}
export default Button;
