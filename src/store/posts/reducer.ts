import { AnyAction } from 'redux';
import { Post, PostDetail, ValidationError } from '../../types';
import {
  FETCH_POST,
  FETCH_POST_ERROR,
  FETCH_POST_SUCCESS,
  FETCH_POSTS,
  FETCH_POSTS_ERROR,
  FETCH_POSTS_SUCCESS,
  RESET_POST_FORM,
  SAVE_POST,
  SAVE_POST_ERROR,
  SAVE_POST_SUCCESS,
} from './actions';

export interface PostsState {
  items: Post[];
  loading: boolean;
  error: string | null;
  page: number;
  perPage: number;
  total: number;

  current: PostDetail | null;
  currentLoading: boolean;

  saving: boolean;
  saveError: string | null;
  validationErrors: ValidationError[];
}

const initialState: PostsState = {
  items: [],
  loading: false,
  error: null,
  page: 1,
  perPage: 10,
  total: 0,

  current: null,
  currentLoading: false,

  saving: false,
  saveError: null,
  validationErrors: [],
};

export default function postsReducer(state = initialState, action: AnyAction): PostsState {
  switch (action.type) {
    case FETCH_POSTS:
      return { ...state, loading: true, error: null };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.items,
        total: action.payload.total,
        page: action.payload.page,
        perPage: action.payload.perPage,
      };
    case FETCH_POSTS_ERROR:
      return { ...state, loading: false, error: action.payload };

    case FETCH_POST:
      return { ...state, current: null, currentLoading: true };
    case FETCH_POST_SUCCESS:
      return { ...state, current: action.payload, currentLoading: false };
    case FETCH_POST_ERROR:
      return { ...state, currentLoading: false, error: action.payload };

    case SAVE_POST:
      return { ...state, saving: true, saveError: null, validationErrors: [] };
    case SAVE_POST_SUCCESS:
      return { ...state, saving: false };
    case SAVE_POST_ERROR:
      return {
        ...state,
        saving: false,
        saveError: action.payload.message,
        validationErrors: action.payload.fields,
      };

    case RESET_POST_FORM:
      return { ...state, current: null, saveError: null, validationErrors: [] };

    default:
      return state;
  }
}
