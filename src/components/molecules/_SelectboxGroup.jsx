import React, { Component } from "react";
import { Field } from "redux-form";
import TextField from "@material-ui/core/TextField";
import SelectboxOption from "./SelectboxOption";
import MenuItem from "@material-ui/core/MenuItem";

export default class SelectboxGroup extends Component {
  renderSelect = ({
    option,
    input: { value, onChange },
    // label,
    children,
    meta: { touched, error },
    onFieldChange,
    required = false,
    rootClass = "",
  }) => (
    <div>
      <p>{option.label}</p>
      <select
        name="platform"
        onChange={(e) => {
          onChange(e.target.value);
          onFieldChange && onFieldChange(e.target.value);
        }}
      >
        {children}
      </select>
    </div>

    // <TextField
    //   required={required}
    //   classes={{ root: rootClass }}
    //   select
    //   label={option.label}
    //   variant="outlined"
    //   value={value}
    //   onChange={(e) => {
    //     onChange(e.target.value);
    //     onFieldChange && onFieldChange(e.target.value);
    //   }}
    //   helperText={touched && error}
    // >
    /* <SelectboxOption items={option.items} /> */

    // </TextField>
  );

  renderOptions = (items) => {
    const selectOption = items.map(({ label, value }, index) => {
      return <MenuItem value={value}>{label}</MenuItem>;
    });

    return <div>{selectOption}</div>;
  };

  render() {
    return <Field {...this.props} component={this.field} />;
  }
}
