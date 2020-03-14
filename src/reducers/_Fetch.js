import {
  REQUEST_FETCH,
  SUCCEEDED_FETCH,
  FAILED_FETCH,
  REQUEST_CREATE,
  SUCCEEDED_CREATE,
  FAILED_CREATE,
  REQUEST_DELETE,
  SUCCEEDED_DELETE,
  FAILED_DELETE
} from "../actions";

const initialState = {
  fetching: false,
  userData: [],
  // formData: {},
  error: null
};

// const initialState = {
//   data: {
//     users: []
//   },
//   status: {
//     fetching: false,
//     error: null
//   }
// };

const fetchUserData = (state = initialState, action) => {
  switch (action.type) {
    // Fetch
    case REQUEST_FETCH:
      return { ...state, fetching: true, error: null };
    case SUCCEEDED_FETCH:
      return { ...state, fetching: false, userData: action.users };
    // return Object.assign({}, state, {
    //   fetching: false,
    //   userData: action.users
    // });
    case FAILED_FETCH:
      return { ...state, fetching: false, userData: null, error: action.error };

    // Create
    case REQUEST_CREATE:
      return { ...state, fetching: true, error: null };
    case SUCCEEDED_CREATE:
      return {
        ...state,
        fetching: false,
        // 既存のユーザー情報の配列に、新しく登録したユーザーを追加している？
        // この場合、ユーザー登録後には、新たに登録したユーザーのオブジェクトだけを
        // サーバーサイドで返すようにする必要あり。
        // サーバーサイドで全てのリストを返すようにして、ここではuserDataを丸ごと更新する、
        // という方法もあるが、それだとユーザーが増えるにつれてデータの送信量が増大する。
        userData: [...state.userData, action.payload]
      };
    case FAILED_CREATE:
      return {};

    // Delete
    case REQUEST_DELETE:
      return { ...state, fetching: true, error: null };
    case SUCCEEDED_DELETE:
      return {
        ...state,
        fetching: false,
        // フィルターをかけることで、削除したID以外のものだけを抽出して配列にしている。
        // おそらく、ユーザー情報の配列から一つ一つ取り出し、userIdがpayloadのID
        // と異なることを確認している。
        // この場合、ユーザー削除後には、削除ユーザーのIDのオブジェクトだけを
        // サーバーサイドで返すようにする必要あり。
        userData: state.userData.filter(data => data.id !== action.payload.id)
      };
    case FAILED_DELETE:
      return {};

    // Others
    default:
      return state;
  }
};

export default fetchUserData;
