import { Author, AuthorDetail, ValidationError } from '../../types';

export const FETCH_AUTHORS = 'authors/FETCH_AUTHORS';
export const FETCH_AUTHORS_SUCCESS = 'authors/FETCH_AUTHORS_SUCCESS';
export const FETCH_AUTHORS_ERROR = 'authors/FETCH_AUTHORS_ERROR';

export const FETCH_AUTHOR = 'authors/FETCH_AUTHOR';
export const FETCH_AUTHOR_SUCCESS = 'authors/FETCH_AUTHOR_SUCCESS';
export const FETCH_AUTHOR_ERROR = 'authors/FETCH_AUTHOR_ERROR';

export const SAVE_AUTHOR = 'authors/SAVE_AUTHOR';
export const SAVE_AUTHOR_SUCCESS = 'authors/SAVE_AUTHOR_SUCCESS';
export const SAVE_AUTHOR_ERROR = 'authors/SAVE_AUTHOR_ERROR';

export const DELETE_AUTHOR = 'authors/DELETE_AUTHOR';

export const RESET_AUTHOR_FORM = 'authors/RESET_AUTHOR_FORM';

export const fetchAuthors = () => ({ type: FETCH_AUTHORS });

export const fetchAuthorsSuccess = (items: Author[]) => ({
  type: FETCH_AUTHORS_SUCCESS,
  payload: items,
});

export const fetchAuthorsError = (message: string) => ({
  type: FETCH_AUTHORS_ERROR,
  payload: message,
});

export const fetchAuthor = (id: number) => ({ type: FETCH_AUTHOR, payload: id });

export const fetchAuthorSuccess = (author: AuthorDetail) => ({
  type: FETCH_AUTHOR_SUCCESS,
  payload: author,
});

export const fetchAuthorError = (message: string) => ({
  type: FETCH_AUTHOR_ERROR,
  payload: message,
});

export const saveAuthor = (id: number | null, data: FormData) => ({
  type: SAVE_AUTHOR,
  payload: { id, data },
});

export const saveAuthorSuccess = () => ({ type: SAVE_AUTHOR_SUCCESS });

export const saveAuthorError = (message: string, fields: ValidationError[]) => ({
  type: SAVE_AUTHOR_ERROR,
  payload: { message, fields },
});

export const deleteAuthor = (id: number) => ({ type: DELETE_AUTHOR, payload: id });

export const resetAuthorForm = () => ({ type: RESET_AUTHOR_FORM });
