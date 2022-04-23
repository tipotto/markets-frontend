import { put, call, select } from 'redux-saga/effects';
import { stopSubmit } from 'redux-form';
import {
  succeededSearch,
  succeededNextSearch,
  succeededAnalysis,
  failedSearch,
  failedAnalysis,
} from '../actions';
import { searchData, analyzeData } from '../api/request';
import formData from '../constants/formData';

export function* search() {
  const formName = formData.search.name;
  const formValues = yield select((state) => state.form[formName].values);
  const { result, error } = yield call(searchData, formValues);
  yield put(stopSubmit(formName));

  if (result) {
    yield put(succeededSearch(result));
    return;
  }

  yield put(failedSearch(error));
}

export function* nextSearch() {
  const formName = formData.search.name;
  const formValues = yield select((state) => state.form[formName].values);

  if (!(formValues.keyword && formValues.platforms.length > 0)) {
    yield put(succeededNextSearch([]));
    yield put(stopSubmit(formName));
    return;
  }

  const { result, error } = yield call(searchData, formValues);
  yield put(stopSubmit(formName));

  if (result) {
    yield put(succeededNextSearch(result));
    return;
  }

  yield put(failedSearch(error));
}

export function* analyze() {
  const formName = formData.analysis.name;
  const formValues = yield select((state) => state.form[formName].values);
  const { result, error } = yield call(analyzeData, formValues);
  yield put(stopSubmit(formName));

  if (result) {
    yield put(succeededAnalysis(result));
    return;
  }

  yield put(failedAnalysis(error));
}
