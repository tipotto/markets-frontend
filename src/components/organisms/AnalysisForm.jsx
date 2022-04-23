import React, { memo } from 'react';
import { reduxForm, Field, startSubmit } from 'redux-form';
import clsx from 'clsx';
import MenuItem from '@material-ui/core/MenuItem';
import { requestAnalysis } from '../../actions';
import Selectbox from '../molecules/Selectbox';
import CustomTextField from '../molecules/CustomTextField';
import ProductStatusCheckbox from '../molecules/ProductStatusCheckbox';
import CustomRadioButton from '../molecules/CustomRadioButton';
import SubmitButton from '../molecules/SubmitButton';
import radioOptionsObject from '../../constants/radioOptions';
import baseCss from '../../style/base';
import formCss from '../../style/form';
import formData from '../../constants/formData';
import { showSearchOptions } from '../../utils';

const useAnalysisForm = () => {
  const submit = (dispatch) => {
    startSubmit(formData.analysis.name);
    dispatch(requestAnalysis());
    // scrollDownWindow();
  };

  // const getSelectedPlatform = (state) => {
  //   const selector = formValueSelector(formData.analysis.name);
  //   const platform = selector(state, 'platform');
  //   return platform || 'mercari';
  // };

  return { submit, showSearchOptions };
};

let AnalysisForm = ({ handleSubmit, submitting, invalid, change }) => {
  const { common } = baseCss();
  const {
    root,
    title,
    formDetailOptionContainer,
    formDetailOptionSection,
    formOptionLink,
    items,
    keywordError,
    priceContainer,
    price,
    hyphen,
  } = formCss();
  const { submit } = useAnalysisForm();

  return (
    <form
      className={root}
      onSubmit={handleSubmit((values, dispatch) => {
        // submit(dispatch, change);
        submit(dispatch);
      })}
      encType="multipart/form-data"
    >
      <div>
        <h3 className={title}>検索条件</h3>
        <Field
          name="keyword"
          label="キーワード"
          component={CustomTextField}
          rootClass={clsx(items, keywordError)}
          required
        />
        <Field
          name="platform"
          label="フリマサイト"
          component={Selectbox}
          rootClass={items}
        >
          {radioOptionsObject.platform.map((plf) => (
            <MenuItem key={plf.value} value={plf.value}>
              {plf.label}
            </MenuItem>
          ))}
        </Field>
      </div>
      <div id="detailed-option-container" className={formDetailOptionContainer}>
        <h3 style={{ marginBottom: 0 }} className={title}>
          詳細検索
        </h3>
        <div id="detailed-option" className={formDetailOptionSection}>
          <Field
            name="negKeyword"
            label="除外ワード"
            component={CustomTextField}
            rootClass={clsx(items, keywordError)}
          />
          <div className={priceContainer}>
            <Field
              name="minPrice"
              label="最低価格"
              component={CustomTextField}
              rootClass={price}
            />
            <span className={hyphen}>〜</span>
            <Field
              name="maxPrice"
              label="最高価格"
              component={CustomTextField}
              rootClass={price}
            />
          </div>
          {/* <Field
            name="searchTarget"
            label="検索対象"
            component={CustomRadioButton}
            options={radioOptionsObject.searchTarget}
          /> */}
          {/* {platform === 'mercari' && (
            <Field
              name="priceType"
              label="算出価格"
              component={CustomRadioButton}
              options={radioOptionsObject.priceType}
            />
          )} */}
          <Field
            name="searchRange"
            label="検索範囲"
            component={CustomRadioButton}
            options={radioOptionsObject.searchRange}
          />
          <Field
            name="productStatus"
            label="商品の状態"
            component={ProductStatusCheckbox}
            rootClass={items}
          />
          <Field
            name="salesStatus"
            label="販売状況"
            component={CustomRadioButton}
            options={radioOptionsObject.salesStatus}
          />
          <Field
            name="deliveryCost"
            label="送料"
            component={CustomRadioButton}
            options={radioOptionsObject.deliveryCost}
          />
          <Field
            name="sortOrder"
            label="並びかえ"
            component={CustomRadioButton}
            options={radioOptionsObject.sortOrder}
          />
        </div>
        <span
          className={clsx(formOptionLink, common)}
          onClick={showSearchOptions}
        >
          + オプションを見る
        </span>
      </div>
      <SubmitButton disabled={invalid || submitting} />
    </form>
  );
};

AnalysisForm = reduxForm({
  form: formData.analysis.name,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: formData.analysis.validate,
  initialValues: formData.analysis.initialValues,
})(AnalysisForm);

export default memo(AnalysisForm);
