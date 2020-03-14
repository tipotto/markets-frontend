import { connect } from "react-redux";
import { submitForm, changeEmail } from "../actions";
import ContactForm from "../components/ContactForm";

// Containerコンポーネント
// 通常コンポーネント(../components/Counter.js)から
// Actionのdispatchやstateの参照などのためにStoreにアクセスできるように
// 通常コンポーネントとStoreのマッピング処理を記述します。

// reduxで管理しているState情報を、Propsとして扱えるようにする。
const mapStateToProps = state => ({
  isSubmitted: state.isSubmitted,
  hasEmailError: state.hasEmailError
});

// Action CreatorをPropsとして扱えるようにする。
// const mapDispatchToProps = ({increment, decrement});

// const mapDispatchToProps = dispatch => {
//   return {
//     submitForm: () => {
//       dispatch(submitForm);
//     },
//     changeEmail: event => {
//       dispatch(changeEmail(event));
//     }
//   };
// };

const mapDispatchToProps = { submitForm, changeEmail };

// componentとRedux Storeを接続する。
export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
