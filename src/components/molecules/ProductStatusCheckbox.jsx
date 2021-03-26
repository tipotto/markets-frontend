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

const ProductStatusCheckbox = ({
  input: { value, onChange },
  label,
  meta: { touched, error },
  row = true,
  required,
  rootClass = "",
}) => {
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
          value="all"
          control={<GreenCheckbox />}
          label="すべて"
          checked={!!arr.includes("all")}
        />
        <FormControlLabel
          value="brand_new"
          control={<GreenCheckbox />}
          label="新品・未使用"
          checked={!!(arr.includes("brand_new") || arr.includes("all"))}
        />
        <FormControlLabel
          value="almost_unused"
          control={<GreenCheckbox />}
          label="未使用に近い"
          checked={!!(arr.includes("almost_unused") || arr.includes("all"))}
        />
        <FormControlLabel
          value="no_scratches_or_stains"
          control={<GreenCheckbox />}
          label="目立った傷・汚れなし"
          checked={
            !!(arr.includes("no_scratches_or_stains") || arr.includes("all"))
          }
        />
        <FormControlLabel
          value="slight_scratches_or_stains"
          control={<GreenCheckbox />}
          label="やや傷・汚れあり"
          checked={
            !!(
              arr.includes("slight_scratches_or_stains") || arr.includes("all")
            )
          }
        />
        <FormControlLabel
          value="noticeable_scratches_or_stains"
          control={<GreenCheckbox />}
          label="目立つ傷・汚れあり"
          checked={
            !!(
              arr.includes("noticeable_scratches_or_stains") ||
              arr.includes("all")
            )
          }
        />
      </FormGroup>
      {touched && error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default ProductStatusCheckbox;
