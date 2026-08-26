import { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { message } from 'antd';
import * as api from '../../api';
import { Tag } from '../../types';
import { parseApiError } from '../../utils';
import {
  DELETE_TAG,
  FETCH_TAGS,
  SAVE_TAG,
  fetchTags,
  fetchTagsError,
  fetchTagsSuccess,
  saveTagError,
  saveTagSuccess,
} from './actions';

function* fetchTagsWorker() {
  try {
    const res: AxiosResponse<Tag[]> = yield call(api.getTags);
    yield put(fetchTagsSuccess(res.data));
  } catch (e) {
    yield put(fetchTagsError(parseApiError(e).message));
  }
}

function* saveTagWorker(action: any) {
  const { id, data, onSuccess } = action.payload;
  try {
    if (id) {
      yield call(api.editTag, id, data);
    } else {
      yield call(api.addTag, data);
    }
    yield put(saveTagSuccess());
    message.success('Тег сохранен');
    if (onSuccess) {
      onSuccess();
    }
    yield put(fetchTags());
  } catch (e) {
    const { message: msg, fields } = parseApiError(e);
    yield put(saveTagError(msg, fields));
  }
}

function* deleteTagWorker(action: any) {
  try {
    yield call(api.deleteTag, action.payload);
    message.success('Тег удален');
    yield put(fetchTags());
  } catch (e) {
    message.error(parseApiError(e).message);
  }
}

export default function* tagsSaga() {
  yield takeLatest(FETCH_TAGS, fetchTagsWorker);
  yield takeLatest(SAVE_TAG, saveTagWorker);
  yield takeLatest(DELETE_TAG, deleteTagWorker);
}
