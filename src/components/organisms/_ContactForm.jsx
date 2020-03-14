import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitForm, changeEmail } from "../../actions";

// class ContactForm extends React.Component {

const ContactForm = () => {
  // render() {

  const dispatch = useDispatch();
  const isSubmitted = useSelector(state => state.isSubmitted);
  const email = useSelector(state => state.email);
  const hasEmailError = useSelector(state => state.hasEmailError);

  const handleSubmitForm = () => {
    dispatch(submitForm);
  };

  let emailErrorText;
  if (hasEmailError) {
    emailErrorText = (
      <p className="contact-message-error">メールアドレスを入力してください</p>
    );
  }

  let contactForm;
  if (isSubmitted) {
    contactForm = <div className="contact-submit-message">送信完了</div>;
  } else {
    contactForm = (
      <form onSubmit={handleSubmitForm}>
        <p>メールアドレス（必須）</p>
        <input value={email} onChange={event => dispatch(changeEmail(event))} />
        {emailErrorText}
        <p>お問い合わせ内容（必須）</p>
        <textarea />
        <input type="submit" value="送信" />
      </form>
    );
  }

  return <div className="contact-form">{contactForm}</div>;
  // }
};

export default ContactForm;
