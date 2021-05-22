import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

const GreenCheckbox = withStyles({
  root: { color: '#57C5B6' },
  checked: { color: '#57C5B6' },
})((props) => <Checkbox color="default" {...props} />);

const PlatformCheckbox = ({
  input: { value, onChange },
  label,
  meta: { invalid, error },
  required,
  rootClass = {},
}) => {
  const arr = [...value];
  const handleChange = (e) => {
    if (e.target.checked) {
      arr.push(e.target.value);
    } else {
      arr.splice(arr.indexOf(e.target.value), 1);
    }
    return onChange(arr);
  };

  return (
    <FormControl
      classes={{ root: rootClass }}
      required={required}
      component="fieldset"
    >
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup row value={value} onChange={handleChange}>
        <FormControlLabel
          value="mercari"
          control={<GreenCheckbox />}
          label="メルカリ"
          checked={!!arr.includes('mercari')}
        />
        <FormControlLabel
          value="rakuma"
          control={<GreenCheckbox />}
          label="ラクマ"
          checked={!!arr.includes('rakuma')}
        />
        <FormControlLabel
          value="paypay"
          control={<GreenCheckbox />}
          label="PayPayフリマ"
          checked={!!arr.includes('paypay')}
        />
      </FormGroup>
      {invalid && error && <FormHelperText error>{error}</FormHelperText>}
    </FormControl>
  );
};

export default PlatformCheckbox;
