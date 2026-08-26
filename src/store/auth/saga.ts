import { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import * as api from '../../api';
import { Tokens } from '../../types';
import { parseApiError, removeTokens, saveTokens } from '../../utils';
import { LOGIN, LOGOUT, loginError, loginSuccess } from './actions';

function* loginWorker(action: any) {
  try {
    const res: AxiosResponse<Tokens> = yield call(
      api.login,
      action.payload.email,
      action.payload.password,
    );
    saveTokens(res.data);
    yield put(loginSuccess());
    yield put(push('/posts'));
  } catch (e) {
    const { message, fields } = parseApiError(e);
    yield put(loginError(message, fields));
  }
}

function* logoutWorker() {
  removeTokens();
  yield put(push('/login'));
}

export default function* authSaga() {
  yield takeLatest(LOGIN, loginWorker);
  yield takeLatest(LOGOUT, logoutWorker);
}
