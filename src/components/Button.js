import React from 'react';
import './Button.css';

const Button = ({ className, value, onClick, disabled }) => {
  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
      data-testid={`btn${value}`}
    >
      {value}
    </button>
  );
};

export default Button;
