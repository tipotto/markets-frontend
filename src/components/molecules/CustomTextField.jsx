import React from 'react';
import TextField from '@material-ui/core/TextField';

const CustomTextField = ({
  input,
  label,
  meta: { touched, invalid, error },
  type = 'text',
  required,
  rootClass = '',
  // subClass = "",
}) => (
  <TextField
    required={required}
    // classes={{ root: [rootClass, subClass].join(" ") }}
    classes={{ root: rootClass }}
    // error={!!(touched && error)}
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
