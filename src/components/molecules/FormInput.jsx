import React from "react";
import { Field } from "redux-form";
import PropTypes from "prop-types";

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <p>{label}</p>
    <input {...input} placeholder={label} type={type} />
    {touched && error && <p>{error}</p>}
  </div>
);
renderField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.object
};

const FormInput = inputParam => {
  return (
    <Field
      name={inputParam.NAME_ATTR}
      type={inputParam.TYPE}
      component={renderField}
      label={inputParam.LABEL}
    />
  );
};

export default FormInput;
