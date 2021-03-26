import searchValidater from "../components/validater/Search";
import FormName from "./FormName";
// import FormInputParam from './FormInputParam';
// import FormItemParam from './FormItemParam';

const { SEARCH } = FormName;
// const { KEYWORD } = FormInputParam;
// const { PLATFORM, RESULT_NUM, SORT_INDEX, SORT_ORDER } = FormItemParam;

const FormData = {
  SEARCH: {
    name: SEARCH,
    validater: searchValidater,
    initialValues: {
      category: [{ main: "", sub: "" }],
      keyword: "",
      platforms: [],
      minPrice: "",
      maxPrice: "",
      productStatus: [],
      salesStatus: "",
      deliveryCost: "",
      sortOrder: "",
    },
    // inputParam: [KEYWORD],
    // checkParam: [PLATFORM],
    // selectParam: [RESULT_NUM, SORT_INDEX],
    // radioParam: [SORT_ORDER],
  },
};

export default FormData;
