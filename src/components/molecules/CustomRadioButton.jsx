import React from 'react';
import '../../index.css';

const CustomRadioButton = ({
  input: { value, onChange },
  name,
  label,
  options,
}) => {
  console.log('value', value);

  const handleChange = (e) => {
    console.log('event value', e.target.value);
    onChange(e.target.value);
  };

  return (
    <div class="radio-wrapper">
      <label class="radio-title">{label}</label>
      <div class="radio-container">
        {options.map((option) => (
          <span class="radio-button" key={option.value}>
            <input
              id={option.value}
              type="radio"
              name={name}
              value={option.value}
              onChange={handleChange}
              checked={value === option.value}
            />
            <label class="label" for={option.value}>
              {option.label}
            </label>
          </span>
        ))}
      </div>
    </div>
  );
};

export default CustomRadioButton;
