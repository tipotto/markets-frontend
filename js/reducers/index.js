"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_1 = require("../actions");
exports.initialize = {
    isSubmitted: false,
    email: "",
    hasEmailError: false
};
exports.default = (state = exports.initialize, action) => {
    switch (action.type) {
        case actions_1.SUBMIT_FORM:
            return {
                isSubmitted: true,
                email: state.email,
                hasEmailError: state.hasEmailError
            };
        case actions_1.CHANGE_EMAIL:
            return {
                isSubmitted: state.isSubmitted,
                email: action.payload,
                hasEmailError: action.payload === ""
            };
        default:
            return state;
    }
};
