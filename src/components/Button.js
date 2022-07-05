import React from "react";
import "./Button.css";

const Button = ({ className, value, onClick }) => {
  return (
    <button className={className} onClick={onClick} data-testid={`btn${value}`}>
      {value}
    </button>
  );
};

export default Button;
