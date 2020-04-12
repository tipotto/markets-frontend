import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import PropTypes from "prop-types";
import { requestCreate } from "../../actions";
import { withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Checkbox from "@material-ui/core/Checkbox";

const submit = (value, dispatch, props) => {
  dispatch(requestCreate(value, props));
  // dispatch(reset(props.form));
  console.log(value);
};

const styles = {
  formControl: {
    marginTop: 30,
    marginBottom: 30,
    display: "block",
  },
};

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  type = "text",
  required = false,
  rootClass = "",
}) => (
  <TextField
    required={required}
    classes={{ root: rootClass }}
    error={!!(touched && error)}
    label={label}
    type={type}
    variant="outlined"
    helperText={touched && error}
    {...input}
  />
);

const renderSelect = ({
  input: { value, onChange },
  label,
  children,
  meta: { touched, error },
  onFieldChange,
  required = false,
  rootClass = "",
}) => (
  <TextField
    required={required}
    classes={{ root: rootClass }}
    select
    label={label}
    variant="outlined"
    value={value}
    onChange={(e) => {
      onChange(e.target.value);
      onFieldChange && onFieldChange(e.target.value);
    }}
    helperText={touched && error}
  >
    {children}
  </TextField>
);

const renderRadio = ({
  input: { value, onChange },
  label,
  children,
  meta: { touched, error },
  onFieldChange,
  row = true,
  required = false,
  rootClass = "",
}) => (
  <FormControl
    classes={{ root: rootClass }}
    required={required}
    component="fieldset"
    error={!!(touched && error)}
  >
    <FormLabel component="legend">{label}</FormLabel>
    <RadioGroup
      row={row}
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
        onFieldChange && onFieldChange(e.target.value);
      }}
    >
      {children}
    </RadioGroup>
    {touched && error && <FormHelperText>{error}</FormHelperText>}
  </FormControl>
);

const renderCheckBox = ({
  input: { value, onChange },
  label,
  children,
  meta: { touched, error },
  onFieldChange,
  row = true,
  required = false,
  rootClass = "",
}) => (
  <FormControl
    classes={{ root: rootClass }}
    required={required}
    component="fieldset"
    error={!!(touched && error)}
  >
    <FormLabel component="legend">{label}</FormLabel>
    <FormGroup
      row={row}
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
        onFieldChange && onFieldChange(e.target.value);
      }}
    >
      {children}
    </FormGroup>
    {touched && error && <FormHelperText>{error}</FormHelperText>}
  </FormControl>
);

const Form = (props) => {
  const {
    handleSubmit,
    submitting,
    // submitSucceeded,
    pristine,
    reset,
    error,
    classes,
  } = props;

  console.log(props);

  return (
    <form onSubmit={handleSubmit(submit)} encType="multipart/form-data">
      <Field
        name="text"
        label="検索ワード"
        component={renderTextField}
        rootClass={classes.formControl}
        required
      />
      <Field
        name="platform"
        label="プラットフォーム"
        component={renderCheckBox}
        rootClass={classes.formControl}
        required
      >
        <FormControlLabel
          value="mercari"
          control={<Checkbox />}
          label="メルカリ"
        />
        <FormControlLabel
          value="rakuten"
          control={<Checkbox />}
          label="ラクマ"
        />
      </Field>
      <Field
        name="resultNum"
        label="検索結果の表示数"
        component={renderSelect}
        rootClass={classes.formControl}
        required
      >
        <MenuItem value="">未選択</MenuItem>
        <MenuItem value={10}>10件</MenuItem>
        <MenuItem value={30}>30件</MenuItem>
        <MenuItem value={50}>50件</MenuItem>
      </Field>
      <Field
        name="sortIndex"
        label="検索結果のソート項目"
        component={renderSelect}
        rootClass={classes.formControl}
        required
      >
        <MenuItem value="">未選択</MenuItem>
        <MenuItem value="price">値段</MenuItem>
        <MenuItem value="title">商品名</MenuItem>
        <MenuItem value="platform">プラットフォーム</MenuItem>
      </Field>
      <Field
        name="sortOrder"
        label="検索結果のソート順"
        component={renderRadio}
        rootClass={classes.formControl}
        required
      >
        <FormControlLabel value="ASC" control={<Radio />} label="昇順" />
        <FormControlLabel value="DESC" control={<Radio />} label="降順" />
      </Field>

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
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
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
export default withStyles(styles)(FormContainer);
