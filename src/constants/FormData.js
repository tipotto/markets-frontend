import createUserValidater from "../components/validater/CreateUser";
import loginValidater from "../components/validater/Login";
import addItemValidater from "../components/validater/AddItem";
import FormName from "./FormName";
import FormInputParam from "./FormInputParam";

const { CREATE_USER, LOGIN, ADD_ITEM } = FormName;
const { NAME, EMAIL, PASSWORD, TITLE, DESCRIPTION } = FormInputParam;

const FormData = {
  CREATE_USER: {
    name: CREATE_USER,
    validater: createUserValidater,
    inputParam: [NAME, EMAIL, PASSWORD]
  },
  LOGIN: {
    name: LOGIN,
    validater: loginValidater,
    inputParam: [EMAIL, PASSWORD]
  },
  ADD_ITEM: {
    name: ADD_ITEM,
    validater: addItemValidater,
    inputParam: [TITLE, DESCRIPTION]
  }
};

export default FormData;
