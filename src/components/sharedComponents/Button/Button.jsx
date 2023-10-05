import "./Button.css";
import React from "react";

const Button = ({ label, onClick, disabled, width, height }) => {
  return (
    <button className="button" onClick={onClick} disabled={disabled} style={{width:width, height:height}}>
      {label}
    </button>
  );
};

export default Button;