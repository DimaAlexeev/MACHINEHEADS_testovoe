import { Post, PostDetail, ValidationError } from '../../types';

export const FETCH_POSTS = 'posts/FETCH_POSTS';
export const FETCH_POSTS_SUCCESS = 'posts/FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_ERROR = 'posts/FETCH_POSTS_ERROR';

export const FETCH_POST = 'posts/FETCH_POST';
export const FETCH_POST_SUCCESS = 'posts/FETCH_POST_SUCCESS';
export const FETCH_POST_ERROR = 'posts/FETCH_POST_ERROR';

export const SAVE_POST = 'posts/SAVE_POST';
export const SAVE_POST_SUCCESS = 'posts/SAVE_POST_SUCCESS';
export const SAVE_POST_ERROR = 'posts/SAVE_POST_ERROR';

export const DELETE_POST = 'posts/DELETE_POST';

export const RESET_POST_FORM = 'posts/RESET_POST_FORM';

export const fetchPosts = (page = 1) => ({ type: FETCH_POSTS, payload: page });

export const fetchPostsSuccess = (items: Post[], total: number, page: number, perPage: number) => ({
  type: FETCH_POSTS_SUCCESS,
  payload: { items, total, page, perPage },
});

export const fetchPostsError = (message: string) => ({
  type: FETCH_POSTS_ERROR,
  payload: message,
});

export const fetchPost = (id: number) => ({ type: FETCH_POST, payload: id });

export const fetchPostSuccess = (post: PostDetail) => ({
  type: FETCH_POST_SUCCESS,
  payload: post,
});

export const fetchPostError = (message: string) => ({ type: FETCH_POST_ERROR, payload: message });

// id = null это добавление нового поста
export const savePost = (id: number | null, data: FormData) => ({
  type: SAVE_POST,
  payload: { id, data },
});

export const savePostSuccess = () => ({ type: SAVE_POST_SUCCESS });

export const savePostError = (message: string, fields: ValidationError[]) => ({
  type: SAVE_POST_ERROR,
  payload: { message, fields },
});

export const deletePost = (id: number) => ({ type: DELETE_POST, payload: id });

export const resetPostForm = () => ({ type: RESET_POST_FORM });
