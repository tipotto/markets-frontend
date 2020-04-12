import React, { Component } from "react";
import { Field } from "redux-form";
import PropTypes from "prop-types";

export default class SelectboxGroup extends Component {
  static propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

  field = ({ input, meta, options, label, onFieldChange }) => {
    const { name, onChange, onBlur, onFocus } = input;
    const { touched, error } = meta;

    const checkboxes = options.map(({ label, value }, index) => {
      return <option value={value}>{label}</option>;
    });

    return (
      <div>
        <p>{label}</p>
        <select
          name={name}
          onChange={(e) => {
            onChange(e.target.value);
            onFieldChange && onFieldChange(e.target.value);
          }}
        >
          {checkboxes}
        </select>
        {touched && error && <p className="error">{error}</p>}
      </div>
    );
  };

  render() {
    return <Field {...this.props} component={this.field} />;
  }
}
