import React, { Component } from "react";
import { Field } from "redux-form";
import PropTypes from "prop-types";
import MenuItem from "@material-ui/core/MenuItem";

export default class SelectboxOption extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

  renderSelect = ({ items }) => {
    const selectOption = items.map(({ label, value }, index) => {
      return <MenuItem value={value}>{label}</MenuItem>;
    });

    return <div>{selectOption}</div>;
  };

  render() {
    return <Field {...this.props} component={this.renderSelect} />;
  }
}
