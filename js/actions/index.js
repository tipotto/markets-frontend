"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_fsa_1 = __importDefault(require("typescript-fsa"));
const actionCraator = typescript_fsa_1.default();
// Action定義
exports.SUBMIT_FORM = "SUBMIT_FORM";
exports.CHANGE_EMAIL = "CHANGE_EMAIL";
// Action Creator(Action Createrを呼び出すことで、stateの更新が行われる。)
exports.submitForm = () => ({
    type: exports.SUBMIT_FORM
});
exports.changeEmail = event => ({
    type: exports.CHANGE_EMAIL,
    payload: event.target.value
});
