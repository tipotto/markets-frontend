import createUserValidater from "../components/validater/CreateUser";
import loginValidater from "../components/validater/Login";
import addItemValidater from "../components/validater/AddItem";
import searchValidater from "../components/validater/Search";
import FormName from "./FormName";
import FormInputParam from "./FormInputParam";
import FormItemParam from "./FormItemParam";

const { CREATE_USER, LOGIN, ADD_ITEM, SEARCH } = FormName;
const { NAME, EMAIL, PASSWORD, TITLE, DESCRIPTION, KEYWORD } = FormInputParam;
const { PLATFORM, RESULT_NUM, SORT_INDEX, SORT_ORDER } = FormItemParam;

const FormData = {
  CREATE_USER: {
    name: CREATE_USER,
    validater: createUserValidater,
    inputParam: [NAME, EMAIL, PASSWORD],
    checkParam: [],
    selectParam: [],
    radioParam: [],
  },
  LOGIN: {
    name: LOGIN,
    validater: loginValidater,
    inputParam: [EMAIL, PASSWORD],
    checkParam: [],
    selectParam: [],
    radioParam: [],
  },
  ADD_ITEM: {
    name: ADD_ITEM,
    validater: addItemValidater,
    inputParam: [TITLE, DESCRIPTION],
    checkParam: [],
    selectParam: [],
    radioParam: [],
  },
  SEARCH: {
    name: SEARCH,
    validater: searchValidater,
    inputParam: [KEYWORD],
    checkParam: [PLATFORM],
    selectParam: [RESULT_NUM, SORT_INDEX],
    radioParam: [SORT_ORDER],
  },
};

export default FormData;
