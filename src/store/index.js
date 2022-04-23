/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { compose, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createMigrate, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../reducers';
import rootSaga from '../sagas';
import initState from '../reducers/initState';

const getClassName = (obj) => {
  if (typeof obj === 'undefined') {
    return 'undefined';
  }
  if (obj === null) {
    return 'null';
  }

  // objが有効
  // prototype名取得
  const className = Object.prototype.toString.call(obj);
  // console.log('className:', className);

  // "object"以降のクラス名を取得
  const matches = className.replace(/(\[|\])/g, '').split(' ');
  // console.log('matches:', matches);

  if (matches?.length > 0) {
    // クラス名が存在
    return matches[1];
  }

  return className;
};

const isValidStoreCache = (o1, o2) => {
  // console.log('o1:', o1);
  // console.log('o2:', o2);

  if (o2 === undefined || o2 === null) {
    return false;
  }

  // Both nulls = same
  //   if (o1 === null && o2 === null) {
  //     return true;
  //   }

  const o1keys = o1 === null ? new Set() : new Set(Object.keys(o1));
  const o2keys = o2 === null ? new Set() : new Set(Object.keys(o2));
  // console.log('o1keys', o1keys);
  // console.log('o2keys', o2keys);

  if (o1keys.size !== o2keys.size) {
    // console.log('Different key sizes');
    return false;
  }

  for (const key of o1keys) {
    // console.log('key:', key);

    if (!o2keys.has(key)) {
      // console.log('Different keys');
      return false;
    }

    const v1 = o1[key];
    const v2 = o2[key];
    // console.log('v1:', v1);
    // console.log('v2:', v2);

    const t1 = getClassName(v1);
    const t2 = getClassName(v2);
    // console.log('t1:', t1);
    // console.log('t2:', t2);

    if (t1 !== t2) {
      // console.log('Different types');
      return false;
    }

    if (t1 === 'Object' && key !== 'byId') {
      const isValidCache = isValidStoreCache(v1, v2);
      if (!isValidCache) return false;
    }

    // if (t1 === 'Object') {
    //   console.log('Object');
    //   if (key !== 'byId') {
    //     console.log('Not byId');
    //     if (!isValidStoreCache(v1, v2)) {
    //       console.log('Different object keys');
    //       return false;
    //     }
    //     console.log('Same object keys');
    //   } else {
    //     console.log('byId');
    //   }
    // }
  }

  // No differences found
  return true;
};

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);
  // const composedEnhancers = compose(...enhancers);

  const blacklist = ['form', 'state', 'error'];
  // initStateのトップレベルのkeyリスト(initKeys)を取得
  // initKeysからblacklistのkeyを除外(whitelist)
  // キャッシュのstateからトップレベルのkeyリスト(cacheTopKeys)を取得
  // whitelistをforEachでループ:
  // initStateの各storeデータを取得(initData)
  // キャッシュの各storeデータを取得（cacheData, もし存在しない場合はinitStateのデフォルト値を追加してcontinue）
  // initDataのkeyリストを取得し、forEachでループ:
  // initDataの各keyが
  const migrations = {
    0: (state) => ({ ...initState }),
    1: (state) => {
      // TODO: initKeysに含まれているkey以外は
      // newStateから除外したい
      const newState = { ...state };
      console.log('cached state:', newState);

      // initKeys: search, like, analyze, state, errorが含まれる
      const initKeys = Object.keys(initState);
      console.log('initKeys:', initKeys);

      // whitelist: search, like, analyzeが含まれる
      const whitelist = initKeys.filter((key) => !blacklist.includes(key));
      console.log('whitelist:', whitelist);

      whitelist.forEach((wkey) => {
        console.log('wkey:', wkey);
        // search, like, analyzeストアがキャッシュに存在するか確認
        const initParam = initState[wkey];
        console.log('initParam:', initParam);

        const cacheParam = newState[wkey];
        console.log('cacheParam:', cacheParam);

        const isValidCache = isValidStoreCache(initParam, cacheParam);
        console.log('isValidCache:', isValidCache);

        if (!isValidCache) {
          console.log('update');
          newState[wkey] = initParam;
        }
      });

      const cacheKeys = Object.keys(newState);
      const garbageKeys = cacheKeys.filter((key) => !initKeys.includes(key));
      garbageKeys.forEach((gkey) => {
        newState[gkey] = undefined;
      });

      console.log('Updated newState:', newState);
      return newState;
    },
  };

  const persistConfig = {
    key: 'root', // Storageに保存されるキー名を指定
    version: 0,
    storage, // 保存先としてlocalStorageを設定
    blacklist,
    migrate: createMigrate(migrations, { debug: true }),
    // stateReconciler: false,
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer());
  const store = createStore(persistedReducer, composedEnhancers);

  sagaMiddleware.run(rootSaga);
  return store;
};

const store = configureStore();
export default store;
