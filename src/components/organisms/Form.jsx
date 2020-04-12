import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import PropTypes from "prop-types";
import {
  requestFetch,
  requestSearch,
  requestCreate,
  requestDelete,
} from "../../actions";
import InputFieldGroup from "../molecules/InputField";
import CheckboxGroup from "../molecules/Checkbox";
import SelectboxGroup from "../molecules/Selectbox";
import RadioButtonGroup from "../molecules/RadioButton";
import FormName from "../../constants/FormName";

const { CREATE_USER, LOGIN, ADD_ITEM, SEARCH } = FormName;

// const submit = (value, dispatch, props) => {
//   console.log("formValue: " + value);

//   switch (props.form) {
//     case CREATE_USER:
//     case ADD_ITEM:
//       // dispatch(requestCreate(value, props));
//       console.log("作成リクエストを実行しました。");
//       break;

//     case LOGIN:
//       console.log("ログインリクエストを実行しました。");
//       break;

//     case SEARCH:
//       dispatch(requestSearch(value, props));
//       console.log("検索リクエストを実行しました。");
//       break;

//     default:
//       console.log("リクエストは不正です。");
//       break;
//   }
// };

const submit = (value, dispatch, props) => {
  dispatch(requestSearch(value, props));
  console.log("検索リクエストを実行。(Form.jsx)");
};

const Form = (props) => {
  const {
    formData,
    handleSubmit,
    submitting,
    // submitSucceeded,
    pristine,
    reset,
    error,
    // classes
  } = props;

  console.log(props);

  let loginForm;
  if (submitting) {
    loginForm = <div className="contact-submit-message">送信しています...</div>;
  } else {
    loginForm = (
      <div className="contact-form">
        <form onSubmit={handleSubmit(submit)}>
          {formData.inputParam.map((param) => (
            <InputFieldGroup
              name={param.nameAttr}
              label={param.label}
              type={param.type}
              placeholder={param.placeholder}
            />
          ))}
          {formData.checkParam.map((param) => (
            <CheckboxGroup
              name={param.nameAttr}
              label={param.label}
              options={param.items}
            />
          ))}
          {formData.selectParam.map((param) => (
            <SelectboxGroup
              name={param.nameAttr}
              label={param.label}
              options={param.items}
            />
          ))}
          {formData.radioParam.map((param) => (
            <RadioButtonGroup
              name={param.nameAttr}
              label={param.label}
              options={param.items}
            />
          ))}
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
  error: PropTypes.string,
};

const formOption = reduxForm({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(Form);

const formParam = (_, { form }) => ({
  form: form.name || "leetName",
  validate: form.validater,
  formData: form,
});

const FormContainer = connect(formParam)(formOption);
export default FormContainer;
