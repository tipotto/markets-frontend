import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';

const RadioButton = ({
  input: { value, onChange },
  label,
  name,
  children,
  required,
  rootClass = {},
}) => {
  const handleChange = (e) => onChange(e.target.value);

  return (
    <FormControl
      classes={{ root: rootClass }}
      required={required}
      component="fieldset"
    >
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup
        row
        aria-label={name}
        name={name}
        value={value}
        onChange={handleChange}
      >
        {children}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButton;
