import axios from "axios";

// const BASE_URL = "http://localhost:8080";

// export const login = async params => {
//   return axios.post(BASE_URL + "/user/create", params).then(
//     res => {
//       return { data: res.data };
//     },
//     error => {
//       return { error };
//     }
//   );

//   // return await postLoginMock("/user/create", params).then(
//   //   res => {
//   //     return { data: res.data };
//   //   },
//   //   error => {
//   //     return { error };
//   //   }
//   // );
// };

/**
 * アイテムリストの取得
 * @param {*} url
 */
const fetch = (url) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve({
        data: [
          {
            id: 1,
            title: "明日の予定",
            description: "ハローワークの説明会に参加",
          },
          {
            id: 2,
            title: "明後日の予定",
            description: "17時に友達と駅前で待ち合わせ",
          },
        ],
      });
    }, Math.random() * 5000);
  });
};

export const fetchItem = async () => {
  return await axios({
    method: "get",
    url: "/items/",
  });

  // return await fetch("/user/").then(
  //   res => {
  //     return { data: res.data };
  //   },
  //   error => {
  //     return { error };
  //   }
  // );
};

/**
 * ユーザー・アイテムの作成
 * @param {*} url
 * @param {*} params
 */
const create = (url, params) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // パラメータの空チェックや形式・文字数チェックなどは、
      // Redux-formのバリデーションで行うため、ここでは必要ない。
      // ここでは、以下のようなサーバーサイドでの処理結果を受け取る。
      // ・ユーザー登録時：「メールアドレスが重複していないか」
      // ・ログイン時：「メールアドレス、パスワードはDBのものと一致するか」など
      // if (!params.username) {
      //   return reject({
      //     // username: "User does not exist",
      //     _error: "ユーザー名を入力してください。"
      //   });
      // } else if (!params.password) {
      //   return reject({ _error: "パスワードを入力してください。" });
      // }
      return resolve({
        data: {
          id: 1,
          name: params.username,
          email: params.email,
          password: params.password,
        },
      });
    }, Math.random() * 5000);
  });
};

export const createUser = async (params) => {
  return await axios.post("/user/create", params).then(
    (res) => {
      return { data: res.data };
    },
    (error) => {
      return { error };
    }
  );
};

export const search = async (params) => {
  console.log("サーバー側にフォーム内容を送信。(Request.js)");
  return await axios.post("/api/search/", params).then(
    (res) => {
      console.log("サーバー側からレスポンスを取得。(Request.js)");
      return { data: res };
    },
    (error) => {
      console.log("サーバー側からエラーを取得。(Request.js)");
      return { error };
    }
  );
};

/**
 * アイテムの削除
 * @param {*} url
 * @param {*} itemId
 */
const remove = (url, itemId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve({ data: { id: itemId } });
    }, Math.random() * 5000);
  });
};

export const deleteItem = async (itemId) => {
  return await remove("/user/delete", itemId).then(
    (res) => {
      return { data: res.data };
    },
    (error) => {
      return { error };
    }
  );

  // return await axios({
  //   method: "delete",
  //   url: BASE_URL + `/user/delete/${id}`
  // });
};
