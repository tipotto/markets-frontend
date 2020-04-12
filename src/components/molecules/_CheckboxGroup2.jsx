import React, { Component } from "react";
import { Field } from "redux-form";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import CheckboxOption from "./CheckboxOption";

export default class CheckboxGroup extends Component {
  renderCheckBox = ({
    options,
    input: { value, onChange },
    // label,
    // children,
    meta: { touched, error },
    onFieldChange,
    row = true,
    required = true,
    rootClass = ""
  }) => {
    const checkboxes = options.map(option => {
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
            onChange={e => {
              onChange(e.target.value);
              onFieldChange && onFieldChange(e.target.value);
            }}
          >
            <CheckboxOption options={option} />
          </FormGroup>
          {touched && error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
      );
    });

    return <div>{checkboxes}</div>;
  };

  render() {
    const name = this.props.name;
    console.log("options: " + this.props.options);

    return (
      <Field
        // インポート元で設定したpropsをrenderCheckBoxメソッドに渡す
        // ためには、以下の記述が必要。
        {...this.props}
        // TODO 汎用性を持たせるために、部品ごとに異なるname属性を渡す方法を検討する。
        // Fieldタグ内で渡す必要がある。(renderCheckBoxメソッド内では認識されない。)
        // name="platform"
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
