import React, { Component } from 'react';
import { Field } from 'redux-form';
import MenuItem from '@material-ui/core/MenuItem';

export default class SelectOptions extends Component {
  fetchCategoryOptions({ options }) {
    const categoryOptions = options.map((category) => (
      <MenuItem key={category.value} value={category.value}>
        {category.label}
      </MenuItem>
    ));

    return categoryOptions;
  }

  render() {
    return (
      <Field
        name="categoryOptions"
        {...this.props}
        component={this.fetchCategoryOptions}
      />
    );
  }
}
