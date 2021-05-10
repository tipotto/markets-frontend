import React, { useState, memo } from "react";
import { connect } from "react-redux";
import { reduxForm, Field, reset, FieldArray } from "redux-form";
import $ from "jquery";
import MenuItem from "@material-ui/core/MenuItem";
import { requestSearch } from "../../actions";
import {
  mainCategoryArray,
  subCategoryObject,
} from "../../constants/SelectOptions";
import Selectbox from "../molecules/Selectbox";
import CustomTextField from "../molecules/CustomTextField";
import PlatformCheckbox from "../molecules/PlatformCheckbox";
import ProductStatusCheckbox from "../molecules/ProductStatusCheckbox";
import RadioButton from "../molecules/RadioButton";
import RadioOptions from "../molecules/RadioOptions";
import SubmitButton from "../molecules/SubmitButton";
import radioOptionsObject from "../../constants/RadioOptions";
import formStyles from "../../style/form";

const scrollDownWindow = () => {
  const speed = 1000;
  const position = $("#result").offset().top;
  $("body,html").animate({ scrollTop: position }, speed, "swing");
};

const submit = (dispatch, props, values) => {
  dispatch(requestSearch(props, values));
  dispatch(reset(props));
  scrollDownWindow();
};

const Form = ({
  handleSubmit,
  submitting,
  invalid,
  change,
  form,
  handleFormValues,
}) => {
  console.log("Form is rendered.");

  const { root, items, priceContainer, price, hyphen } = formStyles();
  const [isShowSubCategory, setShowSubCategory] = useState(false);
  const [subCategoryArray, setSubCategoryArray] = useState([]);

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
      change(`${category}.sub`, "");
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
          rootClass={items}
          onChange={(e) => handleChange(e, category)}
        >
          {fetchCategoryOptions(mainCategoryArray)}
        </Field>
        {isShowSubCategory && subCategoryArray.length > 0 && (
          <Field
            name={`${category}.sub`}
            label="サブカテゴリー"
            component={Selectbox}
            rootClass={items}
          >
            {fetchCategoryOptions(subCategoryArray)}
          </Field>
        )}
      </div>
    ));
  };

  return (
    <form
      className={root}
      onSubmit={handleSubmit((values, dispatch) => {
        submit(dispatch, form, values);
        handleSubCategory([], false);
        handleFormValues(values);
      })}
      encType="multipart/form-data"
    >
      <FieldArray name="category" component={renderCategories} />
      <Field
        name="keyword"
        label="検索ワード"
        component={CustomTextField}
        rootClass={items}
        required
      />
      <Field
        name="platforms"
        label="フリマサイト"
        component={PlatformCheckbox}
        rootClass={items}
        required
      />
      <div className={priceContainer}>
        <Field
          name="minPrice"
          label="最低金額"
          component={CustomTextField}
          rootClass={price}
        />
        <span className={hyphen}>〜</span>
        <Field
          name="maxPrice"
          label="最高金額"
          component={CustomTextField}
          rootClass={price}
        />
      </div>
      <Field
        name="productStatus"
        label="商品の状態"
        component={ProductStatusCheckbox}
        rootClass={items}
      />
      <Field
        name="salesStatus"
        label="販売状況"
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
        label="並び替え"
        component={RadioButton}
        rootClass={items}
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
})(memo(Form));

const formParam = (_, { form }) => ({
  form: form.name || "leetName",
  validate: form.validater,
  initialValues: form.initialValues,
});

export default connect(formParam)(formOption);
