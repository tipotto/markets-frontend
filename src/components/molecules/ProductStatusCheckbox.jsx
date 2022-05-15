import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const GreenCheckbox = withStyles({
  root: {
    color: '#57C5B6',
    '&$checked': {
      color: '#57C5B6',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const ProductStatusCheckbox = ({
  input: { value, onChange },
  label,
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
              checked={!!arr.includes('all')}
              onChange={handleChange}
              name="all"
            />
          }
          label="すべて"
        />
        <FormControlLabel
          control={
            <GreenCheckbox
              checked={!!(arr.includes('brand_new') || arr.includes('all'))}
              onChange={handleChange}
              name="brand_new"
            />
          }
          label="新品・未使用"
        />
        <FormControlLabel
          control={
            <GreenCheckbox
              checked={!!(arr.includes('almost_unused') || arr.includes('all'))}
              onChange={handleChange}
              name="almost_unused"
            />
          }
          label="未使用に近い"
        />
        <FormControlLabel
          control={
            <GreenCheckbox
              checked={
                !!(
                  arr.includes('no_scratches_or_stains') || arr.includes('all')
                )
              }
              onChange={handleChange}
              name="no_scratches_or_stains"
            />
          }
          label="目立った傷・汚れなし"
        />
        <FormControlLabel
          control={
            <GreenCheckbox
              checked={
                !!(
                  arr.includes('slight_scratches_or_stains') ||
                  arr.includes('all')
                )
              }
              onChange={handleChange}
              name="slight_scratches_or_stains"
            />
          }
          label="やや傷・汚れあり"
        />
        <FormControlLabel
          control={
            <GreenCheckbox
              checked={
                !!(
                  arr.includes('noticeable_scratches_or_stains') ||
                  arr.includes('all')
                )
              }
              onChange={handleChange}
              name="noticeable_scratches_or_stains"
            />
          }
          label="傷・汚れあり"
        />
      </FormGroup>
    </FormControl>
  );
};

export default ProductStatusCheckbox;
