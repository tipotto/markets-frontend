import initState from "../initState";
import {
  SUCCEEDED_FETCH,
  SUCCEEDED_CREATE_ITEM,
  SUCCEEDED_DELETE
} from "../../actions";

const itemReducer = (state = initState.item, action) => {
  switch (action.type) {
    // アイテム作成後は、リスト画面側でuseEffectにより、
    // レンダリング時にリストを取得して表示するため、アイテム作成に成功した際には
    // statusの変更だけで良いかも。
    case SUCCEEDED_CREATE_ITEM:
      return { ...state, items: action.resData };

    case SUCCEEDED_DELETE:
      // let tempObj = Object.assign({}, state);
      // delete tempObj[action.payload.id];
      // return tempObj;

      return {
        ...state,
        // フィルターをかけることで、削除したID以外のものだけを抽出して配列にしている。
        // おそらく、ユーザー情報の配列から一つ一つ取り出し、userIdがpayloadのID
        // と異なることを確認している。
        // この場合、ユーザー削除後には、削除ユーザーのIDのオブジェクトだけを
        // サーバーサイドで返すようにする必要あり。
        items: state.items.filter(data => data.id !== action.payload.id)
      };

    case SUCCEEDED_FETCH:
      return { ...state, items: action.items };

    default:
      return state;
  }
};

export default itemReducer;
