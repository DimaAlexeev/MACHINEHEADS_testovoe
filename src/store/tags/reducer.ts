import { AnyAction } from 'redux';
import { Tag, ValidationError } from '../../types';
import {
  FETCH_TAGS,
  FETCH_TAGS_ERROR,
  FETCH_TAGS_SUCCESS,
  RESET_TAG_FORM,
  SAVE_TAG,
  SAVE_TAG_ERROR,
  SAVE_TAG_SUCCESS,
} from './actions';

export interface TagsState {
  items: Tag[];
  loading: boolean;
  error: string | null;

  saving: boolean;
  saveError: string | null;
  validationErrors: ValidationError[];
}

const initialState: TagsState = {
  items: [],
  loading: false,
  error: null,

  saving: false,
  saveError: null,
  validationErrors: [],
};

export default function tagsReducer(state = initialState, action: AnyAction): TagsState {
  switch (action.type) {
    case FETCH_TAGS:
      return { ...state, loading: true, error: null };
    case FETCH_TAGS_SUCCESS:
      return { ...state, loading: false, items: action.payload };
    case FETCH_TAGS_ERROR:
      return { ...state, loading: false, error: action.payload };

    case SAVE_TAG:
      return { ...state, saving: true, saveError: null, validationErrors: [] };
    case SAVE_TAG_SUCCESS:
      return { ...state, saving: false };
    case SAVE_TAG_ERROR:
      return {
        ...state,
        saving: false,
        saveError: action.payload.message,
        validationErrors: action.payload.fields,
      };

    case RESET_TAG_FORM:
      return { ...state, saveError: null, validationErrors: [] };

    default:
      return state;
  }
}
