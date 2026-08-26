import { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { message } from 'antd';
import * as api from '../../api';
import { Author, AuthorDetail } from '../../types';
import { parseApiError } from '../../utils';
import {
  DELETE_AUTHOR,
  FETCH_AUTHOR,
  FETCH_AUTHORS,
  SAVE_AUTHOR,
  fetchAuthors,
  fetchAuthorsError,
  fetchAuthorsSuccess,
  fetchAuthorError,
  fetchAuthorSuccess,
  saveAuthorError,
  saveAuthorSuccess,
} from './actions';

function* fetchAuthorsWorker() {
  try {
    const res: AxiosResponse<Author[]> = yield call(api.getAuthors);
    yield put(fetchAuthorsSuccess(res.data));
  } catch (e) {
    yield put(fetchAuthorsError(parseApiError(e).message));
  }
}

function* fetchAuthorWorker(action: any) {
  try {
    const res: AxiosResponse<AuthorDetail> = yield call(api.getAuthor, action.payload);
    yield put(fetchAuthorSuccess(res.data));
  } catch (e) {
    yield put(fetchAuthorError(parseApiError(e).message));
  }
}

function* saveAuthorWorker(action: any) {
  const { id, data } = action.payload;
  try {
    if (id) {
      yield call(api.editAuthor, id, data);
    } else {
      yield call(api.addAuthor, data);
    }
    yield put(saveAuthorSuccess());
    message.success('Автор сохранен');
    yield put(push('/authors'));
  } catch (e) {
    const { message: msg, fields } = parseApiError(e);
    yield put(saveAuthorError(msg, fields));
  }
}

function* deleteAuthorWorker(action: any) {
  try {
    yield call(api.deleteAuthor, action.payload);
    message.success('Автор удален');
    yield put(fetchAuthors());
  } catch (e) {
    message.error(parseApiError(e).message);
  }
}

export default function* authorsSaga() {
  yield takeLatest(FETCH_AUTHORS, fetchAuthorsWorker);
  yield takeLatest(FETCH_AUTHOR, fetchAuthorWorker);
  yield takeLatest(SAVE_AUTHOR, saveAuthorWorker);
  yield takeLatest(DELETE_AUTHOR, deleteAuthorWorker);
}
