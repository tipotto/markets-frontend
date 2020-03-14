import React from "react";
import { connect } from "react-redux";
import { reduxForm, reset } from "redux-form";
import PropTypes from "prop-types";
import { requestCreate } from "../../actions";
import FormInput from "../molecules/FormInput";

const submit = (value, dispatch, props) => {
  dispatch(requestCreate(value, props));
  // dispatch(reset(props.form));
  console.log(value);
};

const Form = props => {
  const {
    formData,
    handleSubmit,
    submitting,
    // submitSucceeded,
    pristine,
    reset,
    error
  } = props;

  console.log(props);

  let loginForm;
  if (submitting) {
    loginForm = <div className="contact-submit-message">送信しています...</div>;
  } else {
    loginForm = (
      <div className="contact-form">
        <form onSubmit={handleSubmit(submit)}>
          {formData.inputParam.map(param => {
            return FormInput(param);
          })}
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

const formOption = reduxForm({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(Form);

const formParam = (_, { form }) => ({
  form: form.name || "leetName",
  validate: form.validater,
  formData: form
});

const FormContainer = connect(formParam)(formOption);
export default FormContainer;
