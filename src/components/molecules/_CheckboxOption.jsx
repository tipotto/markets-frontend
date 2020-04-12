import React, { Component } from "react";
import { Field } from "redux-form";
import PropTypes from "prop-types";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default class CheckboxOption extends Component {
  static propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      })
    ).isRequired
  };

  renderCheckBox = ({ items }) => {
    const checkboxOption = items.map(({ label, value }, index) => {
      return (
        <FormControlLabel value={value} control={<Checkbox />} label={label} />
      );
    });

    return <div>{checkboxOption}</div>;
  };

  render() {
    return <Field {...this.props} component={this.renderCheckBox} />;
  }
}
