import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field, reset } from "redux-form";
import PropTypes from "prop-types";
import { requestSearch } from "../../actions";
// import { withStyles } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
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
import Button from "@material-ui/core/Button";

const submit = (value, dispatch, props) => {
  // const params = new FormData();
  // params.append("keyword", values.keyword);
  // params.append("platform", values.platform);
  // params.append("resultNum", values.resultNum);
  // params.append("sortIndex", values.sortIndex);
  // params.append("sortOrder", values.sortOrder);

  // dispatch(requestSearch(params, props));
  dispatch(requestSearch(value, props));
  dispatch(reset(props.form));
  console.log("value: " + value);
  // console.log("params: " + params);
};

// const renderFromHelper = ({ touched, error }) => {
//   if (!(touched && error)) return;
//   return <FormHelperText>{touched && error}</FormHelperText>;
// };

const renderTextField = ({
  input,
  label,
  meta: { touched, invalid, error },
  type = "text",
  required = true,
  rootClass = "",
  subClass = "",
}) => (
  <TextField
    required={required}
    // classes={{ root: [rootClass, subClass].join(" ") }}
    classes={{ root: rootClass }}
    // error={!!(touched && error)}
    label={label}
    type={type}
    fullWidth
    variant="outlined"
    error={touched && invalid}
    helperText={touched && error}
    {...input}
  />
);

const renderSelect = ({
  input: { value, onChange },
  label,
  children,
  meta: { touched, invalid, error },
  onFieldChange,
  required = false,
  rootClass = "",
}) => (
  <TextField
    required={required}
    classes={{ root: rootClass }}
    select
    label={label}
    fullWidth
    variant="outlined"
    value={value}
    onChange={(e) => {
      onChange(e.target.value);
      onFieldChange && onFieldChange(e.target.value);
    }}
    error={touched && invalid}
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
  row = true,
  required = false,
  rootClass = "",
}) => {
  const arr = [...value];

  const handleChange = (e) => {
    if (e.target.checked) {
      arr.push(e.target.value);
    } else {
      arr.splice(arr.indexOf(e.target.value), 1);
    }
    return onChange(arr);
  };

  return (
    <FormControl
      classes={{ root: rootClass }}
      required={required}
      component="fieldset"
      error={!!(touched && error)}
    >
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup row={row} value={value} onChange={handleChange}>
        {children}
      </FormGroup>
      {touched && error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

// const styles = {
//   formControl: {
//     marginTop: 30,
//     marginBottom: 30,
//     display: "block",
//   },
//   select: {},
// };

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: "40%",
      // marginRight: "auto",
      // marginLeft: "30px",
    },
    items: {
      marginTop: 30,
      marginBottom: 30,
      display: "block",
    },
    // textField: {
    //   width: "50px",
    // },
  })
);

const Form = (props) => {
  const {
    handleSubmit,
    submitting,
    // submitSucceeded,
    pristine,
    reset,
    error,
    // classes,
  } = props;

  const classes = useStyles();

  console.log(props);

  return (
    <form
      className={classes.root}
      onSubmit={handleSubmit(submit)}
      encType="multipart/form-data"
    >
      <Field
        name="keyword"
        label="検索ワード"
        component={renderTextField}
        rootClass={classes.items}
        // subClass={classes.textField}
        required
      />
      <Field
        name="platform"
        label="プラットフォーム"
        component={renderCheckBox}
        rootClass={classes.items}
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
        rootClass={classes.items}
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
        rootClass={classes.items}
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
        rootClass={classes.items}
        required
      >
        <FormControlLabel value="ASC" control={<Radio />} label="昇順" />
        <FormControlLabel value="DESC" control={<Radio />} label="降順" />
      </Field>
      <Button
        type="submit"
        size="medium"
        variant="contained"
        color="secondary"
        fullWidth
        disabled={pristine || submitting}
      >
        送信する
      </Button>

      {/* {error && (
        <div>
          <strong>{error}</strong>
        </div>
      )}
      {submitting && (
        <div>
          <strong>submitting</strong>
        </div>
      )} */}
      {/* <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div> */}
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
export default FormContainer;
// export default withStyles(styles)(FormContainer);
