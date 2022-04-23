/* eslint-disable no-use-before-define */
import React, { memo } from 'react';
import { reduxForm, Field, startSubmit } from 'redux-form';
import clsx from 'clsx';
import { requestSearch } from '../../actions';
import CustomTextField from '../molecules/CustomTextField';
import PlatformCheckbox from '../molecules/PlatformCheckbox';
import ProductStatusCheckbox from '../molecules/ProductStatusCheckbox';
import CustomRadioButton from '../molecules/CustomRadioButton';
import SubmitButton from '../molecules/SubmitButton';
import radioOptionsObject from '../../constants/radioOptions';
import baseCss from '../../style/base';
import formCss from '../../style/form';
import formData from '../../constants/formData';
import { showSearchOptions } from '../../utils';

const useForm = (change) => {
  // const selector = formValueSelector(formData.search.name);

  // const { main, sub } = useSelector(
  //   (state) => getCategory(state, selector),
  //   shallowEqual,
  // );

  // const platforms = useSelector(
  //   (state) => selector(state, 'platforms'),
  //   shallowEqual,
  // );

  const submit = (dispatch) => {
    startSubmit(formData.search.name);
    change('type', 'initial');
    change('page', 1);
    dispatch(requestSearch());
    // scrollDownWindow();
  };

  // const shouldShowCategory = (platforms) => {
  //   if (!platforms.length) return false;
  //   if (
  //     !(
  //       platforms.includes('mercari') ||
  //       platforms.includes('rakuma') ||
  //       platforms.includes('paypay')
  //     )
  //   ) {
  //     return false;
  //   }
  //   if (
  //     platforms.includes('yahoo-auction') ||
  //     platforms.includes('amazon') ||
  //     platforms.includes('rakuten') ||
  //     platforms.includes('yahoo-shopping')
  //   ) {
  //     return false;
  //   }
  //   return true;
  // };

  // const getCategory = (state) => {
  //   // const selector = formValueSelector(formData.search.name);
  //   const category = selector(state, 'category');
  //   return category ? category[0] : { main: '', sub: '' };
  // };

  // const fetchCategoryOptions = (categoryOptions) =>
  //   categoryOptions.map((category) => (
  //     <MenuItem key={category.value} value={category.value}>
  //       {category.label}
  //     </MenuItem>
  //   ));

  // const handleChange = (e, category) => {
  //   // newSubCategories / nextSubCategories
  //   const subCategories = subCategoryObject[e.target.value];

  //   // console.log('selectedMain', main);
  //   // console.log('selectedSub', sub);

  //   // 今回選択したメインカテゴリにサブカテゴリが存在しない場合
  //   if (!subCategories.length) {
  //     // 以前に選択したメインカテゴリにサブカテゴリが存在しない場合
  //     // 何もせずに処理を終了
  //     if (!sub) return;

  //     // 以前に選択したメインカテゴリにサブカテゴリが存在した場合
  //     // サブカテゴリを隠す
  //     // console.log('Hide subcategory.');
  //     change(`${category}.sub`, '');
  //   } else {
  //     // サブカテゴリがある場合
  //     // console.log('Change subcategory.');
  //     const { value } = subCategories[0];
  //     change(`${category}.sub`, value);
  //   }
  // };

  // const renderCategories = ({ fields }) => {
  //   if (fields.length <= 0) fields.push({});

  //   return fields.map((category, index) => (
  //     // eslint-disable-next-line react/no-array-index-key
  //     <div key={index}>
  //       <Field
  //         name={`${category}.main`}
  //         label="メインカテゴリー"
  //         component={Selectbox}
  //         rootClass={items}
  //         onChange={(e) => handleChange(e, category)}
  //       >
  //         {fetchCategoryOptions(mainCategoryArray)}
  //       </Field>
  //       {main && subCategoryObject[main].length > 0 && (
  //         <Field
  //           name={`${category}.sub`}
  //           label="サブカテゴリー"
  //           component={Selectbox}
  //           rootClass={items}
  //         >
  //           {fetchCategoryOptions(subCategoryObject[main])}
  //         </Field>
  //       )}
  //     </div>
  //   ));
  // };

  return { submit, showSearchOptions };
};

let Form = ({ handleSubmit, submitting, invalid, change }) => {
  const { common } = baseCss();
  const {
    root,
    title,
    formDetailOptionContainer,
    formDetailOptionSection,
    formOptionLink,
    items,
    keywordError,
    platformsError,
    priceContainer,
    price,
    hyphen,
  } = formCss();
  const { submit } = useForm(change);

  return (
    <form
      className={root}
      onSubmit={handleSubmit((values, dispatch) => {
        submit(dispatch, change);
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
          name="platforms"
          label="フリマサイト"
          component={PlatformCheckbox}
          rootClass={clsx(items, platformsError)}
          required
        />
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
          {/* {shouldShowCategory(platforms) && (
            <FieldArray name="category" component={renderCategories} />
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

Form = reduxForm({
  form: formData.search.name,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: formData.search.validate,
  initialValues: formData.search.initialValues,
})(Form);

export default memo(Form);
