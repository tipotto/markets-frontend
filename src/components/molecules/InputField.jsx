import React, { Component } from "react";
import { Field } from "redux-form";
import PropTypes from "prop-types";

export default class InputFieldGroup extends Component {
  static propTypes = {
    input: PropTypes.object,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    meta: PropTypes.object,
  };

  renderField = ({
    input,
    label,
    type,
    placeholder,
    meta: { touched, error },
  }) => {
    return (
      <div>
        <p>{label}</p>
        <input
          {...input}
          placeholder={placeholder}
          type={type}
          name={input.name}
        />
        {touched && error && <p>{error}</p>}
      </div>
    );
  };

  render() {
    return <Field {...this.props} component={this.renderField} />;
  }
}
