import React from 'react';
import TextField from '@material-ui/core/TextField';

const Selectbox = ({
  input,
  label,
  children,
  meta: { touched, invalid, error },
  required,
  rootClass = '',
}) => {
  const { value } = input;

  return (
    <TextField
      required={required}
      classes={{ root: rootClass }}
      select
      label={label}
      fullWidth
      variant="outlined"
      value={value}
      error={touched && invalid}
      helperText={touched && error}
      {...input}
    >
      {children}
    </TextField>
  );
};

export default Selectbox;
