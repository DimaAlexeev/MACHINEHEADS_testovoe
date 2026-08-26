import { AxiosResponse } from 'axios';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { message } from 'antd';
import * as api from '../../api';
import { Post, PostDetail } from '../../types';
import { parseApiError } from '../../utils';
import { RootState } from '../index';
import {
  DELETE_POST,
  FETCH_POST,
  FETCH_POSTS,
  SAVE_POST,
  fetchPosts,
  fetchPostsError,
  fetchPostsSuccess,
  fetchPostError,
  fetchPostSuccess,
  savePostError,
  savePostSuccess,
} from './actions';

function* fetchPostsWorker(action: any) {
  try {
    const res: AxiosResponse<Post[]> = yield call(api.getPosts, action.payload);
    // информация о постраничке приходит в заголовках
    yield put(
      fetchPostsSuccess(
        res.data,
        Number(res.headers['x-pagination-total-count']),
        Number(res.headers['x-pagination-current-page']),
        Number(res.headers['x-pagination-per-page']),
      ),
    );
  } catch (e) {
    yield put(fetchPostsError(parseApiError(e).message));
  }
}

function* fetchPostWorker(action: any) {
  try {
    const res: AxiosResponse<PostDetail> = yield call(api.getPost, action.payload);
    yield put(fetchPostSuccess(res.data));
  } catch (e) {
    yield put(fetchPostError(parseApiError(e).message));
  }
}

function* savePostWorker(action: any) {
  const { id, data } = action.payload;
  try {
    if (id) {
      yield call(api.editPost, id, data);
    } else {
      yield call(api.addPost, data);
    }
    yield put(savePostSuccess());
    message.success('Пост сохранен');
    yield put(push('/posts'));
  } catch (e) {
    const { message: msg, fields } = parseApiError(e);
    yield put(savePostError(msg, fields));
  }
}

function* deletePostWorker(action: any) {
  try {
    yield call(api.deletePost, action.payload);
    message.success('Пост удален');
    const page: number = yield select((s: RootState) => s.posts.page);
    yield put(fetchPosts(page));
  } catch (e) {
    message.error(parseApiError(e).message);
  }
}

export default function* postsSaga() {
  yield takeLatest(FETCH_POSTS, fetchPostsWorker);
  yield takeLatest(FETCH_POST, fetchPostWorker);
  yield takeLatest(SAVE_POST, savePostWorker);
  yield takeLatest(DELETE_POST, deletePostWorker);
}
