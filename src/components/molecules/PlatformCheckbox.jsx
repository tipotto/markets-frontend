import React from "react";
import { withStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";

const GreenCheckbox = withStyles({
  root: {
    color: "#57C5B6",
    "&$checked": {
      color: "#57C5B6",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const PlatformCheckbox = ({
  input: { value, onChange },
  label,
  meta: { touched, error },
  row = true,
  required,
  rootClass = "",
}) => {
  // console.log('value >>>', value);
  let arr = [...value];
  const handleChange = (e) => {
    if (e.target.checked) {
      arr.push(e.target.value);
    } else {
      arr.splice(arr.indexOf(e.target.value), 1);
    }
    if (arr.length === 0) arr = "";
    return onChange(arr);
  };

  return (
    <FormControl
      classes={{ root: rootClass }}
      required={required}
      component="fieldset"
      error={!!(touched && error)}
    >
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup
        row={row}
        value={value}
        onChange={(e) => {
          handleChange(e);
        }}
      >
        <FormControlLabel
          value="mercari"
          control={<GreenCheckbox />}
          label="メルカリ"
          checked={!!arr.includes("mercari")}
        />
        <FormControlLabel
          value="rakuma"
          control={<GreenCheckbox />}
          label="ラクマ"
          checked={!!arr.includes("rakuma")}
        />
        <FormControlLabel
          value="paypay"
          control={<GreenCheckbox />}
          label="PayPayフリマ"
          checked={!!arr.includes("paypay")}
        />
      </FormGroup>
      {touched && error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default PlatformCheckbox;
