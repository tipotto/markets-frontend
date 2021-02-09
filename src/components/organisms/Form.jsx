import React, { useState } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, reset, FieldArray } from 'redux-form';
import $ from 'jquery';
import { makeStyles, createStyles } from '@material-ui/core/styles';
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

const scrollWindow = () => {
  const speed = 1000;
  const position = $('#result').offset().top;
  $('body,html').animate({ scrollTop: position }, speed, 'swing');
};

const submit = (values, dispatch, props) => {
  dispatch(requestSearch(values, props));
  dispatch(reset(props.form));
  scrollWindow();
};

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      [theme.breakpoints.up('md')]: {
        width: '40%',
      },
    },
    items: {
      marginBottom: 30,
      display: 'block',
    },
    priceContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '40px',
    },
    price: {
      width: '45%',
    },
    hyphen: {
      display: 'inline-block',
      paddingTop: '15px',
    },
  })
);

const Form = (props) => {
  const classes = useStyles();
  const [isShowSubCategory, setShowSubCategory] = useState(false);
  const [subCategoryArray, setSubCategoryArray] = useState([]);
  const { handleSubmit, submitting, invalid, change } = props;

  const fetchCategoryOptions = (categoryOptions) => {
    return categoryOptions.map((category) => (
      <MenuItem key={category.value} value={category.value}>
        {category.label}
      </MenuItem>
    ));
  };

  const handleSubCategory = (arr, isShowSubs) => {
    setShowSubCategory(isShowSubs);
    setSubCategoryArray(arr);
  };

  const handleChange = (e, category) => {
    const subCategoryArr = subCategoryObject[e.target.value];
    if (subCategoryArr.length <= 0) {
      change(`${category}.sub`, null);
      handleSubCategory([], false);
      return;
    }

    const { value } = subCategoryArr[0];
    change(`${category}.sub`, value);
    handleSubCategory(subCategoryArr, true);
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
          rootClass={classes.items}
          onChange={(e) => handleChange(e, category)}
        >
          {fetchCategoryOptions(mainCategoryArray)}
        </Field>
        {isShowSubCategory && subCategoryArray.length > 0 && (
          <Field
            name={`${category}.sub`}
            label="サブカテゴリー"
            component={Selectbox}
            rootClass={classes.items}
          >
            {fetchCategoryOptions(subCategoryArray)}
          </Field>
        )}
      </div>
    ));
  };

  return (
    <form
      className={classes.root}
      onSubmit={handleSubmit((values, dispatch) => {
        submit(values, dispatch, props);
        handleSubCategory([], false);
      })}
      encType="multipart/form-data"
    >
      <FieldArray name="category" component={renderCategories} />
      <Field
        name="keyword"
        label="検索ワード"
        component={CustomTextField}
        rootClass={classes.items}
        required
      />
      <Field
        name="platforms"
        label="プラットフォーム"
        component={PlatformCheckbox}
        rootClass={classes.items}
        required
      />
      <div className={classes.priceContainer}>
        <Field
          name="minPrice"
          label="最低金額"
          component={CustomTextField}
          rootClass={classes.price}
        />
        <span className={classes.hyphen}>〜</span>
        <Field
          name="maxPrice"
          label="最高金額"
          component={CustomTextField}
          rootClass={classes.price}
        />
      </div>
      <Field
        name="productStatus"
        label="商品の状態"
        component={ProductStatusCheckbox}
        rootClass={classes.items}
      />
      <Field
        name="salesStatus"
        label="販売状況"
        component={RadioButton}
        rootClass={classes.items}
      >
        <RadioOptions options={radioOptionsObject.salesStatus} />
      </Field>
      <Field
        name="deliveryCost"
        label="配送料の負担"
        component={RadioButton}
        rootClass={classes.items}
      >
        <RadioOptions options={radioOptionsObject.deliveryCost} />
      </Field>
      <Field
        name="sortOrder"
        label="並び替え"
        component={RadioButton}
        rootClass={classes.items}
      >
        <RadioOptions options={radioOptionsObject.sortOrder} />
      </Field>
      <SubmitButton disabled={invalid || submitting} />
    </form>
  );
};

const formOption = reduxForm({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(Form);

const formParam = (_, { form }) => ({
  form: form.name || 'leetName',
  validate: form.validater,
});

export default connect(formParam)(formOption);
