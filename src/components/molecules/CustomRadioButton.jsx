import React from 'react';
import '../../index.css';

const CustomRadioButton = ({
  input: { name, value, onChange },
  label,
  options,
}) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="radio-wrapper">
      <label className="radio-title">{label}</label>
      <div className="radio-container">
        {options.map((option) => (
          <span className="radio-button" key={option.value}>
            <input
              id={`${name}-${option.value}`}
              type="radio"
              name={name}
              value={option.value}
              onChange={handleChange}
              checked={value === option.value}
            />
            <label className="label" htmlFor={`${name}-${option.value}`}>
              {option.label}
            </label>
          </span>
        ))}
      </div>
    </div>
  );
};

export default CustomRadioButton;
