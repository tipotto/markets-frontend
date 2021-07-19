import { put, call, select } from 'redux-saga/effects';
import { stopSubmit } from 'redux-form';
import {
  succeededSearch,
  succeededNextSearch,
  succeededAnalysis,
  failedSearch,
  failedAnalysis,
} from '../actions';
import { fetchItems, analyzeData } from '../api/request';
import formData from '../constants/formData';

export function* search() {
  // console.log('saga task search');
  const formName = formData.search.name;
  const formValues = yield select((state) => state.form[formName].values);

  const { result, error } = yield call(fetchItems, formValues);
  yield put(stopSubmit(formName));

  if (result && !error) {
    yield put(succeededSearch(result));
  } else {
    yield put(failedSearch(error));
  }
}

export function* nextSearch() {
  // console.log('saga task additionalSearch');
  const formName = formData.search.name;
  const formValues = yield select((state) => state.form[formName].values);

  if (!(formValues.keyword && formValues.platforms.length > 0)) {
    yield put(succeededNextSearch([]));
    yield put(stopSubmit(formName));
    return;
  }

  const { result, error } = yield call(fetchItems, formValues);
  yield put(stopSubmit(formName));

  if (result && !error) {
    yield put(succeededNextSearch(result));
  } else {
    yield put(failedSearch(error));
  }
}

export function* analyze() {
  // console.log('saga task analyze');
  const formName = formData.analysis.name;
  const formValues = yield select((state) => state.form[formName].values);

  // if (!(formValues.keyword && formValues.platforms.length > 0)) {
  //   yield put(succeededSearch([]));
  //   yield put(stopSubmit(formName));
  //   return;
  // }

  const { result, error } = yield call(analyzeData, formValues);
  yield put(stopSubmit(formName));

  if (result && !error) {
    // console.log('analyze result', result);
    yield put(succeededAnalysis(result));
  } else {
    yield put(failedAnalysis(error));
  }
}
