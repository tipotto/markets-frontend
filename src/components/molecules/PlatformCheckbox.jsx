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
      arr.push(e.target.name);
    } else {
      arr.splice(arr.indexOf(e.target.name), 1);
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
      <FormGroup row>
        <FormControlLabel
          control={
            <GreenCheckbox
              checked={!!arr.includes('mercari')}
              onChange={handleChange}
              name="mercari"
            />
          }
          label="メルカリ"
        />
        <FormControlLabel
          control={
            <GreenCheckbox
              checked={!!arr.includes('rakuma')}
              onChange={handleChange}
              name="rakuma"
            />
          }
          label="ラクマ"
        />
        <FormControlLabel
          control={
            <GreenCheckbox
              checked={!!arr.includes('paypay')}
              onChange={handleChange}
              name="paypay"
            />
          }
          label="PayPayフリマ"
        />
        <FormControlLabel
          control={
            <GreenCheckbox
              checked={!!arr.includes('yahoo-auction')}
              onChange={handleChange}
              name="yahoo-auction"
            />
          }
          label="ヤフオク"
        />
        <FormControlLabel
          control={
            <GreenCheckbox
              checked={!!arr.includes('amazon')}
              onChange={handleChange}
              name="amazon"
            />
          }
          label="Amazon"
        />
        <FormControlLabel
          control={
            <GreenCheckbox
              checked={!!arr.includes('rakuten')}
              onChange={handleChange}
              name="rakuten"
            />
          }
          label="楽天"
        />
        <FormControlLabel
          control={
            <GreenCheckbox
              checked={!!arr.includes('yahoo-shopping')}
              onChange={handleChange}
              name="yahoo-shopping"
            />
          }
          label="Yahooショッピング"
        />
      </FormGroup>
      {invalid && error && <FormHelperText error>{error}</FormHelperText>}
    </FormControl>
  );
};

export default PlatformCheckbox;
