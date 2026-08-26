import { Tag, ValidationError } from '../../types';

export const FETCH_TAGS = 'tags/FETCH_TAGS';
export const FETCH_TAGS_SUCCESS = 'tags/FETCH_TAGS_SUCCESS';
export const FETCH_TAGS_ERROR = 'tags/FETCH_TAGS_ERROR';

export const SAVE_TAG = 'tags/SAVE_TAG';
export const SAVE_TAG_SUCCESS = 'tags/SAVE_TAG_SUCCESS';
export const SAVE_TAG_ERROR = 'tags/SAVE_TAG_ERROR';

export const DELETE_TAG = 'tags/DELETE_TAG';

export const RESET_TAG_FORM = 'tags/RESET_TAG_FORM';

export const fetchTags = () => ({ type: FETCH_TAGS });

export const fetchTagsSuccess = (items: Tag[]) => ({ type: FETCH_TAGS_SUCCESS, payload: items });

export const fetchTagsError = (message: string) => ({ type: FETCH_TAGS_ERROR, payload: message });

// onSuccess - коллбек чтобы закрыть модалку после сохранения
export const saveTag = (id: number | null, data: FormData, onSuccess?: () => void) => ({
  type: SAVE_TAG,
  payload: { id, data, onSuccess },
});

export const saveTagSuccess = () => ({ type: SAVE_TAG_SUCCESS });

export const saveTagError = (message: string, fields: ValidationError[]) => ({
  type: SAVE_TAG_ERROR,
  payload: { message, fields },
});

export const deleteTag = (id: number) => ({ type: DELETE_TAG, payload: id });

export const resetTagForm = () => ({ type: RESET_TAG_FORM });
