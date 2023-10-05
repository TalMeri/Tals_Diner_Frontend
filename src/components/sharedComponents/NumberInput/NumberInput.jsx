import "./NumberInput.css";
import React from "react";

const NumberInput = ({  min, max, value, onChange }) => {
  return (
    <input className="NumberInput"
    type="number"
    min={min}
    max={max}
    value={value}
    onChange={onChange}
  />
  );
};

export default NumberInput;