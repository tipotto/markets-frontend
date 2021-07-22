import React from 'react';
import TextField from '@material-ui/core/TextField';

const CustomTextField = ({
  input,
  label,
  meta: { touched, invalid, error },
  type = 'text',
  required,
  rootClass = {},
}) => (
  <TextField
    required={required}
    className={rootClass}
    label={label}
    type={type}
    fullWidth
    variant="outlined"
    error={touched && invalid}
    helperText={touched && error}
    {...input}
  />
);

export default CustomTextField;
