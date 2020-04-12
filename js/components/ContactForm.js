"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
const actions_1 = require("../actions");
// class ContactForm extends React.Component {
const ContactForm = () => {
    // render() {
    const dispatch = react_redux_1.useDispatch();
    const isSubmitted = react_redux_1.useSelector(state => state.isSubmitted);
    const email = react_redux_1.useSelector(state => state.email);
    const hasEmailError = react_redux_1.useSelector(state => state.hasEmailError);
    const handleSubmitForm = () => {
        dispatch(actions_1.submitForm);
    };
    let emailErrorText;
    if (hasEmailError) {
        emailErrorText = (<p className="contact-message-error">メールアドレスを入力してください</p>);
    }
    let contactForm;
    if (isSubmitted) {
        contactForm = <div className="contact-submit-message">送信完了</div>;
    }
    else {
        contactForm = (<form onSubmit={handleSubmitForm}>
        <p>メールアドレス（必須）</p>
        <input value={email} onChange={event => dispatch(actions_1.changeEmail(event))}/>
        {emailErrorText}
        <p>お問い合わせ内容（必須）</p>
        <textarea />
        <input type="submit" value="送信"/>
      </form>);
    }
    return <div className="contact-form">{contactForm}</div>;
    // }
};
exports.default = ContactForm;
