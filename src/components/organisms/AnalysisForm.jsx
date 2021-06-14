import React, { memo } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { reduxForm, Field, startSubmit } from 'redux-form';
import $ from 'jquery';
import clsx from 'clsx';
import MenuItem from '@material-ui/core/MenuItem';
import { requestAnalysis } from '../../actions';
import { searchTypeArray } from '../../constants/SelectOptions';
import Selectbox from '../molecules/Selectbox';
import CustomTextField from '../molecules/CustomTextField';
import PlatformCheckbox from '../molecules/PlatformCheckbox';
import ProductStatusCheckbox from '../molecules/ProductStatusCheckbox';
import RadioButton from '../molecules/RadioButton';
import RadioOptions from '../molecules/RadioOptions';
import SubmitButton from '../molecules/SubmitButton';
import radioOptionsObject from '../../constants/RadioOptions';
import formStyles from '../../style/form';
import FormData from '../../constants/FormData';

const scrollDownWindow = () => {
  const speed = 1000;
  const position = $('#result').offset().top;
  $('body,html').animate({ scrollTop: position }, speed, 'swing');
};

// const submit = (dispatch, change) => {
//   startSubmit(FormData.analysis.name);
//   change('page', 1);
//   dispatch(requestAnalysis());
//   scrollDownWindow();
// };

const submit = (values, dispatch) => {
  console.log('values', values);
  startSubmit(FormData.analysis.name);
  dispatch(requestAnalysis(values['searchType']));
  scrollDownWindow();
};

let AnalysisForm = ({ handleSubmit, submitting, invalid, change }) => {
  // console.log('Form is rendered.');

  const {
    root,
    items,
    keywordError,
    platformsError,
    priceContainer,
    price,
    hyphen,
  } = formStyles();

  return (
    <form
      className={root}
      onSubmit={handleSubmit((values, dispatch) => {
        // submit(dispatch, change);
        submit(values, dispatch);
      })}
      encType="multipart/form-data"
    >
      <Field
        name="searchType"
        label="検索タイプ"
        component={Selectbox}
        rootClass={items}
        required
      >
        {searchTypeArray.map(({ label, value }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Field>
      <Field
        name="keyword"
        label="キーワード"
        component={CustomTextField}
        rootClass={clsx(items, keywordError)}
        required
      />
      <Field
        name="platforms"
        label="フリマサイト"
        component={PlatformCheckbox}
        rootClass={clsx(items, platformsError)}
        required
      />
      {/* <div className={priceContainer}>
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
      </div> */}
      <Field
        name="productStatus"
        label="アイテムの状態"
        component={ProductStatusCheckbox}
        rootClass={items}
      />
      {/* <Field
        name="salesStatus"
        label="出品状況"
        component={RadioButton}
        rootClass={items}
      >
        <RadioOptions options={radioOptionsObject.salesStatus} />
      </Field> */}
      <Field
        name="deliveryCost"
        label="配送料の負担"
        component={RadioButton}
        rootClass={items}
      >
        <RadioOptions options={radioOptionsObject.deliveryCost} />
      </Field>
      {/* <Field
        name="sortOrder"
        label="並びかえ"
        component={RadioButton}
        rootClass={items}
      >
        <RadioOptions options={radioOptionsObject.sortOrder} />
      </Field> */}
      <Field
        name="keywordFilter"
        label="検索対象"
        component={RadioButton}
        rootClass={items}
      >
        <RadioOptions options={radioOptionsObject.keywordFilter} />
      </Field>
      <SubmitButton disabled={invalid || submitting} />
    </form>
  );
};

AnalysisForm = reduxForm({
  form: FormData.analysis.name,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: FormData.analysis.validate,
  initialValues: FormData.analysis.initialValues,
})(AnalysisForm);

export default memo(AnalysisForm);
