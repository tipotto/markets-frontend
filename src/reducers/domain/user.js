import initState from "../initState";
import { SUCCEEDED_CREATE_USER } from "../../actions";

const userReducer = (state = initState.user, action) => {
  switch (action.type) {
    case SUCCEEDED_CREATE_USER:
      return { ...state, loginUser: action.resData };

    default:
      return state;
  }
};

export default userReducer;
