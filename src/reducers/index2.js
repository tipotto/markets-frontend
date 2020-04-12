import { SUBMIT_FORM, CHANGE_EMAIL } from "../actions";

export const initialize = {
  isSubmitted: false,
  email: "",
  hasEmailError: false
};

export default (state = initialize, action) => {
  switch (action.type) {
    case SUBMIT_FORM:
      return {
        isSubmitted: true,
        email: state.email,
        hasEmailError: state.hasEmailError
      };

    case CHANGE_EMAIL:
      return {
        isSubmitted: state.isSubmitted,
        email: action.payload,
        hasEmailError: action.payload === ""
      };

    default:
      return state;
  }
};
