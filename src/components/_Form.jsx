import React from "react";
import { Field, reduxForm, reset } from "redux-form";
import PropTypes from "prop-types";
import { requestCreate } from "../actions";
import { myValidation } from "./validate/login";

function submit(value, dispatch) {
  dispatch(requestCreate(value));
  dispatch(reset("login"));
}

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

const Form = props => {
  const {
    handleSubmit,
    submitting,
    // submitSucceeded,
    pristine,
    reset,
    error
  } = props;

  let loginForm;
  if (submitting) {
    loginForm = <div className="contact-submit-message">送信しています...</div>;
  } else {
    loginForm = (
      <div className="contact-form">
        <form onSubmit={handleSubmit(submit)}>
          <Field
            name="username"
            type="text"
            component={renderField}
            label="ユーザー名"
          />
          <Field
            name="password"
            type="password"
            component={renderField}
            label="パスワード"
          />
          {error && (
            <div>
              <strong>{error}</strong>
            </div>
          )}
          {submitting && (
            <div>
              <strong>submitting</strong>
            </div>
          )}
          <div>
            <button type="submit" disabled={pristine || submitting}>
              Submit
            </button>
            <button
              type="button"
              disabled={pristine || submitting}
              onClick={reset}
            >
              Clear Values
            </button>
          </div>
        </form>
      </div>
    );
  }

  return <div className="contact-form">{loginForm}</div>;
};
Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default reduxForm({
  form: "login",
  validate: myValidation
})(Form);
