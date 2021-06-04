import React, { memo } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import {
  reduxForm,
  Field,
  FieldArray,
  formValueSelector,
  startSubmit,
} from 'redux-form';
import $ from 'jquery';
import clsx from 'clsx';
import MenuItem from '@material-ui/core/MenuItem';
import { requestSearch } from '../../actions';
import {
  mainCategoryArray,
  subCategoryObject,
} from '../../constants/SelectOptions';
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

const submit = (dispatch, change) => {
  startSubmit(FormData.name);
  change('page', 1);
  dispatch(requestSearch());
  scrollDownWindow();
};

const getCategory = (state) => {
  const selector = formValueSelector(FormData.name);
  const category = selector(state, 'category');
  return category ? category[0] : { main: '', sub: '' };
};

const useForm = (change, items) => {
  const { main, sub } = useSelector(
    (state) => getCategory(state),
    shallowEqual,
  );

  const fetchCategoryOptions = (categoryOptions) =>
    categoryOptions.map((category) => (
      <MenuItem key={category.value} value={category.value}>
        {category.label}
      </MenuItem>
    ));

  const handleChange = (e, category) => {
    // newSubCategories / nextSubCategories
    const subCategories = subCategoryObject[e.target.value];

    // console.log('selectedMain', main);
    // console.log('selectedSub', sub);

    // 今回選択したメインカテゴリにサブカテゴリが存在しない場合
    if (!subCategories.length) {
      // 以前に選択したメインカテゴリにサブカテゴリが存在しない場合
      // 何もせずに処理を終了
      if (!sub) return;

      // 以前に選択したメインカテゴリにサブカテゴリが存在した場合
      // サブカテゴリを隠す
      // console.log('Hide subcategory.');
      change(`${category}.sub`, '');
    } else {
      // サブカテゴリがある場合
      // console.log('Change subcategory.');
      const { value } = subCategories[0];
      change(`${category}.sub`, value);
    }
  };

  const renderCategories = ({ fields }) => {
    if (fields.length <= 0) fields.push({});

    return fields.map((category, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <div key={index}>
        <Field
          name={`${category}.main`}
          label="メインカテゴリー"
          component={Selectbox}
          rootClass={items}
          onChange={(e) => handleChange(e, category)}
        >
          {fetchCategoryOptions(mainCategoryArray)}
        </Field>
        {main && subCategoryObject[main].length > 0 && (
          <Field
            name={`${category}.sub`}
            label="サブカテゴリー"
            component={Selectbox}
            rootClass={items}
          >
            {fetchCategoryOptions(subCategoryObject[main])}
          </Field>
        )}
      </div>
    ));
  };

  return { renderCategories };
};

let Form = ({ handleSubmit, submitting, invalid, change }) => {
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
  const { renderCategories } = useForm(change, items);

  return (
    <form
      className={root}
      onSubmit={handleSubmit((values, dispatch) => {
        submit(dispatch, change);
      })}
      encType="multipart/form-data"
    >
      <FieldArray name="category" component={renderCategories} />
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
      <Field
        name="productStatus"
        label="アイテムの状態"
        component={ProductStatusCheckbox}
        rootClass={items}
      />
      <Field
        name="salesStatus"
        label="出品状況"
        component={RadioButton}
        rootClass={items}
      >
        <RadioOptions options={radioOptionsObject.salesStatus} />
      </Field>
      <Field
        name="deliveryCost"
        label="配送料の負担"
        component={RadioButton}
        rootClass={items}
      >
        <RadioOptions options={radioOptionsObject.deliveryCost} />
      </Field>
      <Field
        name="sortOrder"
        label="並びかえ"
        component={RadioButton}
        rootClass={items}
      >
        <RadioOptions options={radioOptionsObject.sortOrder} />
      </Field>
      <SubmitButton disabled={invalid || submitting} />
    </form>
  );
};

Form = reduxForm({
  form: FormData.name,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: FormData.validate,
  initialValues: FormData.initialValues,
})(Form);

export default memo(Form);
