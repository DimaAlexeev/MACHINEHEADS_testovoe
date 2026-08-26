import { AnyAction } from 'redux';
import { Author, AuthorDetail, ValidationError } from '../../types';
import {
  FETCH_AUTHOR,
  FETCH_AUTHOR_ERROR,
  FETCH_AUTHOR_SUCCESS,
  FETCH_AUTHORS,
  FETCH_AUTHORS_ERROR,
  FETCH_AUTHORS_SUCCESS,
  RESET_AUTHOR_FORM,
  SAVE_AUTHOR,
  SAVE_AUTHOR_ERROR,
  SAVE_AUTHOR_SUCCESS,
} from './actions';

export interface AuthorsState {
  items: Author[];
  loading: boolean;
  error: string | null;

  current: AuthorDetail | null;
  currentLoading: boolean;

  saving: boolean;
  saveError: string | null;
  validationErrors: ValidationError[];
}

const initialState: AuthorsState = {
  items: [],
  loading: false,
  error: null,

  current: null,
  currentLoading: false,

  saving: false,
  saveError: null,
  validationErrors: [],
};

export default function authorsReducer(state = initialState, action: AnyAction): AuthorsState {
  switch (action.type) {
    case FETCH_AUTHORS:
      return { ...state, loading: true, error: null };
    case FETCH_AUTHORS_SUCCESS:
      return { ...state, loading: false, items: action.payload };
    case FETCH_AUTHORS_ERROR:
      return { ...state, loading: false, error: action.payload };

    case FETCH_AUTHOR:
      return { ...state, current: null, currentLoading: true };
    case FETCH_AUTHOR_SUCCESS:
      return { ...state, current: action.payload, currentLoading: false };
    case FETCH_AUTHOR_ERROR:
      return { ...state, currentLoading: false, error: action.payload };

    case SAVE_AUTHOR:
      return { ...state, saving: true, saveError: null, validationErrors: [] };
    case SAVE_AUTHOR_SUCCESS:
      return { ...state, saving: false };
    case SAVE_AUTHOR_ERROR:
      return {
        ...state,
        saving: false,
        saveError: action.payload.message,
        validationErrors: action.payload.fields,
      };

    case RESET_AUTHOR_FORM:
      return { ...state, current: null, saveError: null, validationErrors: [] };

    default:
      return state;
  }
}
