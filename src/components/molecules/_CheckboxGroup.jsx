import React, { Component } from "react";
import { Field } from "redux-form";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import CheckboxOption from "./CheckboxOption";

export default class CheckboxGroup extends Component {
  renderCheckBox = ({
    option,
    input: { value, onChange },
    meta: { touched, error },
    onFieldChange,
    row = true,
    required = true,
    rootClass = "",
  }) => {
    return (
      <FormControl
        classes={{ root: rootClass }}
        required={required}
        component="fieldset"
        error={!!(touched && error)}
      >
        <FormLabel component="legend">{option.label}</FormLabel>
        <FormGroup
          row={row}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            onFieldChange && onFieldChange(e.target.value);
          }}
        >
          <CheckboxOption items={option.items} />
        </FormGroup>
        {touched && error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    );
  };

  render() {
    const name = this.props.name;
    return (
      <Field
        // インポート元で設定したpropsをrenderCheckBoxメソッドに渡す
        // ためには、以下の記述が必要。
        {...this.props}
        name={name}
        // label="チェックボックス"
        // type="checkbox"
        component={this.renderCheckBox}
        // rootClass={classes.formControl}
        required
      />
    );
  }
}
