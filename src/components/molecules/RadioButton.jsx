import React, { Component } from "react";
import { Field } from "redux-form";
import PropTypes from "prop-types";

export default class RadioButtonGroup extends Component {
  static propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

  field = ({ input, meta, options, label, onFieldChange }) => {
    const { name, onChange, onBlur, onFocus } = input;
    const { touched, error } = meta;

    // input.value について
    // クリックした要素（ここではラジオボタン）のvalueの値を取得できる。
    // 最初は、クリックイベントが発生しないため空になる。

    const radiobuttons = options.map(({ label, value }, index) => {
      return (
        <label key={`radio-${index}`}>
          <span>{label}</span>
          <input
            type="radio"
            name={`${name}[${index}]`}
            value={value}
            checked={input.value === value}
            onChange={(e) => {
              onChange(e.target.value);
              onFieldChange && onFieldChange(e.target.value);
            }}
            onFocus={onFocus}
          />
        </label>
      );
    });

    return (
      <div>
        <p>{label}</p>
        {radiobuttons}
        {touched && error && <p className="error">{error}</p>}
      </div>
    );
  };

  render() {
    // Fieldタグには、必ずしもname属性が必要なわけではないらしい。
    // クラスのインポート部分でnameやoptionsなどのパラメータを渡すことで、
    // fieldメソッド内で受け取ることもできる。
    return <Field {...this.props} component={this.field} />;
  }
}
