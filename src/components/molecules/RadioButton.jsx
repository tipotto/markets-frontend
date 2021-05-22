import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import RadioGroup from '@material-ui/core/RadioGroup';

const RadioButton = ({
  input: { value, onChange },
  label,
  children,
  meta: { touched, error },
  row = true,
  required,
  rootClass = {},
}) => {
  const handleChange = (e) => onChange(e.target.value);

  return (
    <FormControl
      classes={{ root: rootClass }}
      required={required}
      component="fieldset"
      error={!!(touched && error)}
    >
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup row={row} value={value} onChange={handleChange}>
        {children}
      </RadioGroup>
      {touched && error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default RadioButton;
