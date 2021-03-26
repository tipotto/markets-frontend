import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const GreenRadio = withStyles({
  root: {
    color: "#57C5B6",
    "&$checked": {
      color: "#57C5B6",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const SelectOptions = ({ options }) => {
  return options.map((option) => {
    return (
      <FormControlLabel
        key={option.value}
        value={option.value}
        control={<GreenRadio />}
        label={option.label}
      />
    );
  });
};

export default SelectOptions;
