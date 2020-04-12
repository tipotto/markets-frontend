import React, { Component } from "react";
import { Field } from "redux-form";
import PropTypes from "prop-types";

export default class CheckboxGroup extends Component {
  static propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

  field = ({ input, meta, options, label }) => {
    const { name, onChange, onBlur, onFocus } = input;
    const { touched, error } = meta;
    const inputValue = input.value;
    console.log("inputValue: " + inputValue);

    const arr = [...inputValue];
    console.log("arr: " + arr);

    const handleChange = (e) => {
      if (e.target.checked) {
        arr.push(e.target.value);
      } else {
        arr.splice(arr.indexOf(e.target.value), 1);
      }
      onBlur(arr);
      return onChange(arr);
    };

    const checkboxes = options.map(({ label, value }, index) => {
      // const handleChange = (event) => {
      //   const arr = [...inputValue];
      //   if (event.target.checked) {
      //     arr.push(value);
      //   } else {
      //     arr.splice(arr.indexOf(value), 1);
      //   }
      //   onBlur(arr);
      //   return onChange(arr);
      // };

      return (
        <label key={`checkbox-${index}`}>
          <span>{label}</span>
          <input
            type="checkbox"
            name={`${name}[${index}]`}
            value={value}
            checked={arr.includes(value)}
            onChange={handleChange}
            onFocus={onFocus}
          />
        </label>
      );
    });

    return (
      <div>
        <p>{label}</p>
        <div>{checkboxes}</div>
        {touched && error && <p className="error">{error}</p>}
      </div>
    );
  };

  render() {
    return <Field {...this.props} type="checkbox" component={this.field} />;
  }
}
