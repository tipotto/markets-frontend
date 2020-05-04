import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field, reset } from "redux-form";
import PropTypes from "prop-types";
import { requestSearch } from "../../actions";
import $ from "jquery";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";
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
  dispatch(requestSearch(value, props));
  dispatch(reset(props.form));
  scrollWindow();
};

const scrollWindow = () => {
  var speed = 1000;
  var position = $("#result").offset().top;
  $("body,html").animate({ scrollTop: position }, speed, "swing");
};

const GreenCheckbox = withStyles({
  root: {
    color: "#57C5B6",
    "&$checked": {
      color: "#57C5B6",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const GreenRadio = withStyles({
  root: {
    color: "#57C5B6",
    "&$checked": {
      color: "#57C5B6",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const renderTextField = ({
  input,
  label,
  meta: { touched, invalid, error },
  type = "text",
  required = true,
  rootClass = "",
  // subClass = "",
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
  input,
  label,
  children,
  meta: { touched, invalid, error },
  onFieldChange,
  required = true,
  rootClass = "",
}) => {
  const { value, onChange } = input;
  return (
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
      {...input}
    >
      {children}
    </TextField>
  );
};

const renderRadio = ({
  input: { value, onChange },
  label,
  children,
  meta: { touched, error },
  onFieldChange,
  row = true,
  required = true,
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
  meta: { touched, error },
  onFieldChange,
  row = true,
  required = true,
  rootClass = "",
}) => {
  var arr = [...value];
  const handleChange = (e) => {
    if (e.target.checked) {
      arr.push(e.target.value);
    } else {
      arr.splice(arr.indexOf(e.target.value), 1);
    }
    if (arr.length === 0) arr = "";
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
      <FormGroup
        row={row}
        value={value}
        onChange={(e) => {
          handleChange(e);
          onFieldChange && onFieldChange(e.target.value);
        }}
      >
        <FormControlLabel
          value="mercari"
          control={<GreenCheckbox />}
          label="メルカリ"
          checked={arr.includes("mercari") ? true : false}
        />
        <FormControlLabel
          value="rakuten"
          control={<GreenCheckbox />}
          label="ラクマ"
          checked={arr.includes("rakuten") ? true : false}
        />
        <FormControlLabel
          value="paypay"
          control={<GreenCheckbox />}
          label="PayPayフリマ"
          checked={arr.includes("paypay") ? true : false}
        />
      </FormGroup>
      {touched && error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: "40%",
    },
    items: {
      marginTop: 30,
      marginBottom: 30,
      display: "block",
    },
    button: {
      backgroundColor: "#57C5B6",
      "&:hover": {
        backgroundColor: "#57C5B6",
      },
    },
  })
);

const Form = (props) => {
  const {
    handleSubmit,
    submitting,
    invalid,
    // pristine,
    // classes,
  } = props;

  const classes = useStyles();

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
      />
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
        <FormControlLabel value="ASC" control={<GreenRadio />} label="昇順" />
        <FormControlLabel value="DESC" control={<GreenRadio />} label="降順" />
      </Field>
      <Button
        className={classes.button}
        type="submit"
        size="medium"
        variant="contained"
        color="secondary"
        fullWidth
        disabled={invalid || submitting}
      >
        送信する
      </Button>
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
